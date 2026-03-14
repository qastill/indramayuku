'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Search, MapPin, Star, Navigation, X, Filter } from 'lucide-react'
import Link from 'next/link'
import { CATEGORY_IMAGES } from '@/types'

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''

// Koordinat kecamatan Indramayu
const KECAMATAN_COORDS: Record<string, { lat: number; lng: number; label: string }> = {
  'Indramayu':    { lat: -6.3276, lng: 108.3215, label: 'Pusat Kota' },
  'Jatibarang':   { lat: -6.4713, lng: 108.2345, label: 'Kota Kecamatan' },
  'Haurgeulis':   { lat: -6.3513, lng: 108.0234, label: 'Jalur Pantura' },
  'Karangampel':  { lat: -6.3841, lng: 108.4523, label: 'Pesisir Timur' },
  'Losarang':     { lat: -6.2834, lng: 108.1234, label: 'Pantura Barat' },
  'Kandanghaur':  { lat: -6.2123, lng: 108.0567, label: 'Pesisir Utara' },
  'Kertasemaya':  { lat: -6.5012, lng: 108.2834, label: 'Selatan' },
  'Gantar':       { lat: -6.4854, lng: 108.1621, label: 'Selatan' },
  'Juntinyuat':   { lat: -6.3634, lng: 108.4012, label: 'Pantai Timur' },
  'Balongan':     { lat: -6.2734, lng: 108.3456, label: 'Pertamina' },
  'Sindang':      { lat: -6.3100, lng: 108.3050, label: 'Dekat Kota' },
}

const CATEGORY_COLORS: Record<string, string> = {
  kuliner: '#E8520A', wisata: '#0EA5E9', hotel: '#8B5CF6',
  masjid: '#065F46', belanja: '#EC4899', kesehatan: '#10B981',
  olahraga: '#DC2626', loker: '#2563EB', jasa: '#7C2D12',
  apotek: '#6D28D9', kafe: '#92400E', default: '#64748B',
}

const KECAMATAN_LIST = [
  'Indramayu', 'Sindang', 'Balongan', 'Kandanghaur', 'Losarang',
  'Cantigi', 'Arahan', 'Kedokanbunder', 'Juntinyuat', 'Karangampel',
  'Krangkeng', 'Pasekan', 'Sliyeg', 'Jatibarang', 'Bangodua',
  'Tukdana', 'Widasari', 'Kertasemaya', 'Sukagumiwang', 'Terisi',
  'Cikedung', 'Lelea', 'Bongas', 'Anjatan', 'Patrol',
  'Sukra', 'Gabuswetan', 'Kroya', 'Haurgeulis', 'Gantar', 'Trisi'
]

export default function PetaPage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const googleMapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const infoWindowRef = useRef<any>(null)
  const [places, setPlaces] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [kecFilter, setKecFilter] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [selected, setSelected] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [categories, setCategories] = useState<any[]>([])

  // Load places from Supabase
  useEffect(() => {
    const load = async () => {
      const { data: cats } = await supabase.from('categories').select('*').order('name')
      setCategories(cats || [])

      // Get places WITH coordinates first, then ALL places
      const { data } = await supabase
        .from('places')
        .select('*, category:categories(name, icon, slug, color)')
        .eq('is_active', true)
        .order('rating', { ascending: false })
      setPlaces(data || [])
      setFiltered(data || [])
      setLoading(false)
    }
    load()
  }, [])

  // Load Google Maps
  useEffect(() => {
    if (!GOOGLE_MAPS_KEY || mapLoaded) return
    
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places&language=id&region=ID`
    script.async = true
    script.defer = true
    script.onload = () => setMapLoaded(true)
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [GOOGLE_MAPS_KEY])

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || googleMapRef.current) return
    const G = (window as any).google

    const map = new G.maps.Map(mapRef.current, {
      center: { lat: -6.3276, lng: 108.3215 },
      zoom: 12,
      mapTypeId: 'roadmap',
      styles: [
        { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'off' }] },
      ],
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
    })
    googleMapRef.current = map
    infoWindowRef.current = new G.maps.InfoWindow()
  }, [mapLoaded])

  // Place markers when places or filter changes
  const updateMarkers = useCallback(() => {
    if (!googleMapRef.current || !mapLoaded) return
    const G = (window as any).google

    // Clear old markers
    markersRef.current.forEach(m => m.setMap(null))
    markersRef.current = []

    const toShow = filtered.filter(p => p.lat && p.lng)

    toShow.forEach(place => {
      const catSlug = place.category?.slug || 'default'
      const color = CATEGORY_COLORS[catSlug] || CATEGORY_COLORS.default
      const icon = place.category?.icon || '📍'

      const marker = new G.maps.Marker({
        position: { lat: parseFloat(place.lat), lng: parseFloat(place.lng) },
        map: googleMapRef.current,
        title: place.name,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="40" height="48" viewBox="0 0 40 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 0C9 0 0 9 0 20C0 34 20 48 20 48C20 48 40 34 40 20C40 9 31 0 20 0Z" fill="${color}"/>
              <circle cx="20" cy="20" r="14" fill="white"/>
              <text x="20" y="26" text-anchor="middle" font-size="16">${icon}</text>
            </svg>
          `)}`,
          scaledSize: new G.maps.Size(40, 48),
          anchor: new G.maps.Point(20, 48),
        }
      })

      marker.addListener('click', () => {
        setSelected(place)
        const content = `
          <div style="font-family:'Plus Jakarta Sans',sans-serif;max-width:240px;padding:4px">
            <div style="font-weight:700;font-size:14px;margin-bottom:4px">${icon} ${place.name}</div>
            <div style="font-size:12px;color:#666;margin-bottom:6px">${place.address}</div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
              <span style="background:${color};color:white;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600">★ ${place.rating?.toFixed(1)}</span>
              <span style="font-size:11px;color:#999">(${place.review_count} ulasan)</span>
            </div>
            <a href="/places/${place.slug}" style="display:block;text-align:center;background:${color};color:white;padding:6px;border-radius:8px;font-size:12px;font-weight:600;text-decoration:none">Lihat Detail →</a>
          </div>
        `
        infoWindowRef.current?.setContent(content)
        infoWindowRef.current?.open(googleMapRef.current, marker)
      })

      markersRef.current.push(marker)
    })
  }, [filtered, mapLoaded])

  useEffect(() => { updateMarkers() }, [updateMarkers])

  // Filter logic
  useEffect(() => {
    let result = places
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.address?.toLowerCase().includes(search.toLowerCase()))
    if (kecFilter) result = result.filter(p => p.kecamatan === kecFilter)
    if (catFilter) result = result.filter(p => p.category?.slug === catFilter)
    setFiltered(result)
  }, [places, search, kecFilter, catFilter])

  // Fly to kecamatan
  const flyToKec = (kec: string) => {
    const coords = KECAMATAN_COORDS[kec]
    if (coords && googleMapRef.current) {
      googleMapRef.current.panTo({ lat: coords.lat, lng: coords.lng })
      googleMapRef.current.setZoom(14)
    }
  }

  const placesWithCoords = filtered.filter(p => p.lat && p.lng)

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xl">🗺️</span>
          <h1 className="font-display font-bold text-lg text-gray-900 hidden sm:block">Peta Indramayu</h1>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Cari tempat di peta..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 text-sm" />
        </div>

        {/* Category filter */}
        <select value={catFilter} onChange={e => { setCatFilter(e.target.value) }}
          className="appearance-none px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-500 bg-white cursor-pointer">
          <option value="">📂 Semua</option>
          {categories.filter(c => c.place_count > 0).map(c => (
            <option key={c.id} value={c.slug}>{c.icon} {c.name}</option>
          ))}
        </select>

        {/* Kecamatan filter */}
        <select value={kecFilter} onChange={e => { setKecFilter(e.target.value); if (e.target.value) flyToKec(e.target.value) }}
          className="appearance-none px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-500 bg-white cursor-pointer">
          <option value="">📍 Semua Kecamatan</option>
          {KECAMATAN_LIST.map(k => <option key={k} value={k}>{k}</option>)}
        </select>

        {(search || kecFilter || catFilter) && (
          <button onClick={() => { setSearch(''); setKecFilter(''); setCatFilter('') }}
            className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-500 rounded-xl text-sm border border-red-200 hover:bg-red-100 shrink-0">
            <X className="w-3.5 h-3.5" /> Reset
          </button>
        )}

        <span className="text-xs text-gray-400 shrink-0">{placesWithCoords.length} di peta</span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Map */}
        <div className="flex-1 relative">
          <div ref={mapRef} className="w-full h-full" />

          {/* Loading overlay */}
          {(!mapLoaded || loading) && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
              <div className="text-center">
                <div className="text-5xl mb-3 animate-bounce">🗺️</div>
                <p className="text-gray-600 font-medium">Memuat Google Maps...</p>
                <p className="text-gray-400 text-sm mt-1">Indramayu, Jawa Barat</p>
              </div>
            </div>
          )}

          {/* Kecamatan quick jump */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 max-w-xs">
              <p className="text-xs font-semibold text-gray-500 mb-2 px-1">🏘️ Lompat ke Kecamatan</p>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                {Object.entries(KECAMATAN_COORDS).map(([kec]) => (
                  <button key={kec} onClick={() => { setKecFilter(kec); flyToKec(kec) }}
                    className={`px-2 py-1 rounded-lg text-xs transition-colors ${kecFilter === kec ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-brand-100'}`}>
                    {kec}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
          {/* Selected place detail */}
          {selected && (
            <div className="p-4 bg-brand-50 border-b border-brand-100">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span>{selected.category?.icon}</span>
                    <span className="text-xs text-brand-600 font-medium">{selected.category?.name}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">{selected.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{selected.address}</p>
                  {selected.rating > 0 && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-semibold">{selected.rating.toFixed(1)}</span>
                      <span className="text-xs text-gray-400">({selected.review_count})</span>
                    </div>
                  )}
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 mt-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <Link href={`/places/${selected.slug}`}
                className="mt-3 block text-center bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-brand-600 transition-colors">
                Lihat Detail Lengkap →
              </Link>
            </div>
          )}

          {/* Places list */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 sticky top-0">
              <p className="text-xs font-semibold text-gray-500">
                {filtered.length} tempat · {placesWithCoords.length} tampil di peta
              </p>
            </div>
            {filtered.length > 0 ? filtered.map(place => (
              <button key={place.id} onClick={() => {
                setSelected(place)
                if (place.lat && place.lng && googleMapRef.current) {
                  googleMapRef.current.panTo({ lat: parseFloat(place.lat), lng: parseFloat(place.lng) })
                  googleMapRef.current.setZoom(16)
                }
              }}
                className={`w-full flex items-start gap-3 p-3 border-b border-gray-50 hover:bg-gray-50 text-left transition-colors ${selected?.id === place.id ? 'bg-brand-50' : ''}`}>
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img src={place.cover_image || CATEGORY_IMAGES[place.category?.slug] || CATEGORY_IMAGES.default}
                    alt={place.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-sm">{place.category?.icon}</span>
                    <span className="font-semibold text-gray-900 text-xs truncate">{place.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{place.address}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {place.rating > 0 && <span className="text-xs text-yellow-600 font-medium">★ {place.rating.toFixed(1)}</span>}
                    {place.kecamatan && <span className="text-xs text-gray-400">📍 {place.kecamatan}</span>}
                    {!place.lat && <span className="text-xs text-gray-300">• no map</span>}
                  </div>
                </div>
              </button>
            )) : (
              <div className="p-8 text-center text-gray-400">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-200" />
                <p className="text-sm">Tidak ada tempat ditemukan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
