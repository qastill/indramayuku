import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { PlaceCard } from '@/components/places/PlaceCard'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { CATEGORY_IMAGES } from '@/types'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

async function getCategory(slug: string) {
  const { data } = await supabase.from('categories').select('*').eq('slug', slug).single()
  return data
}

async function getPlacesByCategory(categoryId: string) {
  const { data } = await supabase
    .from('places')
    .select('*, category:categories(*)')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('rating', { ascending: false })
  return data || []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = await getCategory(params.slug)
  if (!cat) return { title: 'Kategori tidak ditemukan' }
  return {
    title: `${cat.name} di Indramayu | Indramayuku`,
    description: cat.description || `Daftar ${cat.name} terbaik di Indramayu`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const category = await getCategory(params.slug)
  if (!category) notFound()

  const places = await getPlacesByCategory(category.id)

  // Group by subcategory
  const grouped: Record<string, typeof places> = {}
  const noSub: typeof places = []
  for (const p of places) {
    if (p.subcategory) {
      if (!grouped[p.subcategory]) grouped[p.subcategory] = []
      grouped[p.subcategory].push(p)
    } else {
      noSub.push(p)
    }
  }
  const hasSubcategories = Object.keys(grouped).length > 0

  const coverImg = CATEGORY_IMAGES[category.slug] || CATEGORY_IMAGES.default

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/categories" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-500 mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Semua Kategori
      </Link>

      {/* Hero Header */}
      <div className="relative rounded-2xl overflow-hidden mb-8 h-48 md:h-64">
        <img src={coverImg} alt={category.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${category.color || '#E8520A'}dd, ${category.color || '#E8520A'}88)` }} />
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="text-5xl mb-2">{category.icon}</div>
          <h1 className="font-display text-3xl font-bold text-white">{category.name}</h1>
          <p className="text-white/80 mt-1">{category.description}</p>
          <div className="flex gap-3 mt-3">
            <span className="badge bg-white/20 text-white border border-white/30">{places.length} tempat ditemukan</span>
            {hasSubcategories && (
              <span className="badge bg-white/20 text-white border border-white/30">{Object.keys(grouped).length} subkategori</span>
            )}
          </div>
        </div>
      </div>

      {/* Subcategory tabs if exist */}
      {hasSubcategories && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <a href="#semua" className="badge bg-brand-500 text-white whitespace-nowrap py-2 px-4 rounded-full text-sm font-medium">Semua</a>
          {Object.keys(grouped).map(sub => (
            <a key={sub} href={`#${sub.toLowerCase().replace(/\s+/g,'-')}`}
              className="badge bg-white border border-gray-200 text-gray-700 whitespace-nowrap py-2 px-4 rounded-full text-sm font-medium hover:border-brand-300 hover:text-brand-600 transition-colors">
              {sub} <span className="text-gray-400 ml-1">({grouped[sub].length})</span>
            </a>
          ))}
        </div>
      )}

      {/* Places grouped by subcategory */}
      {places.length > 0 ? (
        <div id="semua" className="space-y-10">
          {hasSubcategories ? (
            <>
              {Object.entries(grouped).map(([sub, subPlaces]) => (
                <div key={sub} id={sub.toLowerCase().replace(/\s+/g,'-')}>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="font-display text-xl font-bold text-gray-900">{sub}</h2>
                    <span className="badge bg-gray-100 text-gray-600">{subPlaces.length}</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {subPlaces.map(place => <PlaceCard key={place.id} place={place} />)}
                  </div>
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
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {places.map(place => <PlaceCard key={place.id} place={place} />)}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">{category.icon}</div>
          <h3 className="font-semibold text-gray-700 mb-2">Belum ada tempat di kategori ini</h3>
          <p className="text-gray-400 text-sm mb-4">Jadilah yang pertama menambahkan!</p>
          <Link href="/daftar-bisnis" className="btn-brand inline-block">Tambah Tempat</Link>
        </div>
      )}
    </div>
  )
}
