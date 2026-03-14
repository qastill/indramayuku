'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || !username) return toast.error('Isi semua field yang wajib diisi')
    if (password.length < 6) return toast.error('Password minimal 6 karakter')
    if (username.length < 3) return toast.error('Username minimal 3 karakter')
    if (!/^[a-z0-9_]+$/.test(username)) return toast.error('Username hanya boleh huruf kecil, angka, dan underscore')

    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username.toLowerCase(),
            full_name: fullName,
          }
        }
      })
      if (error) throw error
      toast.success('Akun berhasil dibuat! Cek email untuk verifikasi 📧', { duration: 5000 })
      router.push('/auth/login')
    } catch (err: any) {
      if (err.message.includes('already registered')) {
        toast.error('Email sudah terdaftar')
      } else if (err.message.includes('unique')) {
        toast.error('Username sudah digunakan, coba yang lain')
      } else {
        toast.error('Gagal membuat akun. Coba lagi.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl font-display font-bold">I</span>
            </div>
          </Link>
          <h1 className="font-display text-2xl font-bold text-gray-900 mt-4">Daftar Akun</h1>
          <p className="text-gray-500 text-sm mt-1">Gratis & langsung bisa nulis ulasan!</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="username"
                    className="input-field pl-7 text-sm"
                    required
                    minLength={3}
                    maxLength={30}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Nama Kamu"
                    className="input-field pl-10 text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="input-field pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3">
              <p className="text-xs text-orange-700">
                🥭 Dengan mendaftar, kamu bisa nulis ulasan dan membantu warga Indramayu menemukan tempat terbaik!
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-brand py-3 flex items-center justify-center gap-2 text-base"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Membuat akun...</> : 'Buat Akun Gratis'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Sudah punya akun?{' '}
              <Link href="/auth/login" className="text-brand-500 font-semibold hover:underline">Masuk</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
