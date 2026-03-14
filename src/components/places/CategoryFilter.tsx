'use client'
import { useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  place_count: number
}

interface Props {
  categories: Category[]
  current: string
  searchParams: Record<string, string | undefined>
}

export function CategoryFilter({ categories, current, searchParams }: Props) {
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value
    const p = new URLSearchParams()
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v && k !== 'category' && k !== 'page') p.set(k, v)
    })
    if (slug) p.set('category', slug)
    router.push(`/places?${p.toString()}`)
  }

  return (
    <div className="relative">
      <select
        value={current}
        onChange={handleChange}
        className={`appearance-none pl-4 pr-9 py-2.5 rounded-xl border text-sm font-medium bg-white cursor-pointer transition-colors focus:outline-none focus:border-brand-500 ${
          current
            ? 'border-brand-400 text-brand-700 bg-brand-50'
            : 'border-gray-200 text-gray-600 hover:border-brand-300'
        }`}
      >
        <option value="">📂 Semua Kategori</option>
        {categories.filter(c => c.place_count > 0).map(cat => (
          <option key={cat.id} value={cat.slug}>
            {cat.icon} {cat.name} ({cat.place_count})
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  )
}
