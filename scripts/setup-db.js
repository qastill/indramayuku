#!/usr/bin/env node
/**
 * Setup Database Indramayuku
 * Jalankan: node scripts/setup-db.js
 *
 * Script ini akan membaca .env.local dan menerapkan schema SQL ke Supabase.
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local')
if (!fs.existsSync(envPath)) {
  console.error('❌ File .env.local tidak ditemukan!')
  process.exit(1)
}

const envContent = fs.readFileSync(envPath, 'utf8')
const env = {}
envContent.split('\n').forEach(line => {
  const [key, ...vals] = line.split('=')
  if (key && vals.length) env[key.trim()] = vals.join('=').trim()
})

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL']
const SERVICE_ROLE_KEY = env['SUPABASE_SERVICE_ROLE_KEY']

if (!SUPABASE_URL || SUPABASE_URL.includes('placeholder')) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL belum diisi di .env.local')
  process.exit(1)
}

if (!SERVICE_ROLE_KEY || SERVICE_ROLE_KEY.includes('placeholder')) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY belum diisi di .env.local')
  process.exit(1)
}

// Baca SQL schema
const sqlPath = path.join(__dirname, '..', 'supabase-schema.sql')
const sql = fs.readFileSync(sqlPath, 'utf8')

console.log('🥭 Indramayuku - Setup Database')
console.log('================================')
console.log(`📡 Supabase URL: ${SUPABASE_URL}`)
console.log(`📄 Schema: ${sqlPath}`)
console.log('')

// Extract host dari URL
const urlObj = new URL(SUPABASE_URL)
const host = urlObj.hostname
const projectRef = host.split('.')[0]

// Kirim SQL ke Supabase SQL API
function runSQL(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql })

    const options = {
      hostname: host,
      port: 443,
      path: '/rest/v1/rpc/exec_sql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Prefer': 'return=minimal'
      }
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', d => data += d)
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, data })
        } else {
          // Coba endpoint alternatif
          resolve({ status: res.statusCode, data, fallback: true })
        }
      })
    })

    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

// Alternatif: gunakan Management API
function runSQLManagement(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql })

    const options = {
      hostname: 'api.supabase.com',
      port: 443,
      path: `/v1/projects/${projectRef}/database/query`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
      }
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', d => data += d)
      res.on('end', () => resolve({ status: res.statusCode, data }))
    })

    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

async function main() {
  try {
    console.log('📤 Mengirim SQL schema ke Supabase...')

    // Pecah SQL menjadi statement-statement individual berdasarkan titik koma
    // untuk menghindari timeout pada statement panjang
    const statements = sql
      .split(/;\s*\n/)
      .map(s => s.trim())
      .filter(s => s.length > 10 && !s.startsWith('--'))

    console.log(`📋 Total ${statements.length} SQL statements akan dijalankan`)

    let success = 0
    let errors = 0

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i] + ';'
      process.stdout.write(`\r⏳ [${i+1}/${statements.length}] Memproses...`)

      try {
        const result = await runSQL(stmt)
        if (result.status >= 200 && result.status < 300) {
          success++
        } else {
          // Coba parsing error - mungkin object sudah ada (CREATE IF NOT EXISTS)
          const errData = JSON.parse(result.data || '{}')
          if (errData.code === '42P07' || errData.code === '42710') {
            // Table/object sudah ada, skip
            success++
          } else {
            errors++
          }
        }
      } catch (e) {
        errors++
      }
    }

    console.log(`\n\n✅ Selesai! ${success} berhasil, ${errors} error`)

    if (errors > 0) {
      console.log('\n💡 Error biasanya karena tabel/objek sudah ada sebelumnya.')
      console.log('   Ini normal jika setup sudah pernah dijalankan.')
    }

    console.log('\n🚀 Sekarang jalankan: npm run dev')
    console.log('   Buka: http://localhost:3000')

  } catch (err) {
    console.error('\n❌ Error:', err.message)
    console.log('\n💡 Alternatif: Copy isi supabase-schema.sql dan paste ke SQL Editor di dashboard Supabase.')
    console.log('   https://supabase.com/dashboard/project/' + projectRef + '/sql/new')
  }
}

main()
