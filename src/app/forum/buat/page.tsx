'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { Loader2, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { KECAMATAN_LIST } from '@/types'

const CATEGORIES = [
  { name: 'Tanya Jawab', icon: '❓' },
  { name: 'Jual Beli', icon: '🛍️' },
  { name: 'Lowongan Kerja', icon: '💼' },
  { name: 'Keluhan Warga', icon: '📢' },
  { name: 'Info Penting', icon: '🚨' },
  { name: 'Review', icon: '⭐' },
  { name: 'Butuh Bantuan', icon: '🆘' },
  { name: 'Kehilangan', icon: '🔍' },
  { name: 'Umum', icon: '💬' },
]

export default function BuatPostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [kecamatan, setKecamatan] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !category) {
      return toast.error('Judul, konten, dan kategori wajib diisi')
    }
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      toast.error('Kamu harus login dulu')
      router.push('/auth/login')
      return
    }
    setLoading(true)
    try {
      const { data, error } = await supabase.from('forum_posts').insert({
        title: title.trim(),
        content: content.trim(),
        category,
        kecamatan: kecamatan || null,
        user_id: user.id,
      }).select().single()
      if (error) throw error
      toast.success('Postingan berhasil dibuat! 🎉')
      router.push(`/forum/${data.id}`)
    } catch {
      toast.error('Gagal membuat postingan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/forum" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-500 mb-6">
        <ChevronLeft className="w-4 h-4" /> Kembali ke Forum
      </Link>
      <div className="card p-6">
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">✍️ Buat Postingan Baru</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori *</label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map(c => (
                <button key={c.name} type="button" onClick={() => setCategory(c.name)}
                  className={`py-2 px-3 rounded-xl text-sm border transition-all text-left flex items-center gap-2 ${category === c.name ? 'bg-brand-500 text-white border-brand-500' : 'border-gray-200 text-gray-600 hover:border-brand-300'}`}>
                  <span>{c.icon}</span><span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Judul *</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}
              placeholder="Tulis judul yang jelas dan informatif..." maxLength={200} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Konten / Isi *</label>
            <textarea value={content} onChange={e => setContent(e.target.value)}
              placeholder="Tulis detailnya di sini. Semakin lengkap semakin bagus!" rows={8} className="input-field resize-none" />
            <p className="text-xs text-gray-400 mt-1 text-right">{content.length} karakter</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kecamatan (opsional)</label>
            <select value={kecamatan} onChange={e => setKecamatan(e.target.value)} className="input-field">
              <option value="">Semua kecamatan / tidak spesifik</option>
              {KECAMATAN_LIST.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Link href="/forum" className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 text-center">Batal</Link>
            <button onClick={handleSubmit} disabled={loading || !title || !content || !category}
              className="flex-1 btn-brand flex items-center justify-center gap-2 py-3">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Memposting...</> : '📤 Posting Sekarang'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
