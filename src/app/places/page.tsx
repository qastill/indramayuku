import { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { PlaceCard } from '@/components/places/PlaceCard'
import Link from 'next/link'
import { Filter, SlidersHorizontal } from 'lucide-react'
import { Place } from '@/types'

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

const PRICE_OPTIONS = [
  { label: 'Murah', value: 'Murah', desc: 'Rp' },
  { label: 'Sedang', value: 'Sedang', desc: 'Rp Rp' },
  { label: 'Mahal', value: 'Mahal', desc: 'Rp Rp Rp' },
]

const SORT_OPTIONS = [
  { label: 'Rating Tertinggi', value: 'rating' },
  { label: 'Terbaru', value: 'newest' },
  { label: 'Terpopuler', value: 'popular' },
]

async function getPlaces(params: PageProps['searchParams']): Promise<{ places: Place[], total: number }> {
  const page = parseInt(params.page || '1')
  const limit = 12
  const offset = (page - 1) * limit

  let query = supabase
    .from('places')
    .select('*, category:categories(*)', { count: 'exact' })
    .eq('is_active', true)

  if (params.category) query = query.eq('categories.slug', params.category)
  if (params.price) query = query.eq('price_range', params.price)
  if (params.kecamatan) query = query.eq('kecamatan', params.kecamatan)
  if (params.featured === 'true') query = query.eq('is_featured', true)

  if (params.sort === 'newest') {
    query = query.order('created_at', { ascending: false })
  } else if (params.sort === 'popular') {
    query = query.order('review_count', { ascending: false })
  } else {
    query = query.order('rating', { ascending: false })
  }

  query = query.range(offset, offset + limit - 1)

  const { data, count } = await query
  return { places: data || [], total: count || 0 }
}

async function getCategories() {
  const { data } = await supabase.from('categories').select('*').order('name')
  return data || []
}

export default async function PlacesPage({ searchParams }: PageProps) {
  const [{ places, total }, categories] = await Promise.all([
    getPlaces(searchParams),
    getCategories()
  ])

  const currentSort = searchParams.sort || 'rating'
  const currentPage = parseInt(searchParams.page || '1')
  const totalPages = Math.ceil(total / 12)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-gray-900">Jelajahi Semua Tempat</h1>
        <p className="text-gray-500 mt-1">{total.toLocaleString('id-ID')} tempat ditemukan di Indramayu</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 shrink-0">
          <div className="card p-4 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Kategori</h3>
              <div className="space-y-1">
                <Link
                  href="/places"
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${!searchParams.category ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <span>Semua</span>
                  <span className="text-xs text-gray-400">{total}</span>
                </Link>
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    href={`/places?category=${cat.slug}${searchParams.sort ? `&sort=${searchParams.sort}` : ''}`}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${searchParams.category === cat.slug ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      {cat.name}
                    </span>
                    <span className="text-xs text-gray-400">{cat.place_count}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Kisaran Harga</h3>
              <div className="space-y-1">
                {PRICE_OPTIONS.map(opt => (
                  <Link
                    key={opt.value}
                    href={`/places?price=${opt.value}${searchParams.sort ? `&sort=${searchParams.sort}` : ''}`}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${searchParams.price === opt.value ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <span>{opt.label}</span>
                    <span className="text-green-600 font-medium">{opt.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-4 bg-white rounded-xl border border-gray-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Urutkan:</span>
              <div className="flex gap-1">
                {SORT_OPTIONS.map(opt => (
                  <Link
                    key={opt.value}
                    href={`/places?sort=${opt.value}${searchParams.category ? `&category=${searchParams.category}` : ''}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${currentSort === opt.value ? 'bg-brand-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {opt.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          {places.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {places.map(place => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Link
                      key={page}
                      href={`/places?page=${page}${searchParams.category ? `&category=${searchParams.category}` : ''}${searchParams.sort ? `&sort=${searchParams.sort}` : ''}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-colors ${currentPage === page ? 'bg-brand-500 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300'}`}
                    >
                      {page}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-semibold text-gray-700 mb-2">Belum ada tempat</h3>
              <p className="text-gray-400 text-sm">Coba filter yang berbeda atau kembali ke semua tempat</p>
              <Link href="/places" className="btn-brand mt-4 inline-block">Lihat Semua</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
