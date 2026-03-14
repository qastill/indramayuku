-- ================================================
-- INDRAMAYUKU - Supabase Database Schema
-- Jalankan di Supabase SQL Editor
-- ================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ================================================
-- PROFILES TABLE
-- ================================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT DEFAULT 'Indramayu',
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ================================================
-- CATEGORIES TABLE
-- ================================================
CREATE TABLE public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT '#E8520A',
  place_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

-- Insert categories khas Indramayu
INSERT INTO public.categories (name, slug, description, icon, color) VALUES
('Kuliner', 'kuliner', 'Restoran, warung, depot, dan tempat makan khas Indramayu', '🍽️', '#E8520A'),
('Wisata', 'wisata', 'Pantai, sungai, dan destinasi wisata alam Indramayu', '🌊', '#0EA5E9'),
('Hotel & Penginapan', 'hotel', 'Hotel, guest house, dan penginapan di Indramayu', '🏨', '#8B5CF6'),
('Belanja', 'belanja', 'Pasar, toko, dan pusat perbelanjaan', '🛍️', '#EC4899'),
('Kesehatan', 'kesehatan', 'Rumah sakit, klinik, apotek, dan fasilitas kesehatan', '🏥', '#10B981'),
('Pendidikan', 'pendidikan', 'Sekolah, kampus, dan lembaga pendidikan', '🎓', '#F59E0B'),
('Transportasi', 'transportasi', 'Terminal, pangkalan ojek, rental kendaraan', '🚌', '#6366F1'),
('Hiburan', 'hiburan', 'Bioskop, karaoke, taman, dan tempat hiburan', '🎭', '#EF4444'),
('Kecantikan & Perawatan', 'kecantikan', 'Salon, barbershop, spa, dan perawatan tubuh', '💇', '#F97316'),
('Otomotif', 'otomotif', 'Bengkel, showroom, dan layanan kendaraan', '🔧', '#64748B'),
('Perbankan & Keuangan', 'perbankan', 'Bank, ATM, koperasi, dan layanan keuangan', '🏦', '#059669'),
('Properti', 'properti', 'Agen properti, kontrakan, perumahan', '🏠', '#7C3AED');

-- ================================================
-- PLACES TABLE
-- ================================================
CREATE TABLE public.places (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category_id UUID REFERENCES public.categories(id),
  address TEXT NOT NULL,
  kelurahan TEXT,
  kecamatan TEXT,
  kota TEXT DEFAULT 'Indramayu',
  provinsi TEXT DEFAULT 'Jawa Barat',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone TEXT,
  website TEXT,
  whatsapp TEXT,
  instagram TEXT,
  email TEXT,
  price_range TEXT CHECK (price_range IN ('Murah', 'Sedang', 'Mahal', 'Sangat Mahal')),
  price_min INTEGER,
  price_max INTEGER,
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  hours JSONB DEFAULT '{
    "senin": {"open": "08:00", "close": "22:00", "closed": false},
    "selasa": {"open": "08:00", "close": "22:00", "closed": false},
    "rabu": {"open": "08:00", "close": "22:00", "closed": false},
    "kamis": {"open": "08:00", "close": "22:00", "closed": false},
    "jumat": {"open": "08:00", "close": "22:00", "closed": false},
    "sabtu": {"open": "08:00", "close": "22:00", "closed": false},
    "minggu": {"open": "08:00", "close": "22:00", "closed": false}
  }',
  tags TEXT[],
  images TEXT[],
  cover_image TEXT,
  owner_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Places are viewable by everyone" ON public.places FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can insert places" ON public.places FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Owners can update their places" ON public.places FOR UPDATE USING (auth.uid() = owner_id OR auth.role() = 'service_role');

-- Full text search
CREATE INDEX places_search_idx ON public.places USING GIN (
  to_tsvector('indonesian', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(address, ''))
);

-- ================================================
-- REVIEWS TABLE
-- ================================================
CREATE TABLE public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  place_id UUID REFERENCES public.places(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT NOT NULL,
  images TEXT[],
  helpful_count INTEGER DEFAULT 0,
  visit_date DATE,
  visit_type TEXT CHECK (visit_type IN ('Sendiri', 'Bersama Pasangan', 'Bersama Keluarga', 'Bersama Teman', 'Bisnis')),
  is_verified_visit BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(place_id, user_id)
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can write reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their reviews" ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- ================================================
-- HELPFUL VOTES TABLE
-- ================================================
CREATE TABLE public.helpful_votes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  review_id UUID REFERENCES public.reviews(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(review_id, user_id)
);

ALTER TABLE public.helpful_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Votes are viewable by everyone" ON public.helpful_votes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can vote" ON public.helpful_votes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can remove their votes" ON public.helpful_votes FOR DELETE USING (auth.uid() = user_id);

-- ================================================
-- BOOKMARKS TABLE
-- ================================================
CREATE TABLE public.bookmarks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  place_id UUID REFERENCES public.places(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, place_id)
);

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their bookmarks" ON public.bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add bookmarks" ON public.bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove bookmarks" ON public.bookmarks FOR DELETE USING (auth.uid() = user_id);

-- ================================================
-- FUNCTIONS & TRIGGERS
-- ================================================

-- Auto create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Update place rating after review
CREATE OR REPLACE FUNCTION public.update_place_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.places
  SET 
    rating = (SELECT AVG(rating)::DECIMAL(3,2) FROM public.reviews WHERE place_id = COALESCE(NEW.place_id, OLD.place_id)),
    review_count = (SELECT COUNT(*) FROM public.reviews WHERE place_id = COALESCE(NEW.place_id, OLD.place_id))
  WHERE id = COALESCE(NEW.place_id, OLD.place_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_review_change
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE PROCEDURE public.update_place_rating();

-- Update category place count
CREATE OR REPLACE FUNCTION public.update_category_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.categories
  SET place_count = (SELECT COUNT(*) FROM public.places WHERE category_id = COALESCE(NEW.category_id, OLD.category_id) AND is_active = true)
  WHERE id = COALESCE(NEW.category_id, OLD.category_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_place_change
  AFTER INSERT OR UPDATE OR DELETE ON public.places
  FOR EACH ROW EXECUTE PROCEDURE public.update_category_count();

-- ================================================
-- SAMPLE DATA - Tempat-tempat di Indramayu
-- ================================================

-- Kuliner
INSERT INTO public.places (name, slug, description, category_id, address, kecamatan, phone, price_range, tags, is_featured, rating, review_count) VALUES
('Warung Nasi Lengko Bu Imas', 'warung-nasi-lengko-bu-imas', 
'Nasi Lengko khas Indramayu yang sudah terkenal sejak 1985. Disajikan dengan tahu, tempe, sayur mentimun, tauge, dan bumbu kacang yang khas. Wajib coba saat berkunjung ke Indramayu!',
(SELECT id FROM categories WHERE slug='kuliner'), 
'Jl. Siliwangi No. 45, Indramayu', 'Indramayu', '0234-271234', 'Murah',
ARRAY['nasi lengko', 'makanan khas', 'sarapan', 'murah meriah'], true, 4.7, 203),

('Rumah Makan Dermayu Seafood', 'rumah-makan-dermayu-seafood',
'Restoran seafood terbaik di Indramayu dengan menu ikan bakar, udang, kepiting, dan cumi segar langsung dari nelayan lokal. Nikmati sunset di tepi pantai sambil makan.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Budi Dharma No. 12, Karangsong', 'Indramayu', '0234-272345', 'Sedang',
ARRAY['seafood', 'ikan bakar', 'udang', 'kepiting', 'pantai'], true, 4.5, 178),

('Warung Mie Kocok Indramayu Pak Darto', 'warung-mie-kocok-pak-darto',
'Mie kocok dengan kuah kaldu sapi yang gurih, disajikan bersama kikil dan tauge segar. Sudah berdiri 30 tahun dan menjadi favorit warga lokal.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Gatot Subroto No. 88, Indramayu', 'Indramayu', '085712345678', 'Murah',
ARRAY['mie kocok', 'kikil', 'sarapan', 'legendaris'], false, 4.6, 145),

('Depot Empal Gentong Indramayu', 'depot-empal-gentong-indramayu',
'Empal gentong khas Cirebon-Indramayu dengan kuah santan yang kaya rempah. Daging sapi empuk dan bumbu yang meresap sempurna.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. DI Panjaitan No. 33, Indramayu', 'Indramayu', '0234-273456', 'Sedang',
ARRAY['empal gentong', 'kuliner khas', 'soto', 'daging sapi'], false, 4.4, 98),

('Warung Pedesan Ayam Bu Sari', 'warung-pedesan-ayam-bu-sari',
'Pedesan Ayam khas Indramayu yang pedas dan lezat. Dibuat dari ayam kampung dengan bumbu kluwek dan rempah pilihan. Porsi besar, harga bersahabat.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Veteran No. 67, Losarang', 'Losarang', '087834567890', 'Murah',
ARRAY['pedesan', 'ayam', 'pedas', 'kluwek', 'khas indramayu'], true, 4.8, 267);

-- Wisata
INSERT INTO public.places (name, slug, description, category_id, address, kecamatan, phone, price_range, tags, is_featured, rating, review_count) VALUES
('Pantai Karangsong', 'pantai-karangsong',
'Pantai indah dengan hutan mangrove yang luas, menjadi habitat ribuan burung bangau. Cocok untuk wisata alam, fotografi, dan edukasi lingkungan. Ada perahu untuk menyusuri sungai mangrove.',
(SELECT id FROM categories WHERE slug='wisata'),
'Desa Karangsong, Indramayu', 'Indramayu', '0234-274567', 'Murah',
ARRAY['pantai', 'mangrove', 'burung', 'alam', 'fotografi'], true, 4.6, 312),

('Pantai Glayem', 'pantai-glayem',
'Pantai dengan pasir putih bersih dan ombak yang cocok untuk berenang. Tersedia warung makan seafood segar di sepanjang pantai. Sunset di sini sangat indah.',
(SELECT id FROM categories WHERE slug='wisata'),
'Desa Juntinyuat, Juntinyuat', 'Juntinyuat', NULL, 'Murah',
ARRAY['pantai', 'pasir putih', 'berenang', 'sunset', 'seafood'], true, 4.4, 189),

('Situ Bojongsari', 'situ-bojongsari',
'Danau buatan yang menjadi destinasi rekreasi keluarga. Ada tempat memancing, gazebo, dan wahana perahu. Cocok untuk piknik dan camping bersama keluarga.',
(SELECT id FROM categories WHERE slug='wisata'),
'Desa Bojongsari, Kertasemaya', 'Kertasemaya', NULL, 'Murah',
ARRAY['danau', 'memancing', 'rekreasi', 'keluarga', 'camping'], false, 4.2, 87),

('Monumen Perjuangan Indramayu', 'monumen-perjuangan-indramayu',
'Monumen bersejarah yang menceritakan perjuangan rakyat Indramayu. Dilengkapi museum mini dan taman yang indah. Gratis untuk dikunjungi.',
(SELECT id FROM categories WHERE slug='wisata'),
'Jl. Letjend Suprapto, Indramayu', 'Indramayu', NULL, 'Murah',
ARRAY['sejarah', 'monumen', 'museum', 'gratis', 'edukasi'], false, 4.0, 56),

('Pantai Tirtamaya', 'pantai-tirtamaya',
'Pantai wisata paling populer di Indramayu dengan fasilitas lengkap. Ada wahana air, kolam renang, penginapan, dan berbagai kuliner. Ramai dikunjungi saat akhir pekan.',
(SELECT id FROM categories WHERE slug='wisata'),
'Desa Juntinyuat, Juntinyuat', 'Juntinyuat', '0234-351234', 'Sedang',
ARRAY['pantai', 'wahana air', 'kolam renang', 'keluarga', 'liburan'], true, 4.3, 445);

-- Hotel
INSERT INTO public.places (name, slug, description, category_id, address, kecamatan, phone, price_range, tags, is_featured, rating, review_count) VALUES
('Trisula Hotel Indramayu', 'trisula-hotel-indramayu',
'Hotel bintang 3 terbaik di Indramayu dengan fasilitas lengkap. Kolam renang, restoran, meeting room, dan WiFi gratis. Lokasi strategis di pusat kota.',
(SELECT id FROM categories WHERE slug='hotel'),
'Jl. Sudirman No. 1, Indramayu', 'Indramayu', '0234-272800', 'Mahal',
ARRAY['hotel bintang 3', 'kolam renang', 'restoran', 'meeting room', 'pusat kota'], true, 4.4, 234),

('Penginapan Bahari Inn', 'penginapan-bahari-inn',
'Penginapan nyaman dekat pantai dengan harga terjangkau. Kamar bersih dengan AC, TV, dan kamar mandi dalam. Cocok untuk backpacker dan wisatawan keluarga.',
(SELECT id FROM categories WHERE slug='hotel'),
'Jl. Karangsong No. 23, Indramayu', 'Indramayu', '0234-273900', 'Sedang',
ARRAY['penginapan', 'dekat pantai', 'AC', 'terjangkau', 'backpacker'], false, 4.1, 89);

-- Belanja  
INSERT INTO public.places (name, slug, description, category_id, address, kecamatan, phone, price_range, tags, is_featured, rating, review_count) VALUES
('Pasar Baru Indramayu', 'pasar-baru-indramayu',
'Pasar tradisional terbesar di Indramayu. Tersedia berbagai kebutuhan sehari-hari, oleh-oleh khas Indramayu, batik Indramayu, dan aneka kuliner pasar.',
(SELECT id FROM categories WHERE slug='belanja'),
'Jl. Pasar Baru, Indramayu', 'Indramayu', NULL, 'Murah',
ARRAY['pasar tradisional', 'oleh-oleh', 'batik', 'sembako', 'kuliner pasar'], true, 4.2, 156),

('Toko Batik Paoman Indramayu', 'toko-batik-paoman',
'Toko batik khas Indramayu dengan motif Paoman yang terkenal. Jual batik tulis, batik cap, dan batik printing. Bisa pesan custom motif. Harga langsung dari pengrajin.',
(SELECT id FROM categories WHERE slug='belanja'),
'Jl. Paoman No. 15, Indramayu', 'Indramayu', '085612345678', 'Sedang',
ARRAY['batik', 'batik indramayu', 'paoman', 'oleh-oleh', 'kerajinan'], true, 4.6, 123),

('Pusat Oleh-oleh Khas Indramayu', 'pusat-oleh-oleh-khas-indramayu',
'Toko oleh-oleh terlengkap di Indramayu. Jual mangga gedong gincu, kerupuk ikan, terasi, abon mangga, dodol mangga, dan berbagai produk khas Indramayu.',
(SELECT id FROM categories WHERE slug='belanja'),
'Jl. Diponegoro No. 78, Indramayu', 'Indramayu', '0234-275678', 'Sedang',
ARRAY['oleh-oleh', 'mangga', 'kerupuk', 'terasi', 'dodol'], true, 4.5, 289);

-- ================================================
-- STORAGE BUCKETS
-- ================================================
-- Jalankan ini di Supabase Storage:
-- CREATE BUCKET place-images (public)
-- CREATE BUCKET avatars (public)
-- CREATE BUCKET review-images (public)

INSERT INTO storage.buckets (id, name, public) VALUES 
  ('place-images', 'place-images', true),
  ('avatars', 'avatars', true),
  ('review-images', 'review-images', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "Anyone can view images" ON storage.objects FOR SELECT USING (bucket_id IN ('place-images', 'avatars', 'review-images'));
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update their files" ON storage.objects FOR UPDATE USING (auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their files" ON storage.objects FOR DELETE USING (auth.uid()::text = (storage.foldername(name))[1]);
