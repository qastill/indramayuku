import { supabase } from '@/lib/supabase'
import { PlaceCard } from '@/components/places/PlaceCard'
import Link from 'next/link'

async function getApotek() {
  const { data: cat } = await supabase.from('categories').select('id').eq('slug', 'apotek').single()
  if (!cat) return []
  const { data } = await supabase
    .from('places')
    .select('*, category:categories(*)')
    .eq('category_id', cat.id)
    .eq('is_active', true)
    .order('rating', { ascending: false })
  return data || []
}

export default async function ApotekPage() {
  const apotek = await getApotek()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-purple-700 to-violet-800 p-8 text-white">
        <div className="text-5xl mb-3">💊</div>
        <h1 className="font-display text-3xl font-bold mb-2">Apotek & Toko Obat Indramayu</h1>
        <p className="text-purple-100">Temukan apotek terdekat, buka 24 jam, dan toko obat herbal di Indramayu</p>
      </div>

      {/* Emergency info */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-8 flex gap-4">
        <div className="text-2xl">🚨</div>
        <div>
          <h3 className="font-semibold text-red-800 mb-1">Darurat Kesehatan?</h3>
          <p className="text-sm text-red-700">Hubungi <strong>IGD RSUD Indramayu: (0234) 272965</strong> • 
          <strong> IGD RS Bhayangkara: (0234) 272000</strong> • 
          <strong> Ambulans: 118</strong></p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {apotek.map(place => <PlaceCard key={place.id} place={place} />)}
      </div>

      {apotek.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">💊</div>
          <h3 className="font-semibold text-gray-700">Belum ada data apotek</h3>
          <Link href="/daftar-bisnis" className="btn-brand inline-block mt-4">Daftarkan Apotek</Link>
        </div>
      )}
    </div>
  )
}
