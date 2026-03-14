import { supabase } from '@/lib/supabase'
import { PlaceCard } from '@/components/places/PlaceCard'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Masjid & Mushola di Indramayu | Indramayuku',
  description: 'Temukan masjid, mushola, dan tempat ibadah Islam di Indramayu lengkap dengan alamat dan informasi',
}

async function getMasjid() {
  const { data: cat } = await supabase.from('categories').select('id').eq('slug', 'masjid').single()
  if (!cat) return []
  const { data } = await supabase
    .from('places')
    .select('*, category:categories(*)')
    .eq('category_id', cat.id)
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('rating', { ascending: false })
  return data || []
}

export default async function MasjidPage() {
  const masjid = await getMasjid()

  const byType: Record<string, typeof masjid> = {}
  for (const m of masjid) {
    const sub = m.subcategory || 'Masjid Lainnya'
    if (!byType[sub]) byType[sub] = []
    byType[sub].push(m)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-emerald-800 to-teal-700 p-8 text-white">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=1200&h=400&fit=crop')", backgroundSize: 'cover'}} />
        <div className="relative">
          <div className="text-5xl mb-3">🕌</div>
          <h1 className="font-display text-3xl font-bold mb-2">Masjid & Mushola Indramayu</h1>
          <p className="text-emerald-100 mb-4">Temukan masjid bersejarah, megah, dan terdekat di seluruh Indramayu</p>
          <div className="flex gap-3">
            <span className="badge bg-white/20 text-white border border-white/30">{masjid.length} Masjid & Mushola</span>
            <span className="badge bg-white/20 text-white border border-white/30">📍 31 Kecamatan</span>
          </div>
        </div>
      </div>

      {/* Wisata Religi Banner */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 mb-8 flex gap-4 items-start">
        <div className="text-3xl">🌙</div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Wisata Religi Indramayu</h3>
          <p className="text-sm text-gray-600">Indramayu memiliki warisan Islam yang kaya sejak abad ke-15. Dari masjid kuno berusia 600 tahun hingga masjid megah modern dengan menara tertinggi ke-3 di dunia!</p>
        </div>
      </div>

      {/* By subcategory */}
      {Object.entries(byType).map(([sub, places]) => (
        <div key={sub} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display text-xl font-bold text-gray-900">{sub}</h2>
            <span className="badge bg-emerald-100 text-emerald-700">{places.length}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {places.map(place => <PlaceCard key={place.id} place={place} />)}
          </div>
        </div>
      ))}

      {masjid.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🕌</div>
          <h3 className="font-semibold text-gray-700">Belum ada data masjid</h3>
        </div>
      )}
    </div>
  )
}
