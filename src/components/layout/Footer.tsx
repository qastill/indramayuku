import Link from 'next/link'
import { MapPin, Mail, Phone, Instagram, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-display font-bold">I</span>
              </div>
              <div>
                <span className="font-display font-bold text-xl text-white">Indrama</span>
                <span className="font-display font-bold text-xl text-brand-400">yuku</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Platform review tempat dan bisnis lokal di Indramayu. Temukan pengalaman terbaik di Kota Mangga! 🥭
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
              <span>Indramayu, Jawa Barat, Indonesia</span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-white mb-4">Jelajahi</h4>
            <ul className="space-y-2">
              {[
                { label: 'Kuliner Khas', href: '/categories/kuliner' },
                { label: 'Wisata Pantai', href: '/categories/wisata' },
                { label: 'Hotel & Penginapan', href: '/categories/hotel' },
                { label: 'Belanja Oleh-oleh', href: '/categories/belanja' },
                { label: 'Semua Tempat', href: '/places' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-brand-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Indramayu */}
          <div>
            <h4 className="font-semibold text-white mb-4">Info Indramayu</h4>
            <ul className="space-y-2">
              {[
                { label: 'Tentang Indramayu', href: '/about' },
                { label: 'Kuliner Khas', href: '/about#kuliner' },
                { label: 'Budaya & Tradisi', href: '/about#budaya' },
                { label: 'Peta Wisata', href: '/about#peta' },
                { label: 'Daftar Bisnis', href: '/daftar-bisnis' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-brand-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Akun */}
          <div>
            <h4 className="font-semibold text-white mb-4">Akun</h4>
            <ul className="space-y-2 mb-6">
              {[
                { label: 'Daftar Akun', href: '/auth/register' },
                { label: 'Masuk', href: '/auth/login' },
                { label: 'Profil Saya', href: '/profile' },
                { label: 'Tempat Tersimpan', href: '/bookmarks' },
                { label: 'Review Saya', href: '/my-reviews' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-brand-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="mailto:info@indramayuku.com" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-600 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-gray-500">
            © 2024 Indramayuku. Dibuat dengan ❤️ untuk warga Indramayu
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-300">Kebijakan Privasi</Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-300">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
