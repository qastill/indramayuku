'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { MapPin, Search, Filter } from 'lucide-react'
import Link from 'next/link'

const KECAMATAN_COORDS: Record<string, [number, number]> = {
  'Indramayu': [-6.3276, 108.3215],
  'Jatibarang': [-6.4713, 108.2345],
  'Haurgeulis': [-6.3513, 108.0234],
  'Karangampel': [-6.3841, 108.4523],
  'Losarang': [-6.2834, 108.1234],
  'Kandanghaur': [-6.2123, 108.0567],
  'Kertasemaya': [-6.5012, 108.2834],
  'Gantar': [-6.4854, 108.1621],
  'Juntinyuat': [-6.3634, 108.4012],
  'Balongan': [-6.2734, 108.3456],
}

export default function PetaPage() {
  const mapRef = useRef<any>(null)
  const [places, setPlaces] = useState<any[]>([])
  const [filter, setFilter] = useState('')
  const [kecFilter, setKecFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const mapInitRef = useRef(false)

  useEffect(() => {
    loadPlaces()
  }, [filter, kecFilter])

  const loadPlaces = async () => {
    let query = supabase
      .from('places')
      .select('*, category:categories(name, icon, slug, color)')
      .eq('is_active', true)
      .not('lat', 'is', null)
      .limit(50)

    if (kecFilter) query = query.eq('kecamatan', kecFilter)
    const { data } = await query
    setPlaces(data || [])
    setLoading(false)
  }

  useEffect(() => {
    if (typeof window === 'undefined' || mapInitRef.current) return
    mapInitRef.current = true

    // Load Leaflet dynamically
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => {
      const L = (window as any).L
      if (!L || mapRef.current) return

      const map = L.map('map', {
        center: [-6.3276, 108.3215],
        zoom: 11,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map)

      mapRef.current = map

      // Add markers for places with coords
      places.forEach(p => {
        if (p.lat && p.lng) {
          const icon = L.divIcon({
            className: '',
            html: `<div style="background:${p.category?.color || '#E8520A'};width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"><span style="transform:rotate(45deg);font-size:14px">${p.category?.icon || '📍'}</span></div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          })
          L.marker([p.lat, p.lng], { icon })
            .addTo(map)
            .bindPopup(`<div style="font-family:sans-serif;max-width:200px"><strong>${p.name}</strong><br/><small style="color:#666">${p.address}</small><br/><a href="/places/${p.slug}" style="color:#E8520A;font-size:12px">Lihat detail →</a></div>`)
        }
      })

      // Add kecamatan markers
      Object.entries(KECAMATAN_COORDS).forEach(([kec, coords]) => {
        L.circleMarker(coords, { radius: 8, fillColor: '#E8520A', color: 'white', weight: 2, opacity: 1, fillOpacity: 0.6 })
          .addTo(map)
          .bindTooltip(kec, { permanent: false, direction: 'top' })
      })
    }
    document.head.appendChild(script)
  }, [places])

  const KECS = ['Indramayu', 'Jatibarang', 'Haurgeulis', 'Karangampel', 'Losarang', 'Kandanghaur', 'Kertasemaya', 'Gantar', 'Juntinyuat', 'Balongan', 'Sindang', 'Cikedung', 'Lelea']

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <h1 className="font-display font-bold text-lg text-gray-900">🗺️ Peta Indramayu</h1>
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Cari tempat di peta..." value={filter} onChange={e => setFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 text-sm" />
        </div>
        <select value={kecFilter} onChange={e => setKecFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 text-sm">
          <option value="">Semua Kecamatan</option>
          {KECS.map(k => <option key={k} value={k}>{k}</option>)}
        </select>
      </div>

      <div className="flex-1 relative">
        {/* Map */}
        <div id="map" className="w-full h-full" />

        {/* Loading */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <div className="text-center">
              <div className="text-4xl mb-2 animate-bounce">🗺️</div>
              <p className="text-gray-600">Memuat peta Indramayu...</p>
            </div>
          </div>
        )}

        {/* Places list overlay */}
        <div className="absolute top-4 right-4 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-10 max-h-[70vh]">
          <div className="p-3 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-semibold text-gray-700">📍 {places.length} Tempat dengan Koordinat</p>
          </div>
          <div className="overflow-y-auto max-h-[60vh]">
            {places.map(p => (
              <Link key={p.id} href={`/places/${p.slug}`}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0" style={{ backgroundColor: (p.category?.color || '#E8520A') + '20' }}>
                  {p.category?.icon || '📍'}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400 truncate">{p.kecamatan}</p>
                </div>
                <div className="text-xs text-yellow-500 shrink-0">★{p.rating?.toFixed(1)}</div>
              </Link>
            ))}
            {places.length === 0 && !loading && (
              <div className="p-6 text-center text-gray-400 text-sm">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-200" />
                Belum ada tempat dengan koordinat
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-md border border-gray-100 p-3 z-10">
          <p className="text-xs font-semibold text-gray-600 mb-2">Legenda</p>
          <div className="space-y-1">
            {[
              { color: '#E8520A', label: 'Kuliner' },
              { color: '#0EA5E9', label: 'Wisata' },
              { color: '#8B5CF6', label: 'Hotel' },
              { color: '#065F46', label: 'Masjid' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
                <span className="text-xs text-gray-600">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
