'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { Loader2, MapPin, Phone, Globe, Building } from 'lucide-react'
import { KECAMATAN_LIST } from '@/types'

const CATEGORIES = [
  { slug: 'kuliner', name: '🍽️ Kuliner' },
  { slug: 'wisata', name: '🌊 Wisata' },
  { slug: 'hotel', name: '🏨 Hotel & Penginapan' },
  { slug: 'belanja', name: '🛍️ Belanja' },
  { slug: 'kesehatan', name: '🏥 Kesehatan' },
  { slug: 'pendidikan', name: '🎓 Pendidikan' },
  { slug: 'transportasi', name: '🚌 Transportasi' },
  { slug: 'hiburan', name: '🎭 Hiburan' },
  { slug: 'kecantikan', name: '💇 Kecantikan & Perawatan' },
  { slug: 'otomotif', name: '🔧 Otomotif' },
  { slug: 'perbankan', name: '🏦 Perbankan & Keuangan' },
  { slug: 'properti', name: '🏠 Properti' },
]

export default function DaftarBisnisPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', category_slug: '', description: '',
    address: '', kecamatan: '', phone: '', website: '',
    whatsapp: '', instagram: '', price_range: ''
  })
  const router = useRouter()

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async () => {
    if (!form.name || !form.category_slug || !form.address) {
      return toast.error('Nama, kategori, dan alamat wajib diisi')
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      toast.error('Kamu harus login dulu')
      router.push('/auth/login')
      return
    }

    setLoading(true)
    try {
      // Get category id
      const { data: cat } = await supabase.from('categories').select('id').eq('slug', form.category_slug).single()
      if (!cat) throw new Error('Kategori tidak valid')

      const slug = form.name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim() + '-' + Date.now()

      const { data, error } = await supabase.from('places').insert({
        name: form.name,
        slug,
        category_id: cat.id,
        description: form.description || null,
        address: form.address,
        kecamatan: form.kecamatan || null,
        phone: form.phone || null,
        website: form.website || null,
        whatsapp: form.whatsapp || null,
        instagram: form.instagram?.replace('@', '') || null,
        price_range: form.price_range || null,
        owner_id: user.id,
        is_active: true,
        is_verified: false,
      }).select().single()

      if (error) throw error
      toast.success('Tempat berhasil didaftarkan! 🎉', { duration: 5000 })
      router.push(`/places/${data.slug}`)
    } catch (err: any) {
      toast.error('Gagal mendaftarkan tempat. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Daftarkan Tempat</h1>
        <p className="text-gray-500">Tambahkan bisnis atau tempat kamu ke Indramayuku secara gratis</p>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8 justify-center">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${s <= step ? 'bg-brand-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {s}
            </div>
            {s < 3 && <div className={`w-16 h-1 rounded transition-all ${s < step ? 'bg-brand-500' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="card p-6">
        {/* Step 1: Informasi Dasar */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-brand-500" /> Informasi Dasar
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Tempat *</label>
              <input type="text" value={form.name} onChange={e => update('name', e.target.value)}
                placeholder="Contoh: Warung Nasi Bu Siti" className="input-field" required />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori *</label>
              <select value={form.category_slug} onChange={e => update('category_slug', e.target.value)} className="input-field">
                <option value="">Pilih kategori...</option>
                {CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
              <textarea value={form.description} onChange={e => update('description', e.target.value)}
                placeholder="Ceritakan tentang tempat ini..." rows={4} className="input-field resize-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kisaran Harga</label>
              <div className="grid grid-cols-4 gap-2">
                {['Murah', 'Sedang', 'Mahal', 'Sangat Mahal'].map(p => (
                  <button key={p} type="button"
                    onClick={() => update('price_range', form.price_range === p ? '' : p)}
                    className={`py-2 px-3 rounded-xl text-sm font-medium border transition-all ${form.price_range === p ? 'bg-brand-500 text-white border-brand-500' : 'border-gray-200 text-gray-600 hover:border-brand-300'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => {
              if (!form.name || !form.category_slug) return toast.error('Nama dan kategori wajib diisi')
              setStep(2)
            }} className="w-full btn-brand mt-2">
              Lanjut →
            </button>
          </div>
        )}

        {/* Step 2: Lokasi */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-500" /> Lokasi
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Lengkap *</label>
              <textarea value={form.address} onChange={e => update('address', e.target.value)}
                placeholder="Jl. Sudirman No. 123, Desa/Kelurahan..." rows={3} className="input-field resize-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kecamatan</label>
              <select value={form.kecamatan} onChange={e => update('kecamatan', e.target.value)} className="input-field">
                <option value="">Pilih kecamatan...</option>
                {KECAMATAN_LIST.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50">
                ← Kembali
              </button>
              <button onClick={() => {
                if (!form.address) return toast.error('Alamat wajib diisi')
                setStep(3)
              }} className="flex-1 btn-brand">
                Lanjut →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Kontak */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-brand-500" /> Informasi Kontak
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
              <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                placeholder="0234-271234 atau 081234567890" className="input-field" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
              <input type="tel" value={form.whatsapp} onChange={e => update('whatsapp', e.target.value)}
                placeholder="628123456789 (format internasional)" className="input-field" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">@</span>
                <input type="text" value={form.instagram} onChange={e => update('instagram', e.target.value.replace('@', ''))}
                  placeholder="username_instagram" className="input-field pl-8" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
              <input type="url" value={form.website} onChange={e => update('website', e.target.value)}
                placeholder="https://website.com" className="input-field" />
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
              <p className="font-semibold text-gray-700 mb-2">Ringkasan:</p>
              <p>📌 <strong>{form.name}</strong></p>
              <p>📍 {form.address}{form.kecamatan ? `, Kec. ${form.kecamatan}` : ''}</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50">
                ← Kembali
              </button>
              <button onClick={handleSubmit} disabled={loading}
                className="flex-1 btn-brand flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</> : '✓ Daftarkan'}
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        Tempat yang didaftarkan akan ditinjau oleh tim Indramayuku sebelum ditampilkan secara publik.
      </p>
    </div>
  )
}
