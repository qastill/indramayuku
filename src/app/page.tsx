import Link from 'next/link'
import { Search, ChevronRight, Heart, Shield, TrendingUp, MessageSquare, Map, Wrench } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { PlaceCard } from '@/components/places/PlaceCard'
import { Place, Category } from '@/types'

async function getFeaturedPlaces(): Promise<Place[]> {
  const { data } = await supabase.from('places').select('*, category:categories(*)')
    .eq('is_featured', true).eq('is_active', true).order('rating', { ascending: false }).limit(6)
  return data || []
}

async function getTopRated(): Promise<Place[]> {
  const { data } = await supabase.from('places').select('*, category:categories(*)')
    .eq('is_active', true).order('rating', { ascending: false }).order('review_count', { ascending: false }).limit(8)
  return data || []
}

async function getCategories(): Promise<Category[]> {
  const { data } = await supabase.from('categories').select('*').order('place_count', { ascending: false }).limit(12)
  return data || []
}

async function getLatestForumPosts() {
  const { data } = await supabase.from('forum_posts').select('*').order('created_at', { ascending: false }).limit(5)
  return data || []
}

async function getTotalStats() {
  const { count: places } = await supabase.from('places').select('*', { count: 'exact', head: true }).eq('is_active', true)
  const { count: reviews } = await supabase.from('reviews').select('*', { count: 'exact', head: true })
  const { count: posts } = await supabase.from('forum_posts').select('*', { count: 'exact', head: true })
  return { places: places || 0, reviews: reviews || 0, posts: posts || 0 }
}

const CAT_FORUM: Record<string, string> = {
  'Tanya Jawab': 'bg-blue-100 text-blue-700',
  'Jual Beli': 'bg-green-100 text-green-700',
  'Lowongan Kerja': 'bg-purple-100 text-purple-700',
  'Keluhan Warga': 'bg-red-100 text-red-700',
  'Info Penting': 'bg-orange-100 text-orange-700',
  'Review': 'bg-yellow-100 text-yellow-700',
  'Butuh Bantuan': 'bg-pink-100 text-pink-700',
}

export default async function HomePage() {
  const [featured, topRated, categories, forumPosts, stats] = await Promise.all([
    getFeaturedPlaces(), getTopRated(), getCategories(), getLatestForumPosts(), getTotalStats()
  ])

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-500 to-dermayu-batik" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="absolute top-8 right-8 text-6xl opacity-20 animate-float">🥭</div>
        <div className="absolute bottom-8 left-8 text-4xl opacity-15 animate-float" style={{ animationDelay: '1s' }}>🐟</div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/30">
              🥭 Platform Paling Lengkap Se-Indramayu
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 leading-tight">
              Temukan Apa Saja<br />
              <span className="italic text-orange-200">di Indramayu</span>
            </h1>
            <p className="text-lg text-orange-100 mb-8 max-w-lg">
              Kuliner, wisata, hotel, masjid, tukang, apotek, forum warga, peta, loker — semua ada di sini!
            </p>

            <form action="/search" className="flex gap-2 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" name="q" placeholder="Cari restoran, tukang listrik, masjid..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30 text-sm sm:text-base" />
              </div>
              <button type="submit" className="bg-white text-brand-600 px-6 py-4 rounded-2xl font-bold hover:bg-orange-50 transition-all shadow-lg shrink-0">Cari</button>
            </form>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex justify-center sm:justify-start gap-8 text-white/90 text-sm">
              <div><span className="font-bold text-lg text-white">{stats.places}+</span> Tempat</div>
              <div><span className="font-bold text-lg text-white">{stats.reviews}+</span> Ulasan</div>
              <div><span className="font-bold text-lg text-white">{stats.posts}+</span> Post Forum</div>
              <div><span className="font-bold text-lg text-white">31</span> Kecamatan</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">📂 Semua Kategori</h2>
            <Link href="/categories" className="text-brand-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
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
              {featured.map(place => <PlaceCard key={place.id} place={place} />)}
            </div>
          </div>
        </section>
      )}

      {/* KHAS INDRAMAYU */}
      <section className="py-12 bg-gradient-to-r from-dermayu-batik to-brand-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-3">🥭 Khas Indramayu</h2>
              <p className="text-orange-200 mb-6 leading-relaxed">
                Indramayu terkenal dengan Mangga Gedong Gincu, Nasi Lengko, Pindang Serani, Batik Paoman, dan budaya Tarling yang kaya. Jelajahi semua keunikan Kota Mangga!
              </p>
              <div className="flex flex-wrap gap-2">
                {['🥭 Mangga Gedong Gincu', '🍚 Nasi Lengko', '🐟 Pindang Serani', '🎵 Tarling', '🌊 Pantai Karangsong', '🦀 Kepiting Soka', '🎨 Batik Paoman', '🕌 Islamic Center'].map(item => (
                  <span key={item} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm border border-white/30">{item}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '🎨', title: 'Batik Paoman', desc: 'Motif batik khas Indramayu yang unik' },
                { icon: '🎵', title: 'Tarling', desc: 'Musik gitar + suling khas pesisir' },
                { icon: '🏖️', title: '40+ Pantai', desc: 'Garis pantai terpanjang Jabar' },
                { icon: '🕌', title: 'Wisata Religi', desc: 'Masjid bersejarah sejak 1414 M' },
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

      {/* FORUM WARGA */}
      {forumPosts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="section-title flex items-center gap-2"><MessageSquare className="w-7 h-7" /> Forum Warga Terbaru</h2>
                <p className="text-gray-500 text-sm mt-1">Diskusi, jual beli, dan keluhan warga Indramayu</p>
              </div>
              <Link href="/forum" className="text-brand-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Lihat Semua <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {forumPosts.map(post => (
                <Link key={post.id} href={`/forum/${post.id}`} className="card p-4 hover:shadow-md transition-all group">
                  <div className="flex gap-3">
                    <div className={`shrink-0 badge text-xs h-fit ${CAT_FORUM[post.category] || 'bg-gray-100 text-gray-600'}`}>{post.category}</div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-brand-600 transition-colors line-clamp-1">{post.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{post.content}</p>
                      <div className="flex gap-3 mt-2 text-xs text-gray-400">
                        {post.kecamatan && <span>📍 {post.kecamatan}</span>}
                        <span>👁 {post.views}</span>
                        <span>💬 {post.comment_count}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/forum/buat" className="btn-brand inline-flex items-center gap-2">
                ✍️ Buat Postingan di Forum
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* TOP RATED */}
      {topRated.length > 0 && (
        <section className="py-12">
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
                    i === 0 ? 'bg-yellow-400 text-white' : i === 1 ? 'bg-gray-300 text-gray-700' : i === 2 ? 'bg-orange-400 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>{i + 1}</span>
                  <PlaceCard place={place} variant="horizontal" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PETA & JASA banner */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/peta" className="card p-6 hover:shadow-lg transition-all group bg-gradient-to-br from-blue-50 to-sky-100 border-blue-200">
              <div className="text-4xl mb-3">🗺️</div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">Peta Interaktif Indramayu</h3>
              <p className="text-gray-600 text-sm">Lihat semua tempat di peta. Filter per kecamatan, cari lokasi terdekat, dan dapatkan petunjuk arah!</p>
              <span className="inline-block mt-3 text-brand-500 font-medium text-sm">Buka Peta →</span>
            </Link>
            <Link href="/jasa" className="card p-6 hover:shadow-lg transition-all group bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200">
              <div className="text-4xl mb-3">🔨</div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">Cari Jasa & Tukang Lokal</h3>
              <p className="text-gray-600 text-sm">Tukang listrik, bengkel las, servis AC, laundry, cleaning service — semua jasa lokal Indramayu ada di sini!</p>
              <span className="inline-block mt-3 text-brand-500 font-medium text-sm">Cari Jasa →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="section-title mb-2">Mengapa Indramayuku?</h2>
            <p className="text-gray-500">Platform terlengkap untuk warga dan pengunjung Indramayu</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Heart className="w-6 h-6 text-red-500" />, title: 'Review Jujur Warga Lokal', desc: 'Semua review dari warga asli Indramayu. Forum diskusi aktif untuk tanya jawab dan sharing informasi.' },
              { icon: <Shield className="w-6 h-6 text-emerald-500" />, title: 'Informasi Lengkap & Terverifikasi', desc: '120+ tempat, 26 kategori, peta interaktif, filter kecamatan — informasi terlengkap se-Indramayu.' },
              { icon: <TrendingUp className="w-6 h-6 text-brand-500" />, title: 'Selalu Update Terkini', desc: 'Data selalu diperbarui. Forum warga aktif setiap hari. Tidak perlu khawatir informasi usang.' },
            ].map(item => (
              <div key={item.title} className="card p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center">{item.icon}</div>
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
          <h2 className="font-display text-3xl font-bold text-white mb-3">Punya Bisnis atau Jasa di Indramayu?</h2>
          <p className="text-orange-100 mb-6">Daftarkan tempat usaha atau jasa kamu secara gratis dan jangkau lebih banyak pelanggan!</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/daftar-bisnis" className="bg-white text-brand-600 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all shadow-md">Daftarkan Tempat</Link>
            <Link href="/auth/register" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all">Buat Akun Gratis</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
