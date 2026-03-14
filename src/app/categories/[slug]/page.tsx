import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { PlaceCard } from '@/components/places/PlaceCard'
import Link from 'next/link'
import { ChevronLeft, X } from 'lucide-react'
import { CATEGORY_IMAGES } from '@/types'
import { KecamatanFilter } from '@/components/places/KecamatanFilter'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
  searchParams: { kecamatan?: string; sub?: string; sort?: string }
}

async function getCategory(slug: string) {
  const { data } = await supabase.from('categories').select('*').eq('slug', slug).single()
  return data
}

async function getPlacesByCategory(categoryId: string, filters: Props['searchParams']) {
  let query = supabase
    .from('places')
    .select('*, category:categories(*)')
    .eq('category_id', categoryId)
    .eq('is_active', true)

  if (filters.kecamatan) query = query.eq('kecamatan', filters.kecamatan)
  if (filters.sub) query = query.eq('subcategory', filters.sub)

  if (filters.sort === 'newest') query = query.order('created_at', { ascending: false })
  else if (filters.sort === 'popular') query = query.order('review_count', { ascending: false })
  else {
    query = query.order('is_featured', { ascending: false })
    query = query.order('rating', { ascending: false })
  }

  const { data } = await query
  return data || []
}

async function getSubcategories(categoryId: string) {
  const { data } = await supabase
    .from('places')
    .select('subcategory')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .not('subcategory', 'is', null)

  const subs = [...new Set((data || []).map(d => d.subcategory).filter(Boolean))]
  return subs as string[]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = await getCategory(params.slug)
  if (!cat) return { title: 'Kategori tidak ditemukan' }
  return {
    title: `${cat.name} di Indramayu | Indramayuku`,
    description: cat.description || `Daftar ${cat.name} terbaik di Indramayu`,
  }
}

function buildCatUrl(slug: string, params: Record<string, string | undefined>) {
  const p = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => { if (v) p.set(k, v) })
  const s = p.toString()
  return s ? `/categories/${slug}?${s}` : `/categories/${slug}`
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const category = await getCategory(params.slug)
  if (!category) notFound()

  const [places, subcategories] = await Promise.all([
    getPlacesByCategory(category.id, searchParams),
    getSubcategories(category.id),
  ])

  const coverImg = CATEGORY_IMAGES[category.slug] || CATEGORY_IMAGES.default
  const hasFilters = !!(searchParams.kecamatan || searchParams.sub)

  // Group by subcategory when no sub filter active
  const grouped: Record<string, typeof places> = {}
  const noSub: typeof places = []
  if (!searchParams.sub) {
    for (const p of places) {
      if (p.subcategory) {
        if (!grouped[p.subcategory]) grouped[p.subcategory] = []
        grouped[p.subcategory].push(p)
      } else {
        noSub.push(p)
      }
    }
  }
  const showGrouped = !searchParams.sub && Object.keys(grouped).length > 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* Back */}
      <Link href="/categories" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-500 mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Semua Kategori
      </Link>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-6 h-40 md:h-52">
        <img src={coverImg} alt={category.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${category.color || '#E8520A'}ee, ${category.color || '#E8520A'}99)` }} />
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
          <div className="text-4xl mb-2">{category.icon}</div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">{category.name}</h1>
          <p className="text-white/80 text-sm mt-0.5 line-clamp-1">{category.description}</p>
        </div>
      </div>

      {/* Filter bar — compact */}
      <div className="bg-white rounded-2xl border border-gray-200 p-3 mb-5 flex flex-wrap items-center gap-2">

        {/* Subcategory pills — only shown if exist */}
        {subcategories.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-gray-400 font-medium">Filter:</span>
            <Link
              href={buildCatUrl(params.slug, { kecamatan: searchParams.kecamatan })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                !searchParams.sub
                  ? 'bg-brand-500 text-white border-brand-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'
              }`}
            >
              Semua
            </Link>
            {subcategories.map(sub => (
              <Link
                key={sub}
                href={buildCatUrl(params.slug, { sub, kecamatan: searchParams.kecamatan })}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${
                  searchParams.sub === sub
                    ? 'bg-brand-500 text-white border-brand-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'
                }`}
              >
                {sub}
              </Link>
            ))}
          </div>
        )}

        {/* Divider */}
        {subcategories.length > 0 && <div className="w-px h-6 bg-gray-200 mx-1" />}

        {/* Kecamatan dropdown */}
        <KecamatanFilter
          current={searchParams.kecamatan || ''}
          searchParams={{ category: params.slug, sub: searchParams.sub }}
        />

        {/* Sort */}
        <div className="flex gap-1 ml-auto bg-gray-50 p-1 rounded-xl border border-gray-200">
          {[
            { label: '⭐ Rating', value: 'rating' },
            { label: '🔥 Populer', value: 'popular' },
            { label: '🆕 Terbaru', value: 'newest' },
          ].map(opt => (
            <Link
              key={opt.value}
              href={buildCatUrl(params.slug, { ...searchParams, sort: opt.value })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                (searchParams.sort || 'rating') === opt.value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {opt.label}
            </Link>
          ))}
        </div>

        {/* Reset */}
        {hasFilters && (
          <Link href={`/categories/${params.slug}`}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs hover:bg-red-100 transition-colors border border-red-200">
            <X className="w-3 h-3" /> Reset
          </Link>
        )}
      </div>

      {/* Active filter badge */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {searchParams.sub && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-sm border border-brand-200">
              <span>{searchParams.sub}</span>
              <Link href={buildCatUrl(params.slug, { kecamatan: searchParams.kecamatan })}><X className="w-3 h-3" /></Link>
            </div>
          )}
          {searchParams.kecamatan && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200">
              <span>📍 Kec. {searchParams.kecamatan}</span>
              <Link href={buildCatUrl(params.slug, { sub: searchParams.sub })}><X className="w-3 h-3" /></Link>
            </div>
          )}
          <span className="text-sm text-gray-500 self-center">{places.length} tempat</span>
        </div>
      )}

      {/* Results */}
      {places.length > 0 ? (
        <div>
          {showGrouped ? (
            // Grouped by subcategory
            <div className="space-y-10">
              {Object.entries(grouped).map(([sub, subPlaces]) => (
                <div key={sub}>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="font-display text-xl font-bold text-gray-900">{sub}</h2>
                    <span className="badge bg-gray-100 text-gray-600 text-sm">{subPlaces.length}</span>
                    <div className="flex-1 h-px bg-gray-200" />
                    <Link
                      href={buildCatUrl(params.slug, { sub })}
                      className="text-xs text-brand-500 hover:underline shrink-0"
                    >
                      Lihat semua →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {subPlaces.slice(0, 4).map(place => <PlaceCard key={place.id} place={place} />)}
                  </div>
                  {subPlaces.length > 4 && (
                    <div className="mt-3 text-center">
                      <Link href={buildCatUrl(params.slug, { sub })}
                        className="text-sm text-brand-500 hover:underline">
                        +{subPlaces.length - 4} lainnya di {sub} →
                      </Link>
                    </div>
                  )}
                </div>
              ))}
              {noSub.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="font-display text-xl font-bold text-gray-900">Lainnya</h2>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {noSub.map(place => <PlaceCard key={place.id} place={place} />)}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Flat grid — when filter active or no subcategories
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {places.map(place => <PlaceCard key={place.id} place={place} />)}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 card">
          <div className="text-5xl mb-4">{category.icon}</div>
          <h3 className="font-semibold text-gray-700 mb-2">
            {hasFilters ? 'Tidak ada tempat dengan filter ini' : 'Belum ada tempat di kategori ini'}
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            {hasFilters ? 'Coba ubah atau reset filter' : 'Jadilah yang pertama menambahkan!'}
          </p>
          {hasFilters ? (
            <Link href={`/categories/${params.slug}`} className="btn-brand inline-block">Reset Filter</Link>
          ) : (
            <Link href="/daftar-bisnis" className="btn-brand inline-block">Tambah Tempat</Link>
          )}
        </div>
      )}
    </div>
  )
}
