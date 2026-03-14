#!/usr/bin/env node
/**
 * Fetch tempat-tempat di Indramayu dari Google Places API
 * lalu masukkan ke Supabase database
 *
 * Jalankan: node scripts/fetch-google-places.js
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const env = {}
envContent.split('\n').forEach(line => {
  const [key, ...vals] = line.split('=')
  if (key && vals.length) env[key.trim()] = vals.join('=').trim()
})

const GOOGLE_KEY = env['NEXT_PUBLIC_GOOGLE_MAPS_KEY']
const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL']
const SERVICE_KEY = env['SUPABASE_SERVICE_ROLE_KEY']

if (!GOOGLE_KEY) { console.error('❌ NEXT_PUBLIC_GOOGLE_MAPS_KEY kosong di .env.local'); process.exit(1) }
if (!SUPABASE_URL || SUPABASE_URL.includes('placeholder')) { console.error('❌ SUPABASE_URL belum diisi'); process.exit(1) }

// Indramayu center coordinates
const CENTER = '-6.3276,108.3215'
const RADIUS = 30000 // 30km radius

// Kategori yang dicari
const SEARCH_QUERIES = [
  { query: 'restoran Indramayu', category: 'kuliner' },
  { query: 'warung makan Indramayu', category: 'kuliner' },
  { query: 'kuliner khas Indramayu', category: 'kuliner' },
  { query: 'seafood Indramayu', category: 'kuliner' },
  { query: 'wisata pantai Indramayu', category: 'wisata' },
  { query: 'tempat wisata Indramayu', category: 'wisata' },
  { query: 'hotel Indramayu', category: 'hotel' },
  { query: 'penginapan Indramayu', category: 'hotel' },
  { query: 'masjid Indramayu', category: 'masjid' },
  { query: 'apotek Indramayu', category: 'kesehatan' },
  { query: 'rumah sakit Indramayu', category: 'kesehatan' },
  { query: 'bengkel Indramayu', category: 'otomotif' },
  { query: 'toko Indramayu', category: 'belanja' },
  { query: 'pasar Indramayu', category: 'belanja' },
  { query: 'salon Indramayu', category: 'kecantikan' },
  { query: 'bank Indramayu', category: 'perbankan' },
  { query: 'sekolah Indramayu', category: 'pendidikan' },
  { query: 'kafe Indramayu', category: 'kuliner' },
]

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, res => {
      let d = ''
      res.on('data', c => d += c)
      res.on('end', () => {
        try { resolve(JSON.parse(d)) } catch(e) { reject(e) }
      })
    })
    req.on('error', reject)
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')) })
  })
}

function supabasePost(path, body) {
  return new Promise((resolve, reject) => {
    const host = new URL(SUPABASE_URL).hostname
    const data = JSON.stringify(body)
    const req = https.request({
      hostname: host, port: 443, path, method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'apikey': SERVICE_KEY,
        'Authorization': 'Bearer ' + SERVICE_KEY,
        'Prefer': 'return=minimal,resolution=ignore-duplicates'
      }
    }, res => {
      let d = ''
      res.on('data', c => d += c)
      res.on('end', () => resolve({ status: res.statusCode, data: d }))
    })
    req.on('error', reject)
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')) })
    req.write(data); req.end()
  })
}

function toSlug(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 80)
}

function getPriceRange(level) {
  if (level === 1) return 'Murah'
  if (level === 2) return 'Sedang'
  if (level === 3) return 'Mahal'
  if (level === 4) return 'Sangat Mahal'
  return 'Sedang'
}

async function getCategoryId(slug) {
  const host = new URL(SUPABASE_URL).hostname
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: host, port: 443,
      path: `/rest/v1/categories?slug=eq.${slug}&select=id`,
      headers: { 'apikey': SERVICE_KEY, 'Authorization': 'Bearer ' + SERVICE_KEY }
    }, res => {
      let d = ''
      res.on('data', c => d += c)
      res.on('end', () => {
        try {
          const rows = JSON.parse(d)
          resolve(rows[0]?.id || null)
        } catch(e) { resolve(null) }
      })
    })
    req.on('error', resolve.bind(null, null))
    req.end()
  })
}

const categoryIds = {}
const slugsSeen = new Set()

async function fetchPlacesForQuery(searchQuery, categorySlug) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&location=${CENTER}&radius=${RADIUS}&language=id&key=${GOOGLE_KEY}`

  let data
  try { data = await httpsGet(url) } catch(e) {
    console.log(`  ⚠️  Timeout: ${searchQuery}`)
    return []
  }

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    console.log(`  ⚠️  API Error [${data.status}]: ${searchQuery}`)
    return []
  }

  const results = data.results || []
  const places = []

  for (const place of results) {
    // Skip yang bukan di Indramayu
    const addr = (place.formatted_address || '').toLowerCase()
    if (!addr.includes('indramayu') && !addr.includes('indramayu')) continue

    let slug = toSlug(place.name)
    if (slugsSeen.has(slug)) slug = slug + '-' + Math.random().toString(36).substring(2, 6)
    slugsSeen.add(slug)

    // Deteksi kecamatan dari alamat
    let kecamatan = 'Indramayu'
    const kecamatanList = ['Jatibarang', 'Haurgeulis', 'Karangampel', 'Losarang', 'Kandanghaur',
      'Kertasemaya', 'Gantar', 'Juntinyuat', 'Balongan', 'Sindang', 'Anjatan', 'Bongas',
      'Cikedung', 'Gabuswetan', 'Krangkeng', 'Kroya', 'Lelea', 'Lohbener', 'Patrol',
      'Pasekan', 'Sliyeg', 'Sukagumiwang', 'Sukra', 'Terisi', 'Tukdana', 'Widasari']
    for (const kec of kecamatanList) {
      if (addr.includes(kec.toLowerCase())) { kecamatan = kec; break }
    }

    places.push({
      name: place.name,
      slug,
      description: `${place.name} berlokasi di ${place.formatted_address || 'Indramayu'}. ${place.types?.includes('restaurant') ? 'Tempat makan yang nyaman.' : ''}`,
      category_slug: categorySlug,
      address: place.formatted_address || 'Indramayu',
      kecamatan,
      kota: 'Indramayu',
      latitude: place.geometry?.location?.lat || null,
      longitude: place.geometry?.location?.lng || null,
      price_range: getPriceRange(place.price_level),
      rating: place.rating || 0,
      review_count: place.user_ratings_total || 0,
      is_featured: (place.rating || 0) >= 4.5 && (place.user_ratings_total || 0) >= 100,
      is_active: true,
      tags: place.types?.slice(0, 5) || [],
      place_id_google: place.place_id,
    })
  }

  return places
}

async function main() {
  console.log('🥭 Fetch Google Places → Indramayu Database')
  console.log('=============================================')

  // Load category IDs
  const categorySlugs = [...new Set(SEARCH_QUERIES.map(q => q.category))]
  for (const slug of categorySlugs) {
    categoryIds[slug] = await getCategoryId(slug)
  }

  let totalInserted = 0
  let allPlaces = []

  for (const { query, category } of SEARCH_QUERIES) {
    process.stdout.write(`🔍 ${query}... `)
    const places = await fetchPlacesForQuery(query, category)
    console.log(`${places.length} tempat`)
    allPlaces.push(...places)
    await new Promise(r => setTimeout(r, 200)) // rate limit
  }

  // Deduplicate by name
  const seen = new Set()
  allPlaces = allPlaces.filter(p => {
    const key = p.name.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key); return true
  })

  console.log(`\n📊 Total unik: ${allPlaces.length} tempat`)
  console.log('📤 Memasukkan ke Supabase...\n')

  // Insert in batches of 20
  for (let i = 0; i < allPlaces.length; i += 20) {
    const batch = allPlaces.slice(i, i + 20).map(p => ({
      name: p.name,
      slug: p.slug,
      description: p.description,
      category_id: categoryIds[p.category_slug],
      address: p.address,
      kecamatan: p.kecamatan,
      kota: p.kota,
      latitude: p.latitude,
      longitude: p.longitude,
      price_range: p.price_range,
      rating: p.rating,
      review_count: p.review_count,
      is_featured: p.is_featured,
      is_active: p.is_active,
      tags: p.tags,
    }))

    try {
      const result = await supabasePost('/rest/v1/places', batch)
      if (result.status >= 200 && result.status < 300) {
        totalInserted += batch.length
        process.stdout.write(`✅ ${Math.min(i + 20, allPlaces.length)}/${allPlaces.length}\r`)
      } else {
        console.log(`⚠️  Batch ${i}-${i+20}: ${result.data.slice(0, 100)}`)
      }
    } catch(e) {
      console.log(`❌ Batch error: ${e.message}`)
    }
    await new Promise(r => setTimeout(r, 100))
  }

  console.log(`\n\n🎉 Selesai! ${totalInserted} tempat berhasil ditambahkan.`)
}

main().catch(console.error)
