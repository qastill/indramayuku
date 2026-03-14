import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { PlaceCard } from '@/components/places/PlaceCard'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <Link href="/categories" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-500 mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Semua Kategori
      </Link>

      {/* Header */}
      <div
        className="rounded-2xl p-8 mb-8 text-white"
        style={{ background: `linear-gradient(135deg, ${category.color || '#E8520A'}, ${category.color || '#E8520A'}cc)` }}
      >
        <div className="text-5xl mb-3">{category.icon}</div>
        <h1 className="font-display text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-white/80 mb-2">{category.description}</p>
        <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm">{places.length} tempat ditemukan</span>
      </div>

      {/* Places Grid */}
      {places.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {places.map(place => <PlaceCard key={place.id} place={place} />)}
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
