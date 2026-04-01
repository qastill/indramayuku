import Link from 'next/link'
import { Search, MapPin, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Category, CATEGORY_IMAGES } from '@/types'

export const revalidate = 60

async function getCategories(): Promise<Category[]> {
  const { data } = await supabase.from('categories').select('*').order('place_count', { ascending: false }).limit(12)
  return data || []
}

async function getTotalStats() {
  const { count: places } = await supabase.from('places').select('*', { count: 'exact', head: true }).eq('is_active', true)
  return { places: places || 0 }
}

export default async function HomePage() {
  const [categories, stats] = await Promise.all([getCategories(), getTotalStats()])

  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 140px)' }}>
      <section className="flex-1 flex flex-col justify-center bg-gradient-to-br from-brand-600 via-brand-500 to-orange-500 px-4 sm:px-6 py-8">
        <div className="max-w-3xl mx-auto w-full text-center">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 leading-tight">
            Temukan Apa Saja di{' '}
            <span className="italic text-orange-200">Indramayu</span>
          </h1>
          <p className="text-orange-100 text-sm md:text-base mb-6">
            {stats.places.toLocaleString('id-ID')} tempat terdaftar
          </p>

          <form action="/places" className="flex gap-2 max-w-xl mx-auto mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="q"
                placeholder="Cari restoran, apotek, tukang..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30 text-sm"
              />
            </div>
            <button type="submit" className="bg-white text-brand-600 px-5 py-3 rounded-2xl font-bold hover:bg-orange-50 transition-all shadow-lg shrink-0 text-sm">
              Cari
            </button>
          </form>

          <div className="flex justify-center gap-3 mb-6">
            <Link href="/peta" className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-4 py-2 rounded-full border border-white/30 transition-all">
              <MapPin className="w-3.5 h-3.5" />
              Buka Peta
            </Link>
            <Link href="/places" className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-4 py-2 rounded-full border border-white/30 transition-all">
              Jelajahi Semua
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-w-3xl mx-auto">
            {categories.map((cat) => {
              const imgUrl = CATEGORY_IMAGES[cat.slug] || CATEGORY_IMAGES.default
              return (
                <Link
                  key={cat.id}
                                    href={`/places?category=${cat.slug}`}
                  className="group relative overflow-hidden rounded-xl aspect-square"
                >
                  <img
                    src={imgUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                    <span className="text-[11px] font-semibold text-white leading-tight block truncate">{cat.name}</span>
                    <span className="text-[10px] text-white/70">{cat.place_count}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
