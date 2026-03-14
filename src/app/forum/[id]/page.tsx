import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Eye, ThumbsUp, MessageSquare, Pin, Calendar, MapPin } from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'
import { id } from 'date-fns/locale'
import { ForumCommentSection } from '@/components/forum/ForumCommentSection'

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

const CAT_ICONS: Record<string, string> = {
  'Tanya Jawab': '❓','Jual Beli': '🛍️','Lowongan Kerja': '💼',
  'Keluhan Warga': '📢','Info Penting': '🚨','Review': '⭐',
  'Butuh Bantuan': '🆘','Kehilangan': '🔍','Umum': '💬',
}

async function getPost(id: string) {
  const { data } = await supabase
    .from('forum_posts')
    .select('*, profile:profiles(username, avatar_url, review_count)')
    .eq('id', id)
    .single()
  return data
}

async function getComments(postId: string) {
  const { data } = await supabase
    .from('forum_comments')
    .select('*, profile:profiles(username, avatar_url)')
    .eq('post_id', postId)
    .order('created_at', { ascending: true })
  return data || []
}

interface Props { params: { id: string } }

export default async function ForumPostPage({ params }: Props) {
  const post = await getPost(params.id)
  if (!post) notFound()

  const comments = await getComments(params.id)
  const catColor = CAT_COLORS[post.category] || 'bg-gray-100 text-gray-600'
  const catIcon = CAT_ICONS[post.category] || '💬'

  let timeAgo = ''
  let dateStr = ''
  try {
    timeAgo = formatDistanceToNow(new Date(post.created_at), { locale: id, addSuffix: true })
    dateStr = format(new Date(post.created_at), 'dd MMMM yyyy, HH:mm', { locale: id })
  } catch {}

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <Link href="/forum" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-500 mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Kembali ke Forum
      </Link>

      {/* Post */}
      <div className="card p-6 mb-6">
        {/* Meta */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.is_pinned && (
            <span className="badge bg-orange-100 text-orange-700 text-xs"><Pin className="w-3 h-3" /> Pinned</span>
          )}
          <span className={`badge text-sm ${catColor}`}>{catIcon} {post.category}</span>
          {post.kecamatan && (
            <span className="badge bg-gray-100 text-gray-500 text-xs"><MapPin className="w-3 h-3" /> {post.kecamatan}</span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>

        {/* Author */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center text-white font-bold">
            {post.profile?.username?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <div className="font-semibold text-gray-900">@{post.profile?.username || 'Anonim'}</div>
            <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{dateStr}</span>
              <span>{timeAgo}</span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{post.views}</span>
            <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" />{post.likes}</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">{post.content}</p>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-100">
            {post.tags.map((tag: string) => (
              <span key={tag} className="badge bg-gray-100 text-gray-600 text-xs">#{tag}</span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-600 rounded-xl text-sm font-medium hover:bg-brand-100 transition-colors">
            <ThumbsUp className="w-4 h-4" /> Suka ({post.likes})
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors">
            <MessageSquare className="w-4 h-4" /> Balas ({comments.length})
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors ml-auto">
            ⚑ Laporkan
          </button>
        </div>
      </div>

      {/* Comments */}
      <ForumCommentSection postId={params.id} initialComments={comments} />
    </div>
  )
}
