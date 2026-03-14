import { supabase } from '@/lib/supabase'
import { PlaceCard } from '@/components/places/PlaceCard'
import { Search } from 'lucide-react'
import Link from 'next/link'

interface Props { searchParams: { q?: string } }

async function searchPlaces(query: string) {
  if (!query.trim()) return []
  const { data } = await supabase
    .from('places')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .or(`name.ilike.%${query}%,description.ilike.%${query}%,address.ilike.%${query}%,kecamatan.ilike.%${query}%`)
    .order('rating', { ascending: false })
    .limit(24)
  return data || []
}

export default async function SearchPage({ searchParams }: Props) {
  const q = searchParams.q || ''
  const results = await searchPlaces(q)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <form action="/search" className="flex gap-2 max-w-xl mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Cari tempat di Indramayu..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <button type="submit" className="btn-brand">Cari</button>
        </form>

        {q && (
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">
              {results.length > 0 ? (
                <>Hasil pencarian: "<span className="text-brand-500">{q}</span>"</>
              ) : (
                <>Tidak ada hasil untuk "<span className="text-brand-500">{q}</span>"</>
              )}
            </h1>
            {results.length > 0 && (
              <p className="text-gray-500 text-sm mt-1">{results.length} tempat ditemukan</p>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {results.map(place => <PlaceCard key={place.id} place={place} />)}
        </div>
      ) : q ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">😕</div>
          <h3 className="font-semibold text-gray-700 mb-2">Tidak ada hasil ditemukan</h3>
          <p className="text-gray-400 text-sm mb-6">Coba kata kunci lain atau jelajahi berdasarkan kategori</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Kuliner', 'Pantai', 'Hotel', 'Batik', 'Mangga'].map(keyword => (
              <Link key={keyword} href={`/search?q=${keyword}`}
                className="px-4 py-2 bg-brand-50 text-brand-600 rounded-xl text-sm font-medium hover:bg-brand-100 transition-colors">
                {keyword}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-700 mb-2">Cari tempat di Indramayu</h3>
          <p className="text-gray-400 text-sm">Coba "nasi lengko", "pantai karangsong", "batik paoman"...</p>
        </div>
      )}
    </div>
  )
}
