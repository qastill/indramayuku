'use client'
import { ThumbsUp, Flag, Calendar } from 'lucide-react'
import { StarRating } from '@/components/ui/StarRating'
import { format, formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'

interface ReviewCardProps {
  review: any
  showPlace?: boolean
}

export function ReviewCard({ review, showPlace = false }: ReviewCardProps) {
  const profile = review.profile
  const initial = profile?.username?.[0]?.toUpperCase() || '?'
  
  const timeAgo = formatDistanceToNow(new Date(review.created_at), { locale: id, addSuffix: true })

  return (
    <div className="card p-5">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold shrink-0">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt={profile.username} className="w-full h-full rounded-full object-cover" />
          ) : (
            initial
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 text-sm">{profile?.username || 'Anonim'}</span>
            {review.is_verified_visit && (
              <span className="badge bg-emerald-50 text-emerald-700 text-xs py-0 px-2">✓ Kunjungan Terverifikasi</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <StarRating rating={review.rating} size="sm" />
            <span className="text-xs text-gray-400">{timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Review meta */}
      <div className="flex flex-wrap gap-2 mb-3">
        {review.visit_type && (
          <span className="badge bg-gray-100 text-gray-600 text-xs">👥 {review.visit_type}</span>
        )}
        {review.visit_date && (
          <span className="badge bg-gray-100 text-gray-600 text-xs">
            <Calendar className="w-3 h-3" />
            {format(new Date(review.visit_date), 'MMMM yyyy', { locale: id })}
          </span>
        )}
      </div>

      {/* Content */}
      {review.title && (
        <h4 className="font-semibold text-gray-800 mb-1">{review.title}</h4>
      )}
      <p className="text-sm text-gray-600 leading-relaxed">{review.content}</p>

      {/* Images */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {review.images.map((img: string, i: number) => (
            <img key={i} src={img} alt="" className="w-20 h-20 object-cover rounded-xl shrink-0 cursor-pointer hover:opacity-90" />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
        <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 transition-colors">
          <ThumbsUp className="w-4 h-4" />
          <span>Membantu ({review.helpful_count})</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 transition-colors ml-auto">
          <Flag className="w-3.5 h-3.5" />
          <span>Laporkan</span>
        </button>
      </div>
    </div>
  )
}
