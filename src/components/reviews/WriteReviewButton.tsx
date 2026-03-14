'use client'
import { useState } from 'react'
import { Star, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { StarRating } from '@/components/ui/StarRating'

interface WriteReviewButtonProps {
  placeId: string
  placeName: string
}

const VISIT_TYPES = ['Sendiri', 'Bersama Pasangan', 'Bersama Keluarga', 'Bersama Teman', 'Bisnis']

export function WriteReviewButton({ placeId, placeName }: WriteReviewButtonProps) {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [visitType, setVisitType] = useState('')
  const [visitDate, setVisitDate] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleOpen = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      toast.error('Kamu harus login dulu untuk menulis ulasan')
      router.push('/auth/login')
      return
    }
    setOpen(true)
  }

  const handleSubmit = async () => {
    if (!rating) return toast.error('Pilih rating dulu ya!')
    if (!content.trim() || content.length < 20) return toast.error('Ulasan minimal 20 karakter')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return toast.error('Silakan login terlebih dahulu')

    setLoading(true)
    try {
      const { error } = await supabase.from('reviews').insert({
        place_id: placeId,
        user_id: user.id,
        rating,
        title: title.trim() || null,
        content: content.trim(),
        visit_type: visitType || null,
        visit_date: visitDate || null,
      })

      if (error) {
        if (error.code === '23505') {
          toast.error('Kamu sudah pernah mengulas tempat ini')
        } else {
          throw error
        }
        return
      }

      toast.success('Ulasan berhasil dikirim! Terima kasih 🎉')
      setOpen(false)
      setRating(0); setTitle(''); setContent(''); setVisitType(''); setVisitDate('')
      router.refresh()
    } catch (err) {
      toast.error('Gagal mengirim ulasan. Coba lagi ya.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button onClick={handleOpen} className="btn-brand flex items-center gap-2 text-sm py-2.5">
        <Star className="w-4 h-4" /> Tulis Ulasan
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h2 className="font-display font-bold text-lg text-gray-900">Tulis Ulasan</h2>
                <p className="text-sm text-gray-500">{placeName}</p>
              </div>
              <button onClick={() => setOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Rating Keseluruhan *</label>
                <div className="flex items-center gap-3">
                  <StarRating rating={rating} size="lg" interactive onChange={setRating} />
                  {rating > 0 && (
                    <span className="text-sm font-medium text-gray-600">
                      {['', 'Sangat Buruk', 'Kurang Baik', 'Cukup', 'Bagus', 'Luar Biasa!'][rating]}
                    </span>
                  )}
                </div>
              </div>

              {/* Visit info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Kunjungan</label>
                  <select
                    value={visitType}
                    onChange={e => setVisitType(e.target.value)}
                    className="input-field text-sm"
                  >
                    <option value="">Pilih...</option>
                    {VISIT_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Kunjungan</label>
                  <input
                    type="month"
                    value={visitDate}
                    onChange={e => setVisitDate(e.target.value)}
                    className="input-field text-sm"
                    max={new Date().toISOString().slice(0, 7)}
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Ulasan (opsional)</label>
                <input
                  type="text"
                  placeholder="Ringkasan pengalamanmu..."
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  maxLength={100}
                  className="input-field text-sm"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ulasan *</label>
                <textarea
                  placeholder="Ceritakan pengalamanmu di sini. Apa yang kamu suka? Apa yang bisa lebih baik? Rekomendasikan ke orang lain?"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  rows={5}
                  minLength={20}
                  className="input-field text-sm resize-none"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">{content.length} / minimal 20 karakter</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setOpen(false)} className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm">
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !rating || content.length < 20}
                  className="flex-1 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Mengirim...</> : 'Kirim Ulasan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
