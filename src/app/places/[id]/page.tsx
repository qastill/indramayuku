import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Phone, Globe, Clock, BadgeCheck, Bookmark, Share2, ExternalLink, Star, MessageSquare, ChevronLeft, Instagram } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { StarRating, RatingBreakdown } from '@/components/ui/StarRating'
import { ReviewCard } from '@/components/reviews/ReviewCard'
import { WriteReviewButton } from '@/components/reviews/WriteReviewButton'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

const HARI = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu']
const HARI_LABEL: Record<string, string> = {
  senin: 'Senin', selasa: 'Selasa', rabu: 'Rabu', kamis: 'Kamis',
  jumat: 'Jumat', sabtu: 'Sabtu', minggu: 'Minggu'
}

async function getPlace(slug: string) {
  const { data } = await supabase
    .from('places')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .single()
  return data
}

async function getReviews(placeId: string) {
  const { data } = await supabase
    .from('reviews')
    .select('*, profile:profiles(*)')
    .eq('place_id', placeId)
    .order('created_at', { ascending: false })
    .limit(10)
  return data || []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const place = await getPlace(params.slug)
  if (!place) return { title: 'Tempat tidak ditemukan' }
  return {
    title: `${place.name} - Review & Info | Indramayuku`,
    description: place.description || `Info dan review ${place.name} di Indramayu`,
  }
}

export default async function PlaceDetailPage({ params }: Props) {
  const place = await getPlace(params.slug)
  if (!place) notFound()

  const reviews = await getReviews(place.id)

  const today = HARI[new Date().getDay()]
  const todayHours = place.hours?.[today]
  const isOpen = todayHours && !todayHours.closed

  const ratingBreakdown = reviews.reduce((acc, r) => {
    acc[r.rating] = (acc[r.rating] || 0) + 1
    return acc
  }, {} as Record<number, number>)

  const defaultImg = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop'

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/places" className="hover:text-brand-500 flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Kembali
        </Link>
        <span>/</span>
        {place.category && (
          <>
            <Link href={`/categories/${place.category.slug}`} className="hover:text-brand-500">
              {place.category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-900 font-medium">{place.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-72 md:h-96">
            <img
              src={place.cover_image || defaultImg}
              alt={place.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Badges overlay */}
            <div className="absolute top-4 left-4 flex gap-2">
              {place.is_featured && (
                <span className="badge bg-brand-500 text-white">⭐ Unggulan</span>
              )}
              {place.is_verified && (
                <span className="badge bg-white text-brand-600">
                  <BadgeCheck className="w-3.5 h-3.5" /> Terverifikasi
                </span>
              )}
            </div>

            {/* Actions overlay */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="w-9 h-9 bg-white/90 rounded-xl flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                <Bookmark className="w-4 h-4 text-gray-700" />
              </button>
              <button className="w-9 h-9 bg-white/90 rounded-xl flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                <Share2 className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* Status overlay */}
            <div className="absolute bottom-4 left-4">
              <span className={`badge text-white ${isOpen ? 'bg-emerald-500' : 'bg-red-500'}`}>
                {isOpen ? '🟢 Buka Sekarang' : '🔴 Tutup'}
              </span>
            </div>
          </div>

          {/* Title & Rating */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900">{place.name}</h1>
                {place.category && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg">{place.category.icon}</span>
                    <Link href={`/categories/${place.category.slug}`} className="text-brand-500 text-sm font-medium hover:underline">
                      {place.category.name}
                    </Link>
                    {place.price_range && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="text-green-600 font-medium text-sm">
                          {place.price_range === 'Murah' ? 'Rp' : place.price_range === 'Sedang' ? 'Rp Rp' : 'Rp Rp Rp'}
                          {' '}{place.price_range}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 mt-4 p-4 bg-gray-50 rounded-2xl">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">{place.rating.toFixed(1)}</div>
                <StarRating rating={place.rating} size="sm" />
                <div className="text-xs text-gray-500 mt-0.5">{place.review_count} ulasan</div>
              </div>
              <div className="flex-1">
                <RatingBreakdown ratings={ratingBreakdown} />
              </div>
            </div>
          </div>

          {/* Description */}
          {place.description && (
            <div className="card p-5">
              <h2 className="font-semibold text-gray-900 mb-3">Tentang</h2>
              <p className="text-gray-600 leading-relaxed">{place.description}</p>
              {place.tags && place.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {place.tags.map(tag => (
                    <span key={tag} className="badge bg-gray-100 text-gray-600">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Reviews */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-gray-900">
                Ulasan ({place.review_count})
              </h2>
              <WriteReviewButton placeId={place.id} placeName={place.name} />
            </div>

            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="card p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-700">Belum ada ulasan</h3>
                <p className="text-gray-400 text-sm mt-1 mb-4">Jadilah yang pertama mengulas tempat ini!</p>
                <WriteReviewButton placeId={place.id} placeName={place.name} />
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Info Card */}
          <div className="card p-5 space-y-4">
            <h3 className="font-semibold text-gray-900">Informasi</h3>

            {/* Address */}
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-800">{place.address}</p>
                {place.kecamatan && (
                  <p className="text-xs text-gray-500">Kec. {place.kecamatan}, {place.kota}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            {place.phone && (
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <a href={`tel:${place.phone}`} className="text-sm text-gray-800 hover:text-brand-500">{place.phone}</a>
              </div>
            )}

            {/* Website */}
            {place.website && (
              <div className="flex gap-3">
                <Globe className="w-5 h-5 text-brand-500 shrink-0" />
                <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-500 hover:underline flex items-center gap-1">
                  Website <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Instagram */}
            {place.instagram && (
              <div className="flex gap-3">
                <Instagram className="w-5 h-5 text-brand-500 shrink-0" />
                <a href={`https://instagram.com/${place.instagram}`} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-500 hover:underline">
                  @{place.instagram}
                </a>
              </div>
            )}

            {/* WhatsApp */}
            {place.whatsapp && (
              <a
                href={`https://wa.me/${place.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors text-sm"
              >
                <span>💬</span> Chat WhatsApp
              </a>
            )}
          </div>

          {/* Hours */}
          {place.hours && (
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-brand-500" />
                <h3 className="font-semibold text-gray-900">Jam Operasional</h3>
              </div>
              <div className="space-y-1.5">
                {HARI.map(hari => {
                  const h = place.hours[hari]
                  const isToday = hari === today
                  return (
                    <div key={hari} className={`flex justify-between text-sm ${isToday ? 'font-semibold text-brand-600' : 'text-gray-600'}`}>
                      <span>{HARI_LABEL[hari]}{isToday ? ' (hari ini)' : ''}</span>
                      <span>{h?.closed ? 'Tutup' : h ? `${h.open} - ${h.close}` : '-'}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Map placeholder */}
          {place.latitude && place.longitude && (
            <div className="card overflow-hidden">
              <a
                href={`https://maps.google.com/?q=${place.latitude},${place.longitude}`}
                target="_blank" rel="noopener noreferrer"
              >
                <div className="h-40 bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-brand-500 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-700">Buka di Google Maps</span>
                  </div>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
