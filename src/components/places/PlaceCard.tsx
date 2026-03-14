'use client'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Bookmark, BadgeCheck, Star } from 'lucide-react'
import { Place } from '@/types'
import { PRICE_RANGE_LABELS } from '@/types'

interface PlaceCardProps {
  place: Place
  variant?: 'default' | 'horizontal' | 'featured'
}

const PLACEHOLDER_IMAGES: Record<string, string> = {
  kuliner: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
  wisata: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
  hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
  belanja: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop',
  default: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
}

function getRatingColor(rating: number) {
  if (rating >= 4.5) return 'bg-emerald-500'
  if (rating >= 4.0) return 'bg-green-500'
  if (rating >= 3.5) return 'bg-yellow-500'
  if (rating >= 3.0) return 'bg-orange-500'
  return 'bg-red-500'
}

export function PlaceCard({ place, variant = 'default' }: PlaceCardProps) {
  const imgSrc = place.cover_image || PLACEHOLDER_IMAGES[place.category?.slug || 'default']
  const priceLabel = place.price_range ? PRICE_RANGE_LABELS[place.price_range] : null

  if (variant === 'horizontal') {
    return (
      <Link href={`/places/${place.slug}`} className="card flex gap-4 p-3 group overflow-hidden">
        <div className="w-28 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100">
          <img
            src={imgSrc}
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0 py-1">
          <div className="flex items-start gap-2">
            <h3 className="font-semibold text-gray-900 truncate flex-1 group-hover:text-brand-600 transition-colors">
              {place.name}
            </h3>
            {place.is_verified && <BadgeCheck className="w-4 h-4 text-brand-500 shrink-0" />}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`badge text-white text-xs ${getRatingColor(place.rating)} py-0.5 px-2`}>
              ★ {place.rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-400">({place.review_count})</span>
            {priceLabel && <span className="text-xs text-green-600 font-medium">{priceLabel}</span>}
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="text-xs text-gray-500 truncate">{place.kecamatan || place.kota}</span>
          </div>
          {place.category && (
            <span className="inline-block mt-1.5 text-xs text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
              {place.category.icon} {place.category.name}
            </span>
          )}
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/places/${place.slug}`} className="place-card card group overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={imgSrc}
          alt={place.name}
          className="place-image w-full h-full object-cover transition-transform duration-300"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {place.is_featured && (
            <span className="badge bg-brand-500 text-white text-xs py-0.5">⭐ Unggulan</span>
          )}
          {place.is_verified && (
            <span className="badge bg-white text-brand-600 text-xs py-0.5">
              <BadgeCheck className="w-3 h-3" /> Terverifikasi
            </span>
          )}
        </div>

        {/* Bookmark */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
          <Bookmark className={`w-4 h-4 ${place.is_bookmarked ? 'fill-brand-500 text-brand-500' : 'text-gray-600'}`} />
        </button>

        {/* Rating badge on image */}
        <div className="absolute bottom-3 left-3">
          <span className={`badge text-white ${getRatingColor(place.rating)}`}>
            ★ {place.rating.toFixed(1)}
          </span>
        </div>

        {/* Category icon */}
        {place.category && (
          <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-sm">
            {place.category.icon}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-brand-600 transition-colors line-clamp-1">
          {place.name}
        </h3>

        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span className="text-yellow-400">★</span>
            <span className="font-medium text-gray-700">{place.rating.toFixed(1)}</span>
            <span>({place.review_count})</span>
          </div>
          {priceLabel && (
            <span className="text-sm text-green-600 font-medium">{priceLabel}</span>
          )}
        </div>

        {place.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">{place.description}</p>
        )}

        <div className="flex items-center gap-1 text-xs text-gray-500 mt-auto">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{place.address}</span>
        </div>

        {place.tags && place.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {place.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
