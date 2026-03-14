import Link from 'next/link'
import { MapPin, Mail, Instagram, Facebook, MessageSquare, Map } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
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
              Platform paling lengkap se-Indramayu. Review, direktori, forum warga, peta, jasa lokal, dan lebih banyak lagi! 🥭
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
              <span>Indramayu, Jawa Barat</span>
            </div>
          </div>

          {/* Jelajahi */}
          <div>
            <h4 className="font-semibold text-white mb-4">🔍 Jelajahi</h4>
            <ul className="space-y-2">
              {[
                { label: '🍽️ Kuliner', href: '/categories/kuliner' },
                { label: '🌊 Wisata Pantai', href: '/categories/wisata' },
                { label: '🏨 Hotel', href: '/categories/hotel' },
                { label: '🕌 Masjid', href: '/masjid' },
                { label: '🛍️ Belanja', href: '/categories/belanja' },
                { label: '💊 Apotek', href: '/apotek' },
                { label: '💪 Olahraga', href: '/categories/olahraga' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-brand-400 transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Jasa & Loker */}
          <div>
            <h4 className="font-semibold text-white mb-4">🔨 Jasa & Loker</h4>
            <ul className="space-y-2">
              {[
                { label: '⚡ Tukang Listrik', href: '/jasa?sub=Tukang+Listrik' },
                { label: '🔧 Bengkel & Las', href: '/jasa?sub=Bengkel+Las' },
                { label: '🏠 Tukang Bangunan', href: '/jasa?sub=Tukang+Bangunan' },
                { label: '❄️ Servis AC', href: '/jasa?sub=Servis+AC' },
                { label: '👕 Laundry', href: '/jasa?sub=Laundry' },
                { label: '💼 Lowongan Kerja', href: '/categories/loker' },
                { label: '🔨 Semua Jasa', href: '/jasa' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-brand-400 transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Komunitas */}
          <div>
            <h4 className="font-semibold text-white mb-4">🗣️ Komunitas</h4>
            <ul className="space-y-2">
              {[
                { label: '📋 Forum Warga', href: '/forum' },
                { label: '📢 Keluhan Warga', href: '/forum?cat=Keluhan+Warga' },
                { label: '🛍️ Jual Beli', href: '/forum?cat=Jual+Beli' },
                { label: '💼 Loker Forum', href: '/forum?cat=Lowongan+Kerja' },
                { label: '🗺️ Peta Indramayu', href: '/peta' },
                { label: '📍 Filter Kecamatan', href: '/places' },
                { label: '✍️ Buat Postingan', href: '/forum/buat' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-brand-400 transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Akun & Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">👤 Akun</h4>
            <ul className="space-y-2 mb-5">
              {[
                { label: 'Daftar Akun', href: '/auth/register' },
                { label: 'Masuk', href: '/auth/login' },
                { label: 'Profil Saya', href: '/profile' },
                { label: 'Tersimpan', href: '/bookmarks' },
                { label: 'Daftarkan Tempat', href: '/daftar-bisnis' },
                { label: 'Tentang Indramayu', href: '/about' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-brand-400 transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
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

        {/* Kecamatan quick links */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">📍 Jelajahi per Kecamatan</p>
          <div className="flex flex-wrap gap-2">
            {['Indramayu','Jatibarang','Haurgeulis','Karangampel','Losarang','Kandanghaur','Kertasemaya','Gantar','Juntinyuat','Balongan','Sindang','Widasari','Sliyeg','Bangodua','Terisi'].map(kec => (
              <Link key={kec} href={`/places?kecamatan=${kec}`}
                className="text-xs text-gray-500 hover:text-brand-400 transition-colors border border-gray-700 px-2 py-1 rounded-lg hover:border-brand-600">
                {kec}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-gray-500">© 2024 Indramayuku — Platform Paling Lengkap Se-Indramayu 🥭</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-300">Privasi</Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-300">Syarat</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
