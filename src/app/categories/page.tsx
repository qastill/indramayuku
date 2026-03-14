import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { ChevronRight } from 'lucide-react'
import { CATEGORY_IMAGES } from '@/types'

async function getCategories() {
  const { data } = await supabase.from('categories').select('*').order('place_count', { ascending: false })
  return data || []
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 text-center">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Semua Kategori</h1>
        <p className="text-gray-500">Temukan tempat berdasarkan kategori yang kamu cari di Indramayu</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map(cat => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="group card overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* Category image */}
            <div className="relative h-32 overflow-hidden bg-gray-100">
              <img
                src={CATEGORY_IMAGES[cat.slug] || CATEGORY_IMAGES.default}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 text-3xl">{cat.icon}</div>
              <div className="absolute bottom-3 right-3">
                <span className="badge bg-white/90 text-gray-700 text-xs">{cat.place_count} tempat</span>
              </div>
            </div>
            {/* Content */}
            <div className="p-4 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">{cat.name}</h2>
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{cat.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-400 transition-colors shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
