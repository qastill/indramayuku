import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { PlaceCard } from '@/components/places/PlaceCard'
import { Search, Trophy, Dumbbell, MapPin, ArrowRight, Users } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Olahraga & Fitness Indramayu | Indramayuku',
  description: 'Temukan lapangan futsal, gym, kolam renang, dan fasilitas olahraga terbaik di Indramayu.',
}

async function getOlahragaPlaces() {
  const catRes = await supabase.from('categories').select('id').eq('slug', 'olahraga').single()
  if (!catRes.data) return []
  const { data } = await supabase
    .from('places')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .eq('category_id', catRes.data.id)
    .order('rating', { ascending: false })
    .limit(20)
  return data || []
}

async function getSubcategories() {
  const catRes = await supabase.from('categories').select('id').eq('slug', 'olahraga').single()
  if (!catRes.data) return []
  const { data } = await supabase
    .from('places')
    .select('subcategory')
    .eq('category_id', catRes.data.id)
    .eq('is_active', true)
    .not('subcategory', 'is', null)
  const subs = [...new Set((data || []).map(d => d.subcategory).filter(Boolean))]
  return subs as string[]
}

const SPORT_ICONS: Record<string, string> = {
  'Futsal': '⚽',
  'Renang': '🏊',
  'GOR': '🏟️',
  'Gym': '💪',
  'Sepak Bola': '⚽',
  'Billiard': '🎱',
  'Panahan': '🏹',
  'Jogging': '🏃',
}

export default async function OlahragaPage() {
  const [places, subcategories] = await Promise.all([getOlahragaPlaces(), getSubcategories()])

  return (
    <div className="min-h-screen bg-green-50/30">
      {/* Hero - Sports themed with green gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-emerald-600 to-teal-500">
        {/* Decorative sports pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-8 left-[10%] text-9xl">⚽</div>
            <div className="absolute top-12 right-[15%] text-8xl">🏀</div>
            <div className="absolute bottom-8 left-[30%] text-7xl">🎱</div>
            <div className="absolute bottom-12 right-[25%] text-9xl">🎾</div>
          </div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full mb-6 border border-white/30">
            <Trophy className="w-4 h-4" />
            <span>Aktif & Sehat di Indramayu</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Fasilitas Olahraga<br />
            <span className="text-green-200">& Fitness Indramayu</span>
          </h1>
          <p className="text-green-100 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Temukan lapangan futsal, gym modern, kolam renang, dan berbagai fasilitas olahraga untuk gaya hidup aktif Anda
          </p>
          <form action="/places" className="flex gap-2 max-w-lg mx-auto">
            <input type="hidden" name="category" value="olahraga" />
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" name="q" placeholder="Cari gym, lapangan, kolam renang..." className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-gray-800 bg-white shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30 text-sm" />
            </div>
            <button type="submit" className="bg-green-300 text-green-900 px-6 py-3.5 rounded-2xl font-bold hover:bg-green-200 transition-all shadow-xl shrink-0 text-sm">Cari</button>
          </form>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="max-w-5xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-4 grid grid-cols-3 gap-4 text-center">
          <div><div className="text-2xl font-bold text-green-600">{places.length}</div><div className="text-xs text-gray-500">Fasilitas</div></div>
          <div><div className="text-2xl font-bold text-green-600">{subcategories.length}</div><div className="text-xs text-gray-500">Jenis Olahraga</div></div>
          <div><div className="text-2xl font-bold text-green-600">24/7</div><div className="text-xs text-gray-500">Beberapa Buka</div></div>
        </div>
      </div>

      {/* Sport Type Cards */}
      {subcategories.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 mt-8">
          <h2 className="font-display text-lg font-bold text-gray-900 mb-4">Pilih Jenis Olahraga</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {subcategories.map((sub) => (
              <Link
                key={sub}
                href={`/categories/olahraga?sub=${encodeURIComponent(sub)}`}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-green-100 hover:border-green-400 hover:shadow-md transition-all group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{SPORT_ICONS[sub] || '🏅'}</span>
                <span className="text-sm font-medium text-gray-700">{sub}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Places */}
      <section className="max-w-5xl mx-auto px-4 mt-10 pb-16">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-xl"><Dumbbell className="w-5 h-5 text-green-600" /></div>
            <div><h2 className="font-display text-xl font-bold text-gray-900">Semua Fasilitas Olahraga</h2><p className="text-sm text-gray-500">{places.length} tempat ditemukan</p></div>
          </div>
          <Link href="/categories/olahraga" className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium">Lihat Semua <ArrowRight className="w-4 h-4" /></Link>
        </div>
        {places.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {places.map(place => (
              <div key={place.id} className="relative">
                {place.subcategory && (
                  <div className="absolute top-3 left-3 z-10 bg-green-500 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                    {SPORT_ICONS[place.subcategory] || '🏅'} {place.subcategory}
                  </div>
                )}
                <PlaceCard place={place} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-green-100">
            <div className="text-5xl mb-4">🏋️</div>
            <h3 className="font-semibold text-gray-700 mb-2">Belum ada fasilitas olahraga</h3>
            <p className="text-gray-400 text-sm mb-4">Jadilah yang pertama menambahkan!</p>
            <Link href="/daftar-bisnis" className="btn-brand inline-block">Tambah Tempat</Link>
          </div>
        )}
      </section>
    </div>
  )
}
