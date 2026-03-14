'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Menu, X, MapPin, User, BookmarkIcon, Star, LogOut, ChevronDown } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        setProfile(profile)
      }
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    router.push('/')
  }

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-display font-bold">I</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-xl text-gray-900">Indrama</span>
              <span className="font-display font-bold text-xl text-brand-500">yuku</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari restoran, wisata, hotel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 text-sm transition-all"
              />
            </div>
          </form>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/places" className="px-3 py-2 text-sm text-gray-600 hover:text-brand-500 font-medium rounded-lg hover:bg-gray-50 transition-all">
              Jelajahi
            </Link>
            <Link href="/categories" className="px-3 py-2 text-sm text-gray-600 hover:text-brand-500 font-medium rounded-lg hover:bg-gray-50 transition-all">
              Kategori
            </Link>
            <Link href="/about" className="px-3 py-2 text-sm text-gray-600 hover:text-brand-500 font-medium rounded-lg hover:bg-gray-50 transition-all">
              Tentang
            </Link>

            {user ? (
              <div className="relative ml-2">
                <button onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all">
                  <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
                    <span className="text-brand-600 text-sm font-bold">
                      {profile?.username?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{profile?.username || 'User'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700" onClick={() => setShowUserMenu(false)}>
                      <User className="w-4 h-4" /> Profil Saya
                    </Link>
                    <Link href="/bookmarks" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700" onClick={() => setShowUserMenu(false)}>
                      <BookmarkIcon className="w-4 h-4" /> Tersimpan
                    </Link>
                    <Link href="/my-reviews" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700" onClick={() => setShowUserMenu(false)}>
                      <Star className="w-4 h-4" /> Review Saya
                    </Link>
                    <hr className="my-1" />
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-sm text-red-600 w-full">
                      <LogOut className="w-4 h-4" /> Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link href="/auth/login" className="px-4 py-2 text-sm font-medium text-brand-500 hover:bg-brand-50 rounded-xl transition-all">
                  Masuk
                </Link>
                <Link href="/auth/register" className="btn-brand text-sm py-2 px-4">
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-3 pb-4 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              <Link href="/places" className="px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium" onClick={() => setIsOpen(false)}>Jelajahi</Link>
              <Link href="/categories" className="px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium" onClick={() => setIsOpen(false)}>Kategori</Link>
              <Link href="/about" className="px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium" onClick={() => setIsOpen(false)}>Tentang</Link>
              {user ? (
                <>
                  <Link href="/profile" className="px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium" onClick={() => setIsOpen(false)}>Profil</Link>
                  <button onClick={handleLogout} className="px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg font-medium text-left">Keluar</button>
                </>
              ) : (
                <div className="flex gap-2 px-4 pt-2">
                  <Link href="/auth/login" className="flex-1 text-center py-2 border border-brand-500 text-brand-500 rounded-xl font-medium" onClick={() => setIsOpen(false)}>Masuk</Link>
                  <Link href="/auth/register" className="flex-1 text-center py-2 bg-brand-500 text-white rounded-xl font-medium" onClick={() => setIsOpen(false)}>Daftar</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
