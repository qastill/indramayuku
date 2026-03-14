'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { Loader2, MessageSquare, ThumbsUp } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
import Link from 'next/link'

interface Props {
  postId: string
  initialComments: any[]
}

export function ForumCommentSection({ postId, initialComments }: Props) {
  const [comments, setComments] = useState(initialComments)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim() || content.length < 5) return toast.error('Komentar minimal 5 karakter')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      toast.error('Kamu harus login dulu')
      return
    }
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('forum_comments')
        .insert({ post_id: postId, user_id: user.id, content: content.trim() })
        .select('*, profile:profiles(username, avatar_url)')
        .single()
      if (error) throw error
      setComments(prev => [...prev, data])
      setContent('')
      toast.success('Komentar berhasil dikirim!')
    } catch {
      toast.error('Gagal mengirim komentar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5" /> {comments.length} Komentar
      </h2>

      {/* Comment form */}
      <div className="card p-4 mb-6">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Tulis komentarmu di sini... Bantu jawab atau berikan pendapatmu!"
          rows={4}
          className="input-field resize-none mb-3"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">Harap bersikap sopan dan saling menghormati 🙏</p>
          <button onClick={handleSubmit} disabled={loading || content.length < 5}
            className="btn-brand py-2 px-5 text-sm flex items-center gap-2 disabled:opacity-50">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Mengirim...</> : '💬 Kirim Komentar'}
          </button>
        </div>
      </div>

      {/* Comments list */}
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment, i) => {
            let timeAgo = ''
            try { timeAgo = formatDistanceToNow(new Date(comment.created_at), { locale: id, addSuffix: true }) } catch {}
            return (
              <div key={comment.id} className="card p-4">
                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {comment.profile?.username?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-gray-900">@{comment.profile?.username || 'Anonim'}</span>
                      {comment.is_solution && <span className="badge bg-emerald-100 text-emerald-700 text-xs">✓ Solusi</span>}
                      <span className="text-xs text-gray-400 ml-auto">{timeAgo}</span>
                    </div>
                    <p className="text-gray-700 text-sm mt-1.5 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
                    <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-500 mt-2 transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" /> Suka ({comment.likes})
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card p-8 text-center">
          <MessageSquare className="w-10 h-10 text-gray-200 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">Belum ada komentar. Jadilah yang pertama!</p>
        </div>
      )}
    </div>
  )
}
