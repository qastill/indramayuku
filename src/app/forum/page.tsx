import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { MessageSquare, Eye, ThumbsUp, Pin, PlusCircle, TrendingUp, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'

const FORUM_CATEGORIES = [
  { name: 'Semua', slug: '', icon: '📋' },
  { name: 'Tanya Jawab', slug: 'Tanya Jawab', icon: '❓' },
  { name: 'Jual Beli', slug: 'Jual Beli', icon: '🛍️' },
  { name: 'Lowongan Kerja', slug: 'Lowongan Kerja', icon: '💼' },
  { name: 'Keluhan Warga', slug: 'Keluhan Warga', icon: '📢' },
  { name: 'Info Penting', slug: 'Info Penting', icon: '🚨' },
  { name: 'Review', slug: 'Review', icon: '⭐' },
  { name: 'Butuh Bantuan', slug: 'Butuh Bantuan', icon: '🆘' },
  { name: 'Kehilangan', slug: 'Kehilangan', icon: '🔍' },
  { name: 'Umum', slug: 'Umum', icon: '💬' },
]

const CAT_COLORS: Record<string, string> = {
  'Tanya Jawab': 'bg-blue-100 text-blue-700',
  'Jual Beli': 'bg-green-100 text-green-700',
  'Lowongan Kerja': 'bg-purple-100 text-purple-700',
  'Keluhan Warga': 'bg-red-100 text-red-700',
  'Info Penting': 'bg-orange-100 text-orange-700',
  'Review': 'bg-yellow-100 text-yellow-700',
  'Butuh Bantuan': 'bg-pink-100 text-pink-700',
  'Kehilangan': 'bg-indigo-100 text-indigo-700',
  'Umum': 'bg-gray-100 text-gray-600',
}

async function getForumPosts(category?: string) {
  let query = supabase
    .from('forum_posts')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(30)
  if (category) query = query.eq('category', category)
  const { data } = await query
  return data || []
}

async function getStats() {
  const { count: totalPosts } = await supabase.from('forum_posts').select('*', { count: 'exact', head: true })
  const { count: totalMembers } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
  return { totalPosts: totalPosts || 0, totalMembers: totalMembers || 0 }
}

interface Props { searchParams: { cat?: string } }

export default async function ForumPage({ searchParams }: Props) {
  const cat = searchParams.cat || ''
  const [posts, stats] = await Promise.all([getForumPosts(cat), getStats()])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero Header */}
      <div className="relative rounded-2xl overflow-hidden mb-6 bg-gradient-to-r from-brand-600 to-brand-800 p-8 text-white">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")"}} />
        <div className="relative flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold mb-1">🗣️ Forum Warga Indramayu</h1>
            <p className="text-orange-100">Diskusi, jual beli, info loker, keluhan, dan apapun tentang Indramayu!</p>
            <div className="flex gap-4 mt-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">📝 {stats.totalPosts} Postingan</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">👥 {stats.totalMembers} Anggota</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">📍 31 Kecamatan</span>
            </div>
          </div>
          <Link href="/forum/buat" className="bg-white text-brand-600 px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-50 transition-all shrink-0 flex items-center gap-2">
            <PlusCircle className="w-4 h-4" /> Buat Post
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-52 shrink-0">
          <div className="card p-3 sticky top-20">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 px-2">📂 Kategori</p>
            <div className="space-y-0.5">
              {FORUM_CATEGORIES.map(c => (
                <Link key={c.slug} href={`/forum${c.slug ? `?cat=${encodeURIComponent(c.slug)}` : ''}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${cat === c.slug ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <span>{c.icon}</span><span>{c.name}</span>
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 px-2">🔥 Populer</p>
              <div className="space-y-1">
                {['Tukang Listrik', 'Jual Mangga', 'Loker 2025', 'Banjir Karangsong', 'Bengkel Motor'].map(tag => (
                  <div key={tag} className="px-3 py-1.5 text-xs text-gray-500 hover:text-brand-500 cursor-pointer">#{tag.toLowerCase().replace(' ','-')}</div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Posts */}
        <div className="flex-1">
          {/* Sort */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-medium shrink-0">
              <Clock className="w-4 h-4" /> Terbaru
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 shrink-0">
              <TrendingUp className="w-4 h-4" /> Trending
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 shrink-0">
              <Eye className="w-4 h-4" /> Terbanyak Dilihat
            </button>
          </div>

          {posts.length > 0 ? (
            <div className="space-y-3">
              {posts.map(post => {
                const catIcon = FORUM_CATEGORIES.find(c => c.slug === post.category)?.icon || '💬'
                const catColor = CAT_COLORS[post.category] || 'bg-gray-100 text-gray-600'
                let timeAgo = ''
                try { timeAgo = formatDistanceToNow(new Date(post.created_at), { locale: id, addSuffix: true }) } catch {}
                return (
                  <Link key={post.id} href={`/forum/${post.id}`} className="card p-4 block hover:shadow-md transition-all group">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {post.category === 'Info Penting' ? '🚨' : post.category === 'Jual Beli' ? '🛍️' : '💬'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          {post.is_pinned && <span className="badge bg-orange-100 text-orange-700 text-xs"><Pin className="w-3 h-3" /> Pinned</span>}
                          <span className={`badge text-xs ${catColor}`}>{catIcon} {post.category}</span>
                          {post.kecamatan && <span className="badge bg-gray-100 text-gray-500 text-xs">📍 {post.kecamatan}</span>}
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-1">{post.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.content}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                          <span>{timeAgo}</span>
                          <div className="flex items-center gap-3 ml-auto">
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views}</span>
                            <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{post.likes}</span>
                            <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{post.comment_count}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-700">Belum ada postingan</h3>
              <p className="text-gray-400 text-sm mt-1 mb-4">Jadilah yang pertama berdiskusi!</p>
              <Link href="/forum/buat" className="btn-brand inline-flex items-center gap-2"><PlusCircle className="w-4 h-4" /> Buat Postingan</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
