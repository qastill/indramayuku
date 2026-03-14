import { supabase } from '@/lib/supabase'
import { PlaceCard } from '@/components/places/PlaceCard'
import Link from 'next/link'
import { Wrench, Search } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jasa & Tukang Indramayu | Temukan Semua Jasa Lokal',
  description: 'Cari tukang listrik, tukang bangunan, bengkel, laundry, servis AC, dan semua jasa lokal di Indramayu',
}

const JASA_TYPES = [
  { icon: '⚡', name: 'Tukang Listrik', slug: 'Tukang Listrik' },
  { icon: '🔧', name: 'Bengkel & Las', slug: 'Bengkel Las' },
  { icon: '🏠', name: 'Tukang Bangunan', slug: 'Tukang Bangunan' },
  { icon: '❄️', name: 'Servis AC', slug: 'Servis AC' },
  { icon: '👕', name: 'Tukang Jahit', slug: 'Tukang Jahit' },
  { icon: '📱', name: 'Servis Elektronik', slug: 'Servis Elektronik' },
  { icon: '🎨', name: 'Tukang Cat', slug: 'Tukang Cat' },
  { icon: '💧', name: 'Sumur & Air', slug: 'Sumur & Air' },
  { icon: '🪵', name: 'Tukang Kayu', slug: 'Tukang Kayu' },
  { icon: '🛺', name: 'Transportasi', slug: 'Transportasi' },
  { icon: '👚', name: 'Laundry', slug: 'Laundry' },
  { icon: '🚿', name: 'Pipa & Sanitasi', slug: 'Pipa & Sanitasi' },
  { icon: '🧹', name: 'Cleaning Service', slug: 'Cleaning Service' },
]

async function getJasaPlaces(subcategory?: string) {
  let query = supabase
    .from('places')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .in('category_id', [
      supabase.from('categories').select('id').eq('slug', 'jasa')
    ])
  
  // Get jasa category id first
  const { data: cat } = await supabase.from('categories').select('id').eq('slug', 'jasa').single()
  if (!cat) return []
  
  let q = supabase.from('places').select('*, category:categories(*)').eq('category_id', cat.id).eq('is_active', true)
  if (subcategory) q = q.eq('subcategory', subcategory)
  const { data } = await q
  return data || []
}

interface Props { searchParams: { sub?: string } }

export default async function JasaPage({ searchParams }: Props) {
  const sub = searchParams.sub || ''
  const places = await getJasaPlaces(sub)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-amber-700 to-red-800 p-8 text-white">
        <div className="text-5xl mb-3">🔨</div>
        <h1 className="font-display text-3xl font-bold mb-2">Jasa & Tukang Indramayu</h1>
        <p className="text-orange-100">Temukan semua jasa lokal di Indramayu — tukang listrik, bengkel, laundry, servis, dan lebih banyak lagi</p>
      </div>

      {/* Filter jenis jasa */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2 mb-8">
        <Link href="/jasa" className={`flex flex-col items-center gap-1 p-3 rounded-xl text-xs font-medium border transition-all ${!sub ? 'bg-brand-500 text-white border-brand-500' : 'bg-white border-gray-200 text-gray-600 hover:border-brand-300'}`}>
          <span className="text-xl">🔨</span><span>Semua</span>
        </Link>
        {JASA_TYPES.map(j => (
          <Link key={j.slug} href={`/jasa?sub=${encodeURIComponent(j.slug)}`}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl text-xs font-medium border transition-all text-center ${sub === j.slug ? 'bg-brand-500 text-white border-brand-500' : 'bg-white border-gray-200 text-gray-600 hover:border-brand-300'}`}>
            <span className="text-xl">{j.icon}</span><span>{j.name}</span>
          </Link>
        ))}
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900">{sub || 'Semua Jasa'} <span className="text-gray-400 font-normal">({places.length} tersedia)</span></h2>
        <Link href="/daftar-bisnis?cat=jasa" className="btn-brand text-sm py-2 px-4">+ Daftarkan Jasa Kamu</Link>
      </div>

      {places.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {places.map(place => <PlaceCard key={place.id} place={place} />)}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <Wrench className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-700">Belum ada jasa terdaftar</h3>
          <p className="text-gray-400 text-sm mt-1 mb-4">Punya jasa di Indramayu? Daftarkan sekarang!</p>
          <Link href="/daftar-bisnis" className="btn-brand inline-block">Daftarkan Jasa</Link>
        </div>
      )}

      {/* Tips mencari jasa */}
      <div className="mt-10 bg-orange-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-semibold text-gray-900 mb-3">💡 Tips Mencari Jasa Terpercaya di Indramayu</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>✅ Lihat rating dan ulasan dari pelanggan sebelumnya</li>
          <li>✅ Tanya estimasi biaya sebelum pekerjaan dimulai</li>
          <li>✅ Minta garansi untuk pekerjaan yang sudah selesai</li>
          <li>✅ Gunakan Forum Warga untuk tanya rekomendasi dari tetangga</li>
          <li>✅ Bayar setelah pekerjaan selesai dan memuaskan</li>
        </ul>
      </div>
    </div>
  )
}
