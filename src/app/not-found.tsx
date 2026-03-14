import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-7xl mb-4">🥭</div>
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-2">Halaman tidak ditemukan</p>
        <p className="text-gray-400 mb-8">Sepertinya halaman yang kamu cari sudah pindah atau tidak ada.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-brand">Kembali ke Beranda</Link>
          <Link href="/places" className="btn-outline">Jelajahi Tempat</Link>
        </div>
      </div>
    </div>
  )
}
