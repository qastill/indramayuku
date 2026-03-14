import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { ChevronRight } from 'lucide-react'

async function getCategories() {
  const { data } = await supabase.from('categories').select('*').order('place_count', { ascending: false })
  return data || []
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 text-center">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Kategori</h1>
        <p className="text-gray-500">Temukan tempat berdasarkan kategori yang kamu cari</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map(cat => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="group card p-6 flex items-center gap-4 hover:border-brand-200 transition-all"
            style={{ borderLeftColor: cat.color || '#E8520A', borderLeftWidth: '4px' }}
          >
            <div className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">{cat.name}</h2>
              <p className="text-sm text-gray-400 line-clamp-1 mt-0.5">{cat.description}</p>
              <span className="text-xs text-brand-500 font-medium mt-1 block">{cat.place_count} tempat</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-400 transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  )
}
