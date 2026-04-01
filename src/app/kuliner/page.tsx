import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { PlaceCard } from '@/components/places/PlaceCard'
import { Search, Utensils, Star, Flame, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Kuliner Indramayu - Jelajahi Makanan Terbaik | Indramayuku',
  description: 'Temukan restoran, warung, dan kuliner terbaik di Indramayu.',
}

async function getKulinerPlaces() {
  const catRes = await supabase.from('categories').select('id').eq('slug', 'kuliner').single()
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

async function getFeaturedKuliner() {
  const catRes = await supabase.from('categories').select('id').eq('slug', 'kuliner').single()
  if (!catRes.data) return []
  const { data } = await supabase
    .from('places')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .eq('is_featured', true)
    .eq('category_id', catRes.data.id)
    .order('rating', { ascending: false })
    .limit(4)
  return data || []
}

const KULINER_TYPES = [
  { name: 'Semua', icon: '🍽️', href: '/kuliner' },
  { name: 'Warung Makan', icon: '🍚', href: '/categories/kuliner?sub=Warung+Makan' },
  { name: 'Restoran', icon: '🍛', href: '/categories/kuliner?sub=Restoran' },
  { name: 'Kafe', icon: '☕', href: '/categories/kuliner?sub=Kafe' },
  { name: 'Seafood', icon: '🦐', href: '/categories/kuliner?sub=Seafood' },
  { name: 'Street Food', icon: '🍢', href: '/categories/kuliner?sub=Street+Food' },
  { name: 'Bakery', icon: '🍰', href: '/categories/kuliner?sub=Bakery' },
]

export default async function KulinerPage() {
  const [allPlaces, featured] = await Promise.all([getKulinerPlaces(), getFeaturedKuliner()])

  return (
    <div className="min-h-screen bg-orange-50/30">
      {/* Hero Section - Food themed */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-red-500 to-amber-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🍜</div>
          <div className="absolute top-20 right-20 text-7xl">🍛</div>
          <div className="absolute bottom-10 left-1/4 text-6xl">🥘</div>
          <div className="absolute bottom-20 right-1/3 text-8xl">🍲</div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full mb-6 border border-white/30">
            <Flame className="w-4 h-4" />
            <span>Surga Kuliner Indramayu</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Jelajahi Kuliner<br />
            <span className="text-amber-200">Terbaik di Indramayu</span>
          </h1>
          <p className="text-orange-100 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Dari warung legendaris hingga restoran modern, temukan cita rasa autentik Indramayu yang memanjakan lidah Anda
          </p>
          <form action="/places" className="flex gap-2 max-w-lg mx-auto">
            <input type="hidden" name="category" value="kuliner" />
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" name="q" placeholder="Cari warung, restoran, kafe..." className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-gray-800 bg-white shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30 text-sm" />
            </div>
            <button type="submit" className="bg-amber-400 text-amber-900 px-6 py-3.5 rounded-2xl font-bold hover:bg-amber-300 transition-all shadow-xl shrink-0 text-sm">Cari</button>
          </form>
        </div>
      </section>

      {/* Quick Stats */}
      <div className="max-w-5xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-4 grid grid-cols-3 gap-4 text-center">
          <div><div className="text-2xl font-bold text-orange-600">{allPlaces.length}+</div><div className="text-xs text-gray-500">Tempat Kuliner</div></div>
          <div><div className="text-2xl font-bold text-orange-600">4.5</div><div className="text-xs text-gray-500">Rating Rata-rata</div></div>
          <div><div className="text-2xl font-bold text-orange-600">31</div><div className="text-xs text-gray-500">Kecamatan</div></div>
        </div>
      </div>

      {/* Subcategory Pills */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {KULINER_TYPES.map((sub) => (
            <Link key={sub.name} href={sub.href} className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition-all whitespace-nowrap text-sm font-medium text-gray-700 shadow-sm">
              <span>{sub.icon}</span><span>{sub.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 mt-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-orange-100 rounded-xl"><Star className="w-5 h-5 text-orange-500" /></div>
            <div><h2 className="font-display text-xl font-bold text-gray-900">Rekomendasi Pilihan</h2><p className="text-sm text-gray-500">Tempat kuliner paling populer di Indramayu</p></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map(place => <PlaceCard key={place.id} place={place} />)}
          </div>
        </section>
      )}

      {/* All Kuliner */}
      <section className="max-w-5xl mx-auto px-4 mt-12 pb-16">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-xl"><Utensils className="w-5 h-5 text-red-500" /></div>
            <div><h2 className="font-display text-xl font-bold text-gray-900">Semua Kuliner</h2><p className="text-sm text-gray-500">{allPlaces.length} tempat ditemukan</p></div>
          </div>
          <Link href="/categories/kuliner" className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium">Lihat Semua <ArrowRight className="w-4 h-4" /></Link>
        </div>
        {allPlaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allPlaces.map(place => <PlaceCard key={place.id} place={place} />)}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-orange-100">
            <div className="text-5xl mb-4">🍽️</div>
            <h3 className="font-semibold text-gray-700 mb-2">Belum ada tempat kuliner</h3>
            <p className="text-gray-400 text-sm mb-4">Jadilah yang pertama menambahkan!</p>
            <Link href="/daftar-bisnis" className="btn-brand inline-block">Tambah Tempat</Link>
          </div>
        )}
      </section>
    </div>
  )
}
