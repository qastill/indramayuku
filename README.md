# 🥭 Indramayuku

Platform review tempat dan bisnis di Indramayu, seperti Yelp — dibuat khusus untuk warga dan pengunjung Kabupaten Indramayu, Jawa Barat.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Fitur Utama

- 🔍 **Pencarian** tempat, kuliner, wisata, hotel
- ⭐ **Review & Rating** dengan sistem bintang
- 📂 **12 Kategori** (Kuliner, Wisata, Hotel, Belanja, dll.)
- 🗺️ **31 Kecamatan** Indramayu
- 👤 **Autentikasi** pengguna (register/login)
- 📱 **Responsive** - optimal di HP dan desktop
- 🥭 **Konten lokal** khas Indramayu

## Tech Stack

- **Frontend**: Next.js 14, React 18, TailwindCSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel
- **Bahasa**: TypeScript

---

## 🚀 Setup Lengkap

### 1. Buat Akun & Project Supabase

1. Buka [supabase.com](https://supabase.com) → **Start your project**
2. Sign up / Login dengan GitHub
3. Klik **New project**
4. Isi:
   - **Name**: `indramayuku`
   - **Database Password**: buat password kuat (simpan!)
   - **Region**: Southeast Asia (Singapore)
5. Tunggu project dibuat (~2 menit)

### 2. Setup Database Supabase

1. Di dashboard Supabase, klik **SQL Editor** di sidebar kiri
2. Klik **New query**
3. Copy seluruh isi file `supabase-schema.sql`
4. Paste ke SQL Editor
5. Klik **Run** (atau Ctrl+Enter)
6. Tunggu sampai semua berhasil (ada data sample yang otomatis masuk)

### 3. Ambil API Keys Supabase

1. Di Supabase dashboard → **Settings** (ikon gear) → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

### 4. Setup Repository GitHub

```bash
# Clone atau buat repo baru
git init
git add .
git commit -m "🥭 Initial commit - Indramayuku"

# Buat repo di GitHub (github.com → New repository)
# Nama: indramayuku
# Visibility: Public atau Private

git remote add origin https://github.com/USERNAME/indramayuku.git
git branch -M main
git push -u origin main
```

### 5. Deploy ke Vercel

**Cara 1: Via Vercel Dashboard (Rekomendasi)**

1. Buka [vercel.com](https://vercel.com) → Login dengan GitHub
2. Klik **New Project**
3. Import repository `indramayuku`
4. Di bagian **Environment Variables**, tambahkan:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGci...
   SUPABASE_SERVICE_ROLE_KEY = eyJhbGci...
   NEXT_PUBLIC_SITE_URL = https://indramayuku.vercel.app
   ```
5. Klik **Deploy**
6. Tunggu build selesai (~3 menit)

**Cara 2: Via Vercel CLI**

```bash
npm install -g vercel
vercel login
vercel --prod
# Ikuti instruksi, masukkan env vars saat diminta
```

### 6. Setup Environment Lokal

```bash
# Copy template
cp .env.local.example .env.local

# Edit file .env.local dengan text editor
# Isi dengan API keys dari Supabase
```

### 7. Jalankan Lokal

```bash
npm install
npm run dev
# Buka http://localhost:3000
```

---

## 📁 Struktur Project

```
indramayuku/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root layout
│   │   ├── places/
│   │   │   ├── page.tsx        # Daftar tempat
│   │   │   └── [id]/page.tsx   # Detail tempat
│   │   ├── categories/
│   │   │   ├── page.tsx        # Daftar kategori
│   │   │   └── [slug]/page.tsx # Kategori detail
│   │   ├── search/page.tsx     # Halaman pencarian
│   │   ├── about/page.tsx      # Tentang Indramayu
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── daftar-bisnis/page.tsx
│   │   └── api/                # REST API routes
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── places/             # PlaceCard
│   │   ├── reviews/            # ReviewCard, WriteReviewButton
│   │   └── ui/                 # StarRating
│   ├── lib/
│   │   └── supabase.ts         # Supabase client
│   └── types/
│       └── index.ts            # TypeScript types
├── supabase-schema.sql         # Database schema + data
├── .env.local.example          # Template env vars
└── README.md
```

---

## 🔧 Konfigurasi Supabase Tambahan

### Auth Settings (Wajib)
1. Supabase Dashboard → **Authentication** → **URL Configuration**
2. Set **Site URL**: `https://indramayuku.vercel.app` (atau domain kamu)
3. Tambah **Redirect URLs**: `https://indramayuku.vercel.app/auth/callback`

### Storage Buckets (Otomatis via SQL)
SQL schema sudah membuat 3 bucket:
- `place-images` - Foto tempat
- `avatars` - Foto profil pengguna  
- `review-images` - Foto di ulasan

---

## 🥭 Data Khas Indramayu

Database sudah terisi dengan:
- **12 Kategori** lengkap dengan icon dan warna
- **15+ Tempat** sample termasuk:
  - Warung Nasi Lengko Bu Imas
  - Pantai Karangsong (mangrove)
  - Pantai Tirtamaya
  - Trisula Hotel
  - Toko Batik Paoman
  - Pusat Oleh-oleh (Mangga Gedong Gincu)
  - Dan banyak lagi...

---

## 🤝 Kontribusi

Pull request sangat disambut! Terutama untuk:
- Menambah data tempat di Indramayu
- Perbaikan bug
- Fitur baru

---

## 📄 Lisensi

MIT License - bebas digunakan untuk kepentingan komunitas Indramayu.

---

*Dibuat dengan ❤️ untuk warga Indramayu*
