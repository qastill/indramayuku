import { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { PlaceCard } from '@/components/places/PlaceCard'
import Link from 'next/link'
import { SlidersHorizontal, MapPin } from 'lucide-react'
import { Place } from '@/types'

interface PageProps {
  searchParams: { category?: string; sort?: string; price?: string; kecamatan?: string; featured?: string; page?: string }
}

const PRICE_OPTIONS = [
  { label: 'Murah', value: 'Murah' },
  { label: 'Sedang', value: 'Sedang' },
  { label: 'Mahal', value: 'Mahal' },
]

const SORT_OPTIONS = [
  { label: 'Rating Tertinggi', value: 'rating' },
  { label: 'Terbaru', value: 'newest' },
  { label: 'Terpopuler', value: 'popular' },
]

const KECAMATAN_LIST = [
  'Indramayu', 'Sindang', 'Balongan', 'Kandanghaur', 'Losarang',
  'Cantigi', 'Arahan', 'Kedokanbunder', 'Juntinyuat', 'Karangampel',
  'Krangkeng', 'Pasekan', 'Sliyeg', 'Jatibarang', 'Bangodua',
  'Tukdana', 'Widasari', 'Kertasemaya', 'Sukagumiwang', 'Terisi',
  'Cikedung', 'Lelea', 'Bongas', 'Anjatan', 'Patrol',
  'Sukra', 'Gabuswetan', 'Kroya', 'Haurgeulis', 'Gantar', 'Trisi'
]

async function getPlaces(params: PageProps['searchParams']): Promise<{ places: Place[], total: number }> {
  const page = parseInt(params.page || '1')
  const limit = 12
  const offset = (page - 1) * limit

  let query = supabase
    .from('places')
    .select('*, category:categories(*)', { count: 'exact' })
    .eq('is_active', true)

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
  const { data } = await supabase.from('categories').select('*').order('name')
  return data || []
}

function buildUrl(params: Record<string, string | undefined>, base = '/places') {
  const p = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => { if (v) p.set(k, v) })
  const s = p.toString()
  return s ? `${base}?${s}` : base
}

export default async function PlacesPage({ searchParams }: PageProps) {
  const [{ places, total }, categories] = await Promise.all([getPlaces(searchParams), getCategories()])
  const currentSort = searchParams.sort || 'rating'
  const currentPage = parseInt(searchParams.page || '1')
  const totalPages = Math.ceil(total / 12)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-gray-900">Jelajahi Semua Tempat</h1>
        <p className="text-gray-500 mt-1">{total.toLocaleString('id-ID')} tempat ditemukan di Indramayu</p>
      </div>

      {/* Kecamatan Quick Filter */}
      <div className="bg-orange-50 rounded-xl p-4 mb-6 border border-orange-100">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-brand-500" />
          <span className="text-sm font-semibold text-gray-700">Filter Kecamatan</span>
          {searchParams.kecamatan && (
            <Link href={buildUrl({ ...searchParams, kecamatan: undefined, page: undefined })} 
              className="ml-auto text-xs text-brand-500 hover:underline">Hapus filter</Link>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={buildUrl({ ...searchParams, kecamatan: undefined, page: undefined })}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!searchParams.kecamatan ? 'bg-brand-500 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300'}`}>
            📍 Semua
          </Link>
          {KECAMATAN_LIST.map(kec => (
            <Link key={kec} href={buildUrl({ ...searchParams, kecamatan: kec, page: undefined })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${searchParams.kecamatan === kec ? 'bg-brand-500 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300'}`}>
              {kec}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="card p-4 space-y-5">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">📂 Kategori</h3>
              <div className="space-y-0.5 max-h-80 overflow-y-auto">
                <Link href={buildUrl({ ...searchParams, category: undefined, page: undefined })}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${!searchParams.category ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <span>Semua</span><span className="text-xs text-gray-400">{total}</span>
                </Link>
                {categories.map(cat => (
                  <Link key={cat.id} href={buildUrl({ ...searchParams, category: cat.slug, page: undefined })}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${searchParams.category === cat.slug ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <span className="flex items-center gap-2"><span>{cat.icon}</span>{cat.name}</span>
                    <span className="text-xs text-gray-400">{cat.place_count}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">💰 Kisaran Harga</h3>
              <div className="space-y-1">
                {PRICE_OPTIONS.map(opt => (
                  <Link key={opt.value} href={buildUrl({ ...searchParams, price: opt.value, page: undefined })}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${searchParams.price === opt.value ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <span>{opt.label}</span>
                    <span className="text-green-600 font-medium">{opt.value === 'Murah' ? 'Rp' : opt.value === 'Sedang' ? 'Rp Rp' : 'Rp Rp Rp'}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4 bg-white rounded-xl border border-gray-100 px-4 py-3">
            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Urutkan:</span>
              {SORT_OPTIONS.map(opt => (
                <Link key={opt.value} href={buildUrl({ ...searchParams, sort: opt.value })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${currentSort === opt.value ? 'bg-brand-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  {opt.label}
                </Link>
              ))}
            </div>
            {searchParams.kecamatan && (
              <span className="badge bg-brand-100 text-brand-700 text-xs">📍 {searchParams.kecamatan}</span>
            )}
          </div>

          {places.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {places.map(place => <PlaceCard key={place.id} place={place} />)}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map(page => (
                    <Link key={page} href={buildUrl({ ...searchParams, page: String(page) })}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-colors ${currentPage === page ? 'bg-brand-500 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300'}`}>
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
              <p className="text-gray-400 text-sm">Coba filter yang berbeda</p>
              <Link href="/places" className="btn-brand mt-4 inline-block">Lihat Semua</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
