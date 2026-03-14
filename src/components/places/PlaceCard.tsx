'use client'
import Link from 'next/link'
import { MapPin, Phone, Bookmark, BadgeCheck, Star, Briefcase } from 'lucide-react'
import { Place, PRICE_RANGE_LABELS, CATEGORY_IMAGES } from '@/types'

interface PlaceCardProps {
  place: Place
  variant?: 'default' | 'horizontal' | 'featured'
}

function getRatingColor(rating: number) {
  if (rating >= 4.5) return 'bg-emerald-500'
  if (rating >= 4.0) return 'bg-green-500'
  if (rating >= 3.5) return 'bg-yellow-500'
  if (rating >= 3.0) return 'bg-orange-500'
  return 'bg-red-500'
}

function getPlaceImage(place: Place): string {
  if (place.cover_image) return place.cover_image
  if (place.images && place.images.length > 0) return place.images[0]
  const slug = place.category?.slug || 'default'
  return CATEGORY_IMAGES[slug] || CATEGORY_IMAGES.default
}

export function PlaceCard({ place, variant = 'default' }: PlaceCardProps) {
  const imgSrc = getPlaceImage(place)
  const priceLabel = place.price_range ? PRICE_RANGE_LABELS[place.price_range] : null
  const isLoker = place.category?.slug === 'loker'

  if (variant === 'horizontal') {
    return (
      <Link href={`/places/${place.slug}`} className="card flex gap-4 p-3 group overflow-hidden">
        <div className="w-28 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100">
          <img src={imgSrc} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="flex-1 min-w-0 py-1">
          <div className="flex items-start gap-2">
            <h3 className="font-semibold text-gray-900 truncate flex-1 group-hover:text-brand-600 transition-colors text-sm">{place.name}</h3>
            {place.is_verified && <BadgeCheck className="w-4 h-4 text-brand-500 shrink-0" />}
          </div>
          <div className="flex items-center gap-2 mt-1">
            {isLoker ? (
              <span className="badge bg-blue-100 text-blue-700 text-xs py-0.5 px-2">💼 Loker</span>
            ) : (
              <>
                <span className={`badge text-white text-xs ${getRatingColor(place.rating)} py-0.5 px-2`}>★ {place.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-400">({place.review_count})</span>
              </>
            )}
            {priceLabel && <span className="text-xs text-green-600 font-medium">{priceLabel}</span>}
          </div>
          {place.subcategory && (
            <span className="text-xs text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full mt-1 inline-block">{place.subcategory}</span>
          )}
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="text-xs text-gray-500 truncate">{place.kecamatan || place.kota}</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/places/${place.slug}`} className="place-card card group overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img src={imgSrc} alt={place.name} className="place-image w-full h-full object-cover transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {place.is_featured && <span className="badge bg-brand-500 text-white text-xs py-0.5">⭐ Unggulan</span>}
          {place.is_verified && <span className="badge bg-white text-brand-600 text-xs py-0.5"><BadgeCheck className="w-3 h-3" /> Verified</span>}
          {place.subcategory && <span className="badge bg-black/50 text-white text-xs py-0.5 backdrop-blur-sm">{place.subcategory}</span>}
        </div>

        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
          <Bookmark className={`w-4 h-4 ${place.is_bookmarked ? 'fill-brand-500 text-brand-500' : 'text-gray-600'}`} />
        </button>

        {/* Bottom overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          {isLoker ? (
            <span className="badge bg-blue-500 text-white text-xs"><Briefcase className="w-3 h-3" /> Lowongan</span>
          ) : (
            <span className={`badge text-white ${getRatingColor(place.rating)}`}>★ {place.rating.toFixed(1)}</span>
          )}
          {place.category && (
            <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-sm">{place.category.icon}</div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-brand-600 transition-colors line-clamp-1 text-sm">{place.name}</h3>

        <div className="flex items-center gap-3 mb-2">
          {!isLoker && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span className="text-yellow-400">★</span>
              <span className="font-medium text-gray-700 text-xs">{place.rating.toFixed(1)}</span>
              <span className="text-xs">({place.review_count})</span>
            </div>
          )}
          {priceLabel && <span className="text-xs text-green-600 font-medium">{priceLabel}</span>}
        </div>

        {place.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-2 flex-1">{place.description}</p>
        )}

        <div className="flex items-center gap-1 text-xs text-gray-400 mt-auto">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{place.address}</span>
        </div>

        {place.tags && place.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {place.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
