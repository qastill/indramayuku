'use client'
import { useState } from 'react'
import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onChange?: (rating: number) => void
  showNumber?: boolean
  reviewCount?: number
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  interactive = false,
  onChange,
  showNumber = false,
  reviewCount
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0)
  
  const sizes = { sm: 12, md: 16, lg: 22 }
  const px = sizes[size]

  const displayRating = interactive ? (hovered || rating) : rating

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, i) => {
          const filled = i < Math.floor(displayRating)
          const partial = !filled && i < displayRating && i === Math.floor(displayRating)
          
          return (
            <span
              key={i}
              onClick={() => interactive && onChange?.(i + 1)}
              onMouseEnter={() => interactive && setHovered(i + 1)}
              onMouseLeave={() => interactive && setHovered(0)}
              className={interactive ? 'cursor-pointer transition-transform hover:scale-110' : ''}
            >
              <Star
                width={px}
                height={px}
                className={filled || partial ? 'star-filled fill-current' : 'star-empty'}
                fill={filled ? '#F5A623' : partial ? 'url(#half)' : 'none'}
                stroke={filled || partial ? '#F5A623' : '#D1D5DB'}
              />
            </span>
          )
        })}
      </div>
      
      {(showNumber || reviewCount !== undefined) && (
        <div className="flex items-center gap-1 text-gray-600">
          {showNumber && (
            <span className={`font-semibold ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm'}`}>
              {rating.toFixed(1)}
            </span>
          )}
          {reviewCount !== undefined && (
            <span className={`text-gray-400 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
              ({reviewCount.toLocaleString('id-ID')} ulasan)
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export function RatingBreakdown({ ratings }: { ratings: Record<number, number> }) {
  const total = Object.values(ratings).reduce((a, b) => a + b, 0)
  
  return (
    <div className="space-y-1">
      {[5, 4, 3, 2, 1].map(star => {
        const count = ratings[star] || 0
        const pct = total > 0 ? (count / total) * 100 : 0
        return (
          <div key={star} className="flex items-center gap-2 text-sm">
            <span className="w-3 text-gray-500 text-right">{star}</span>
            <Star className="w-3 h-3 star-filled fill-current" fill="#F5A623" stroke="#F5A623" />
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-400 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-8 text-right text-gray-500">{count}</span>
          </div>
        )
      })}
    </div>
  )
}
