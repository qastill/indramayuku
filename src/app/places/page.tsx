import { supabase } from '@/lib/supabase'
import { PlaceCard } from '@/components/places/PlaceCard'
import Link from 'next/link'
import { SlidersHorizontal, X } from 'lucide-react'
import { Place } from '@/types'
import { KecamatanFilter } from '@/components/places/KecamatanFilter'
import { CategoryFilter } from '@/components/places/CategoryFilter'

interface PageProps {
  searchParams: {
    category?: string
    sort?: string
    price?: string
    kecamatan?: string
    featured?: string
    page?: string
  }
}

const SORT_OPTIONS = [
  { label: 'Rating Tertinggi', value: 'rating' },
  { label: 'Terbaru', value: 'newest' },
  { label: 'Terpopuler', value: 'popular' },
]

const PRICE_OPTIONS = [
  { label: 'Semua', value: '' },
  { label: '🟢 Murah', value: 'Murah' },
  { label: '🟡 Sedang', value: 'Sedang' },
  { label: '🔴 Mahal', value: 'Mahal' },
]

async function getPlaces(params: PageProps['searchParams']): Promise<{ places: Place[], total: number }> {
  const page = parseInt(params.page || '1')
  const limit = 12
  const offset = (page - 1) * limit

  let query = supabase
    .from('places')
    .select('*, category:categories(*)', { count: 'exact' })
    .eq('is_active', true)

  if (params.category) {
    const { data: cat } = await supabase.from('categories').select('id').eq('slug', params.category).single()
    if (cat) query = query.eq('category_id', cat.id)
  }
  if (params.price) query = query.eq('price_range', params.price)
  if (params.kecamatan) query = query.eq('kecamatan', params.kecamatan)
  if (params.featured === 'true') query = query.eq('is_featured', true)

  if (params.sort === 'newest') query = query.order('created_at', { ascending: false })
  else if (params.sort === 'popular') query = query.order('review_count', { ascending: false })
  else query = query.order('rating', { ascending: false })

  query = query.range(offset, offset + limit - 1)
  const { data, count } = await query
  return { places: data || [], total: count || 0 }
}

async function getCategories() {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('place_count', { ascending: false })
  return data || []
}

function buildUrl(current: PageProps['searchParams'], overrides: Record<string, string | undefined>) {
  const merged = { ...current, ...overrides, page: undefined }
  const p = new URLSearchParams()
  Object.entries(merged).forEach(([k, v]) => { if (v) p.set(k, v) })
  const s = p.toString()
  return s ? `/places?${s}` : '/places'
}

export default async function PlacesPage({ searchParams }: PageProps) {
  const [{ places, total }, categories] = await Promise.all([
    getPlaces(searchParams),
    getCategories()
  ])

  const currentSort = searchParams.sort || 'rating'
  const currentPage = parseInt(searchParams.page || '1')
  const totalPages = Math.ceil(total / 12)

  const selectedCategory = categories.find(c => c.slug === searchParams.category)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-gray-900">
          {selectedCategory ? (
            <span className="flex items-center gap-2">
              <span>{selectedCategory.icon}</span> {selectedCategory.name}
            </span>
          ) : 'Jelajahi Semua Tempat'}
        </h1>
        <p className="text-gray-500 mt-1">
          {total.toLocaleString('id-ID')} tempat ditemukan
          {searchParams.kecamatan && <span className="text-brand-500"> di Kec. {searchParams.kecamatan}</span>}
          {searchParams.price && <span className="text-gray-400"> · {searchParams.price}</span>}
        </p>
      </div>

      {/* ===== FILTER BAR ===== */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 flex flex-wrap items-center gap-3">

        {/* Kategori dropdown — client component */}
        <CategoryFilter
          categories={categories}
          current={searchParams.category || ''}
          searchParams={searchParams}
        />

        {/* Kecamatan — client component */}
        <KecamatanFilter current={searchParams.kecamatan || ''} searchParams={searchParams} />

        {/* Harga */}
        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
          {PRICE_OPTIONS.map(opt => (
            <Link
              key={opt.value}
              href={buildUrl(searchParams, { price: opt.value || undefined })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                (searchParams.price || '') === opt.value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {opt.label}
            </Link>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1 ml-auto">
          <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
          <div className="flex gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
            {SORT_OPTIONS.map(opt => (
              <Link
                key={opt.value}
                href={buildUrl(searchParams, { sort: opt.value })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  currentSort === opt.value
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {opt.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Active filters / reset */}
        {(searchParams.category || searchParams.kecamatan || searchParams.price) && (
          <Link
            href="/places"
            className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 rounded-xl text-xs font-medium hover:bg-red-100 transition-colors border border-red-200"
          >
            <X className="w-3.5 h-3.5" /> Reset Filter
          </Link>
        )}
      </div>

      {/* Active filter badges */}
      {(selectedCategory || searchParams.kecamatan || searchParams.price) && (
        <div className="flex flex-wrap gap-2 mb-5">
          {selectedCategory && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 rounded-full text-sm border border-brand-200">
              <span>{selectedCategory.icon}</span>
              <span>{selectedCategory.name}</span>
              <Link href={buildUrl(searchParams, { category: undefined })} className="ml-1 hover:text-brand-900">
                <X className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
          {searchParams.kecamatan && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200">
              <span>📍</span>
              <span>Kec. {searchParams.kecamatan}</span>
              <Link href={buildUrl(searchParams, { kecamatan: undefined })} className="ml-1 hover:text-blue-900">
                <X className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
          {searchParams.price && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm border border-green-200">
              <span>💰</span>
              <span>{searchParams.price}</span>
              <Link href={buildUrl(searchParams, { price: undefined })} className="ml-1 hover:text-green-900">
                <X className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Sidebar + Grid layout */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Sidebar — only when category selected */}
        {selectedCategory && (
          <aside className="lg:w-56 shrink-0">
            <div className="card p-4 sticky top-20">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Kategori Lain</p>
              <div className="space-y-0.5">
                {categories.filter(c => c.place_count > 0).slice(0, 12).map(cat => (
                  <Link
                    key={cat.id}
                    href={buildUrl(searchParams, { category: cat.slug })}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      searchParams.category === cat.slug
                        ? 'bg-brand-50 text-brand-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="flex-1 truncate">{cat.name}</span>
                    <span className="text-xs text-gray-400">{cat.place_count}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Main grid */}
        <div className="flex-1 min-w-0">
          {places.length > 0 ? (
            <>
              <div className={`grid gap-5 ${
                selectedCategory
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}>
                {places.map(place => <PlaceCard key={place.id} place={place} />)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {currentPage > 1 && (
                    <Link href={buildUrl(searchParams, { page: String(currentPage - 1) })}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-brand-300 transition-colors">
                      ← Prev
                    </Link>
                  )}
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    const p = i + 1
                    return (
                      <Link key={p} href={buildUrl(searchParams, { page: String(p) })}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-colors ${
                          currentPage === p ? 'bg-brand-500 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300'
                        }`}>
                        {p}
                      </Link>
                    )
                  })}
                  {currentPage < totalPages && (
                    <Link href={buildUrl(searchParams, { page: String(currentPage + 1) })}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-brand-300 transition-colors">
                      Next →
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-semibold text-gray-700 mb-2">Tidak ada tempat ditemukan</h3>
              <p className="text-gray-400 text-sm mb-5">Coba ubah filter atau kecamatan yang dipilih</p>
              <Link href="/places" className="btn-brand inline-block">Hapus Semua Filter</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
