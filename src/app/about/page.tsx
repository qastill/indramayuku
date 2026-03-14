import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tentang Indramayu | Indramayuku',
  description: 'Informasi lengkap tentang Kabupaten Indramayu, Jawa Barat - sejarah, kuliner, wisata, dan budaya.',
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-brand-600 to-dermayu-batik text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-6xl mb-4">🥭</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Tentang Indramayu</h1>
          <p className="text-xl text-orange-100">
            Kabupaten Indramayu — Kota Mangga yang kaya budaya, kuliner, dan alam pesisir Jawa Barat
          </p>
        </div>
      </section>

      {/* Sejarah Singkat */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-6" id="sejarah">Sejarah Singkat</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              Kabupaten Indramayu adalah sebuah kabupaten di Provinsi Jawa Barat, Indonesia. Ibu kotanya adalah Kecamatan Indramayu. Kabupaten ini berbatasan dengan Laut Jawa di utara, Kabupaten Cirebon dan Majalengka di timur, Kabupaten Sumedang dan Majalengka di selatan, dan Kabupaten Subang di barat.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Menurut tradisi, nama Indramayu berasal dari nama Ki Tinggil yang mendirikan kerajaan kecil di sekitar Cimanuk pada tahun 1527. Wilayah ini berkembang menjadi pelabuhan penting dan pusat perdagangan di pesisir utara Jawa.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Indramayu dikenal sebagai <strong>Kota Mangga</strong> karena merupakan salah satu penghasil mangga terbesar di Indonesia, terutama varietasManis Gedong Gincu yang terkenal hingga mancanegara.
            </p>
          </div>
        </div>
      </section>

      {/* Fakta Indramayu */}
      <section className="py-12 bg-gray-50" id="fakta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-8">Fakta Indramayu</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🗺️', label: 'Luas Wilayah', value: '2.040 km²' },
              { icon: '👥', label: 'Jumlah Penduduk', value: '±1,9 Juta jiwa' },
              { icon: '🏘️', label: 'Kecamatan', value: '31 Kecamatan' },
              { icon: '🏖️', label: 'Garis Pantai', value: '±147 km' },
              { icon: '🥭', label: 'Varietas Mangga', value: '20+ Jenis' },
              { icon: '🐟', label: 'Nelayan', value: '±28.000 orang' },
              { icon: '🛢️', label: 'Ladang Minyak', value: 'Pertamina EP' },
              { icon: '📍', label: 'Koordinat', value: '6°–7° LS / 107°–108° BT' },
            ].map(item => (
              <div key={item.label} className="card p-4 text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-bold text-gray-900 text-lg">{item.value}</div>
                <div className="text-xs text-gray-500 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kuliner Khas */}
      <section className="py-12" id="kuliner">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">Kuliner Khas Indramayu</h2>
          <p className="text-gray-500 mb-8">Cita rasa khas pesisir yang wajib kamu coba!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                nama: 'Nasi Lengko', emoji: '🍚',
                desc: 'Nasi dengan tahu goreng, tempe goreng, tauge rebus, timun, dan disiram bumbu kacang khas. Makanan sehari-hari yang sederhana namun lezat dan bergizi.',
                tags: ['Murah', 'Sarapan', 'Vegetarian']
              },
              {
                nama: 'Pindang Serani / Pindang Tulang', emoji: '🍲',
                desc: 'Sup ikan yang asam pedas dengan bumbu rempah khas Indramayu. Biasanya menggunakan ikan kakap, kerapu, atau ikan laut segar lainnya.',
                tags: ['Pedas', 'Makanan Utama', 'Seafood']
              },
              {
                nama: 'Pedesan Ayam/Enthog', emoji: '🍗',
                desc: 'Masakan pedas dengan bahan dasar kluwek (buah keras hitam) yang menghasilkan kuah hitam pekat. Rasa yang unik dan khas, biasanya menggunakan ayam atau itik.',
                tags: ['Pedas', 'Khas', 'Berkuah']
              },
              {
                nama: 'Ikan Asin Khas Indramayu', emoji: '🐟',
                desc: 'Indramayu dikenal sebagai penghasil ikan asin berkualitas. Berbagai jenis ikan asin seperti jambal roti, gabus, dan peda menjadi oleh-oleh wajib.',
                tags: ['Oleh-oleh', 'Khas', 'Awet']
              },
              {
                nama: 'Empal Gentong', emoji: '🥘',
                desc: 'Sup daging sapi dengan santan dan rempah pilihan, dimasak dalam gentong tanah liat. Kuah yang gurih dan daging yang empuk menjadi ciri khasnya.',
                tags: ['Daging', 'Berkuah', 'Legit']
              },
              {
                nama: 'Mangga Gedong Gincu', emoji: '🥭',
                desc: 'Varietas mangga unggulan Indramayu dengan warna kuning-merah mencolok. Rasanya manis dengan sedikit asam, aromanya kuat. Musim panen April–Juli.',
                tags: ['Buah', 'Oleh-oleh', 'Musiman']
              },
            ].map(item => (
              <div key={item.nama} className="card p-5 flex gap-4">
                <div className="text-4xl shrink-0">{item.emoji}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.nama}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-2">{item.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map(tag => (
                      <span key={tag} className="badge bg-brand-50 text-brand-600 text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/categories/kuliner" className="btn-brand inline-flex">
              Jelajahi Kuliner Indramayu 🍽️
            </Link>
          </div>
        </div>
      </section>

      {/* Budaya & Seni */}
      <section className="py-12 bg-gradient-to-br from-dermayu-batik/5 to-brand-50" id="budaya">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">Budaya & Seni</h2>
          <p className="text-gray-500 mb-8">Kekayaan tradisi yang terus dilestarikan</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                emoji: '🎵', nama: 'Tarling',
                desc: 'Musik tradisional perpaduan gitar dan suling (seruling). Berasal dari kata "gitar" dan "suling". Menjadi identitas budaya Indramayu dan Cirebon.'
              },
              {
                emoji: '🎨', nama: 'Batik Paoman',
                desc: 'Batik khas Indramayu dari daerah Paoman dengan motif flora dan fauna pesisir. Warna cerah dan motif yang khas membedakannya dari batik daerah lain.'
              },
              {
                emoji: '🎭', nama: 'Sintren',
                desc: 'Kesenian tari tradisional yang dipercaya memiliki unsur gaib. Penari akan "dirasuki" dan menari dalam kondisi trance. Pertunjukan khas malam hari.'
              },
              {
                emoji: '🚢', nama: 'Nadran (Sedekah Laut)',
                desc: 'Ritual tahunan masyarakat nelayan sebagai ungkapan syukur kepada Tuhan atas hasil laut. Dirayakan dengan prosesi dan larungan sesaji ke laut.'
              },
              {
                emoji: '🌾', nama: 'Mapag Sri',
                desc: 'Upacara adat menyambut panen padi. Wujud rasa syukur petani atas hasil bumi yang melimpah, diiringi kesenian tradisional dan doa bersama.'
              },
              {
                emoji: '👘', nama: 'Sandiwara',
                desc: 'Teater tradisional Indramayu yang menampilkan cerita rakyat, kisah sejarah, dan drama kehidupan. Diiringi gamelan dan tarling.'
              },
            ].map(item => (
              <div key={item.nama} className="card p-5">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.nama}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wisata */}
      <section className="py-12" id="peta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">Destinasi Wisata Unggulan</h2>
          <p className="text-gray-500 mb-8">Tempat-tempat indah yang wajib dikunjungi</p>

          <div className="space-y-3">
            {[
              { nama: 'Pantai Tirtamaya', kec: 'Juntinyuat', desc: 'Pantai wisata terpopuler dengan berbagai fasilitas', emoji: '🏖️' },
              { nama: 'Pantai Karangsong', kec: 'Indramayu', desc: 'Kawasan hutan mangrove dan habitat burung bangau', emoji: '🌿' },
              { nama: 'Pantai Glayem', kec: 'Juntinyuat', desc: 'Pasir putih bersih dengan sunset yang indah', emoji: '🌅' },
              { nama: 'Situ Bojongsari', kec: 'Kertasemaya', desc: 'Danau buatan untuk rekreasi keluarga dan memancing', emoji: '🎣' },
              { nama: 'Pantai Eretan', kec: 'Kandanghaur', desc: 'Pantai khas nelayan dengan pasar ikan segar', emoji: '🐟' },
              { nama: 'Curug Cipalahlar', kec: 'Gantar', desc: 'Air terjun tersembunyi di kawasan perbukitan selatan', emoji: '💧' },
            ].map(item => (
              <div key={item.nama} className="card p-4 flex items-center gap-4">
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.nama}</h3>
                  <p className="text-sm text-gray-500">{item.kec} • {item.desc}</p>
                </div>
                <Link href={`/search?q=${encodeURIComponent(item.nama)}`} className="text-sm text-brand-500 font-medium hover:underline shrink-0">
                  Cari →
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/categories/wisata" className="btn-brand inline-flex">
              Lihat Semua Wisata 🌊
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-brand-500">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Mulai Jelajahi Indramayu!
          </h2>
          <p className="text-orange-100 mb-6">
            Temukan tempat-tempat terbaik dan share pengalamanmu untuk membantu sesama warga Indramayu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/places" className="bg-white text-brand-600 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all">
              Jelajahi Sekarang
            </Link>
            <Link href="/auth/register" className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all">
              Buat Akun Gratis
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
