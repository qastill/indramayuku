import Link from 'next/link'
import { Search, Star, MapPin, TrendingUp, ChevronRight, Utensils, Waves, Hotel, ShoppingBag, Heart, Shield } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { PlaceCard } from '@/components/places/PlaceCard'
import { Place, Category } from '@/types'

async function getFeaturedPlaces(): Promise<Place[]> {
  const { data } = await supabase
    .from('places')
    .select('*, category:categories(*)')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('rating', { ascending: false })
    .limit(6)
  return data || []
}

async function getTopRated(): Promise<Place[]> {
  const { data } = await supabase
    .from('places')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .order('rating', { ascending: false })
    .order('review_count', { ascending: false })
    .limit(8)
  return data || []
}

async function getCategories(): Promise<Category[]> {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('place_count', { ascending: false })
    .limit(8)
  return data || []
}

const HERO_CATEGORIES = [
  { icon: '🍽️', label: 'Kuliner', href: '/categories/kuliner', color: 'bg-orange-50 text-orange-600 border-orange-100' },
  { icon: '🌊', label: 'Wisata', href: '/categories/wisata', color: 'bg-sky-50 text-sky-600 border-sky-100' },
  { icon: '🏨', label: 'Hotel', href: '/categories/hotel', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  { icon: '🛍️', label: 'Belanja', href: '/categories/belanja', color: 'bg-pink-50 text-pink-600 border-pink-100' },
  { icon: '🏥', label: 'Kesehatan', href: '/categories/kesehatan', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { icon: '🎭', label: 'Hiburan', href: '/categories/hiburan', color: 'bg-red-50 text-red-600 border-red-100' },
]

export default async function HomePage() {
  const [featured, topRated, categories] = await Promise.all([
    getFeaturedPlaces(),
    getTopRated(),
    getCategories()
  ])

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-500 to-dermayu-batik" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Mangga decoration */}
        <div className="absolute top-8 right-8 text-6xl opacity-20 animate-float">🥭</div>
        <div className="absolute bottom-8 left-8 text-4xl opacity-15 animate-float" style={{ animationDelay: '1s' }}>🐟</div>
        <div className="absolute top-16 left-1/4 text-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🌊</div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/30">
              <MapPin className="w-4 h-4" />
              <span>Kota Mangga, Jawa Barat</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 leading-tight text-shadow">
              Temukan Semua<br />
              <span className="italic text-orange-200">Keindahan</span>{' '}
              Indramayu
            </h1>
            <p className="text-lg text-orange-100 mb-8 max-w-lg">
              Review jujur dari warga lokal untuk kuliner, wisata, hotel, dan bisnis terbaik di Indramayu 🥭
            </p>

            {/* Search Bar */}
            <form action="/search" className="flex gap-2 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="q"
                  placeholder="Cari nasi lengko, pantai karangsong..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30 placeholder-gray-400 text-sm sm:text-base"
                />
              </div>
              <button type="submit" className="bg-white text-brand-600 px-6 py-4 rounded-2xl font-bold hover:bg-orange-50 transition-all shadow-lg shrink-0 hover:shadow-xl active:scale-95">
                Cari
              </button>
            </form>

            {/* Quick categories */}
            <div className="flex flex-wrap gap-2">
              {HERO_CATEGORIES.map(cat => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full text-sm font-medium hover:bg-white/30 transition-all"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex justify-center sm:justify-start gap-8 text-white/90 text-sm">
              <div className="flex items-center gap-2"><span className="font-bold text-lg text-white">500+</span> Tempat</div>
              <div className="flex items-center gap-2"><span className="font-bold text-lg text-white">2K+</span> Ulasan</div>
              <div className="flex items-center gap-2"><span className="font-bold text-lg text-white">31</span> Kecamatan</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">Jelajahi Kategori</h2>
            <Link href="/categories" className="text-brand-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {categories.map(cat => (
              <Link key={cat.id} href={`/categories/${cat.slug}`}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl hover:shadow-md transition-all group border border-gray-100 hover:border-brand-200">
                <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">{cat.name}</span>
                <span className="text-xs text-gray-400">{cat.place_count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="section-title">⭐ Tempat Unggulan</h2>
                <p className="text-gray-500 text-sm mt-1">Pilihan terbaik editor Indramayuku</p>
              </div>
              <Link href="/places?featured=true" className="text-brand-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Lihat Semua <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map(place => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* KHAS INDRAMAYU BANNER */}
      <section className="py-12 bg-gradient-to-r from-dermayu-batik to-brand-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-3">
                🥭 Khas Indramayu
              </h2>
              <p className="text-orange-200 mb-6 leading-relaxed">
                Indramayu terkenal dengan Mangga Gedong Gincu yang manis, Nasi Lengko, Pindang Serani, dan budaya Tarling yang kaya. Jelajahi semua keunikan Kota Mangga!
              </p>
              <div className="flex flex-wrap gap-2">
                {['🥭 Mangga Gedong Gincu', '🍚 Nasi Lengko', '🐟 Pindang Serani', '🎵 Tarling', '🌊 Pantai Karangsong', '🦀 Kepiting Soka'].map(item => (
                  <span key={item} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm border border-white/30">{item}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '🎨', title: 'Batik Paoman', desc: 'Batik khas Indramayu dengan motif floral yang unik' },
                { icon: '🎵', title: 'Tarling', desc: 'Musik tradisional gitar + suling khas Cirebon-Indramayu' },
                { icon: '🏖️', title: '40+ Pantai', desc: 'Garis pantai terpanjang di Jawa Barat' },
                { icon: '🥭', title: 'Kota Mangga', desc: 'Penghasil mangga terbesar di Indonesia' },
              ].map(item => (
                <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-white font-semibold text-sm">{item.title}</div>
                  <div className="text-orange-200 text-xs mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOP RATED */}
      {topRated.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="section-title">🏆 Rating Tertinggi</h2>
                <p className="text-gray-500 text-sm mt-1">Berdasarkan ulasan warga Indramayu</p>
              </div>
              <Link href="/places?sort=rating" className="text-brand-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Lihat Semua <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topRated.map((place, i) => (
                <div key={place.id} className="flex items-center gap-3">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shrink-0 ${
                    i === 0 ? 'bg-yellow-400 text-white' :
                    i === 1 ? 'bg-gray-300 text-gray-700' :
                    i === 2 ? 'bg-orange-400 text-white' :
                    'bg-gray-100 text-gray-500'
                  }`}>{i + 1}</span>
                  <PlaceCard place={place} variant="horizontal" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY INDRAMAYUKU */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="section-title mb-2">Mengapa Indramayuku?</h2>
            <p className="text-gray-500">Platform terpercaya untuk menemukan tempat terbaik di Indramayu</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Heart className="w-6 h-6 text-red-500" />,
                title: 'Review Jujur dari Warga Lokal',
                desc: 'Semua review ditulis oleh warga dan pengunjung Indramayu yang benar-benar merasakan pengalaman di tempat tersebut.'
              },
              {
                icon: <Shield className="w-6 h-6 text-emerald-500" />,
                title: 'Informasi Terverifikasi',
                desc: 'Tempat-tempat unggulan telah diverifikasi oleh tim Indramayuku untuk memastikan informasi akurat dan terkini.'
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-brand-500" />,
                title: 'Update Terkini',
                desc: 'Informasi jam buka, harga, dan kontak selalu diperbarui. Tidak perlu khawatir informasi sudah usang.'
              },
            ].map(item => (
              <div key={item.title} className="card p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-brand-500">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Punya Bisnis di Indramayu?
          </h2>
          <p className="text-orange-100 mb-6">
            Daftarkan bisnis atau tempat usaha kamu secara gratis dan jangkau lebih banyak pelanggan!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/daftar-bisnis" className="bg-white text-brand-600 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all shadow-md">
              Daftarkan Bisnis
            </Link>
            <Link href="/auth/register" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all">
              Buat Akun Gratis
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
