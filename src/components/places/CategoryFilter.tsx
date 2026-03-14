'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, Check } from 'lucide-react'

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
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

  const currentCategory = categories.find(c => c.slug === current)

  useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                          setIsOpen(false)
                }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (slug: string) => {
        const p = new URLSearchParams()
        Object.entries(searchParams).forEach(([k, v]) => {
                if (v && k !== 'category' && k !== 'page') p.set(k, v)
        })
        if (slug) p.set('category', slug)
        const queryString = p.toString()
        router.push(queryString ? `/places?${queryString}` : '/places')
        setIsOpen(false)
  }

  const categoriesWithPlaces = categories.filter(c => c.place_count > 0)

  return (
        <div className="relative" ref={dropdownRef}>
                <button
                          type="button"
                          onClick={() => setIsOpen(!isOpen)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium bg-white cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                                      current ? 'border-brand-400 text-brand-700 bg-brand-50' : 'border-gray-200 text-gray-600 hover:border-brand-300'
                          }`}
                        >
                        <span>{currentCategory?.icon || '📂'}</span>span>
                        <span>{currentCategory?.name || 'Semua Kategori'}</span>span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>button>
        
          {isOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 max-h-96 overflow-auto bg-white rounded-xl border border-gray-200 shadow-xl z-50">
                            <button
                                          type="button"
                                          onClick={() => handleSelect('')}
                                          className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                                                          !current ? 'bg-brand-50 text-brand-700' : 'text-gray-700'
                                          }`}
                                        >
                                        <span className="text-lg">📂</span>span>
                                        <span className="flex-1 font-medium">Semua Kategori</span>span>
                              {!current && <Check className="w-4 h-4 text-brand-500" />}
                            </button>button>
                            <div className="h-px bg-gray-100" />
                            <div className="py-1">
                              {categoriesWithPlaces.map(cat => (
                                  <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => handleSelect(cat.slug)}
                                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors ${
                                                                        current === cat.slug ? 'bg-brand-50 text-brand-700' : 'text-gray-700'
                                                    }`}
                                                  >
                                                  <span className="text-lg">{cat.icon}</span>span>
                                                  <span className="flex-1 font-medium text-sm">{cat.name}</span>span>
                                                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{cat.place_count}</span>span>
                                    {current === cat.slug && <Check className="w-4 h-4 text-brand-500" />}
                                  </button>button>
                                ))}
                            </div>div>
                    {categoriesWithPlaces.length === 0 && (
                                <div className="px-4 py-8 text-center text-gray-500 text-sm">Tidak ada kategori tersedia</div>div>
                            )}
                  </div>div>
              )}
        </div>div>
      )
}</button>
