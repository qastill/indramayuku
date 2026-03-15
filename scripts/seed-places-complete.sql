-- ================================================
-- SEED DATA SUPER LENGKAP - Tempat di Indramayu
-- Paste di Supabase SQL Editor → Run
-- Semua tempat sudah punya: jam buka, WA, IG, foto
-- ================================================

-- Hapus data lama
DELETE FROM public.reviews;
DELETE FROM public.places;
DELETE FROM public.categories;

-- ================================================
-- CATEGORIES
-- ================================================
INSERT INTO public.categories (id, name, slug, description, icon, color, place_count) VALUES
  ('cat-kuliner',    'Kuliner',          'kuliner',        'Makanan & minuman khas Indramayu', '🍽️', '#f97316', 0),
  ('cat-wisata',     'Wisata',           'wisata',         'Destinasi wisata alam dan budaya',  '🏖️', '#0ea5e9', 0),
  ('cat-hotel',      'Hotel & Penginapan','hotel',         'Hotel, homestay, penginapan',       '🏨', '#8b5cf6', 0),
  ('cat-masjid',     'Masjid',           'masjid',         'Masjid dan musholla',               '🕌', '#10b981', 0),
  ('cat-belanja',    'Belanja',          'belanja',        'Pasar, toko, mall, oleh-oleh',      '🛍️', '#ec4899', 0),
  ('cat-jasa',       'Jasa',             'jasa',           'Bengkel, tukang, servis',           '🔧', '#64748b', 0),
  ('cat-kesehatan',  'Kesehatan',        'kesehatan',      'Apotek, klinik, rumah sakit',       '🏥', '#ef4444', 0),
  ('cat-pendidikan', 'Pendidikan',       'pendidikan',     'Sekolah, les, kursus',              '📚', '#f59e0b', 0),
  ('cat-loker',      'Loker',            'loker',          'Lowongan kerja',                    '💼', '#6366f1', 0);

-- ================================================
-- KULINER
-- ================================================
INSERT INTO public.places (name, slug, description, category_id, address, kecamatan, kota, phone, whatsapp, website, instagram, price_range, price_min, price_max, tags, is_featured, is_active, is_verified, rating, review_count, latitude, longitude, cover_image, hours) VALUES

('Warung Nasi Lengko Bu Imas', 'warung-nasi-lengko-bu-imas',
'Nasi Lengko legendaris sejak 1985. Perpaduan tahu goreng, tempe goreng, mentimun segar, tauge rebus, dan bumbu kacang khas Indramayu yang gurih. Disajikan di atas nasi putih pulen dengan kecap manis. Wajib coba saat berkunjung ke Indramayu! Sudah terkenal sampai ke luar kota, sering dikunjungi wisatawan.',
'cat-kuliner', 'Jl. Siliwangi No. 45, Indramayu', 'Indramayu', 'Indramayu',
'0234-271234', '6281234567890', NULL, 'nasilengkobumas',
'Murah', 8000, 15000,
ARRAY['nasi lengko','makanan khas','sarapan','legendaris','tahu','tempe'], true, true, true, 4.8, 312,
-6.3276, 108.3215, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=400&fit=crop',
'{"senin":{"open":"06:00","close":"14:00","closed":false},"selasa":{"open":"06:00","close":"14:00","closed":false},"rabu":{"open":"06:00","close":"14:00","closed":false},"kamis":{"open":"06:00","close":"14:00","closed":false},"jumat":{"open":"06:00","close":"14:00","closed":false},"sabtu":{"open":"06:00","close":"16:00","closed":false},"minggu":{"open":"06:00","close":"16:00","closed":false}}'::jsonb),

('RM Seafood Karangsong', 'rm-seafood-karangsong',
'Rumah makan seafood segar langsung dari nelayan Karangsong. Menu andalan: ikan bakar bumbu kecombrang, udang galah goreng tepung, kepiting soka saos padang, dan cumi hitam. View pantai yang indah menambah kenikmatan makan. Bahan baku dijamin segar setiap hari.',
'cat-kuliner', 'Jl. Budi Dharma No. 12, Karangsong', 'Indramayu', 'Indramayu',
'0234-272345', '6282345678901', NULL, 'rmseafoodkarangsong',
'Sedang', 35000, 150000,
ARRAY['seafood','ikan bakar','kepiting','udang','pantai','fresh'], true, true, true, 4.6, 245,
-6.3150, 108.3456, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=400&fit=crop',
'{"senin":{"open":"10:00","close":"22:00","closed":false},"selasa":{"open":"10:00","close":"22:00","closed":false},"rabu":{"open":"10:00","close":"22:00","closed":false},"kamis":{"open":"10:00","close":"22:00","closed":false},"jumat":{"open":"10:00","close":"22:00","closed":false},"sabtu":{"open":"09:00","close":"23:00","closed":false},"minggu":{"open":"09:00","close":"23:00","closed":false}}'::jsonb),

('Warung Pedesan Ayam Bu Sari', 'warung-pedesan-ayam-bu-sari',
'Pedesan Ayam adalah makanan khas Indramayu yang wajib dicoba. Kuah hitam pekat dari kluwek, santan, dan berbagai rempah. Ayam kampung empuk dimasak lama hingga bumbu meresap. Rasanya pedas, gurih, dan sedikit manis. Porsi jumbo, harga bersahabat. Bu Sari memasak sendiri setiap pagi.',
'cat-kuliner', 'Jl. Veteran No. 67, Losarang', 'Losarang', 'Indramayu',
NULL, '6287834567890', NULL, 'pedesanaysari',
'Murah', 15000, 25000,
ARRAY['pedesan','ayam kampung','kluwek','pedas','khas indramayu'], true, true, true, 4.9, 421,
-6.2834, 108.1234, 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=400&fit=crop',
'{"senin":{"open":"07:00","close":"15:00","closed":false},"selasa":{"open":"07:00","close":"15:00","closed":false},"rabu":{"open":"07:00","close":"15:00","closed":false},"kamis":{"open":"07:00","close":"15:00","closed":false},"jumat":{"open":"07:00","close":"15:00","closed":false},"sabtu":{"open":"07:00","close":"17:00","closed":false},"minggu":{"open":"07:00","close":"14:00","closed":false}}'::jsonb),

('Depot Empal Gentong H. Apud', 'depot-empal-gentong-h-apud',
'Empal gentong khas Cirebon yang sudah eksis 25 tahun di Indramayu. Kuah santan kuning gurih kaya rempah: serai, daun salam, lengkuas. Isian pilihan: daging sapi, babat, kikil, atau campur. Disajikan dengan nasi atau lontong. Sambal merah tersedia untuk yang suka pedas.',
'cat-kuliner', 'Jl. DI Panjaitan No. 33, Indramayu', 'Indramayu', 'Indramayu',
'0234-273456', '6281298765432', NULL, 'empalgentonghapud',
'Sedang', 25000, 45000,
ARRAY['empal gentong','sapi','babat','santan','rempah','cirebon'], false, true, true, 4.5, 178,
-6.3300, 108.3180, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop',
'{"senin":{"open":"07:00","close":"16:00","closed":false},"selasa":{"open":"07:00","close":"16:00","closed":false},"rabu":{"open":"07:00","close":"16:00","closed":false},"kamis":{"open":"07:00","close":"16:00","closed":false},"jumat":{"open":"07:00","close":"16:00","closed":false},"sabtu":{"open":"07:00","close":"17:00","closed":false},"minggu":{"open":"07:00","close":"14:00","closed":false}}'::jsonb),

('Warung Pindang Serani Bu Ratih', 'warung-pindang-serani-bu-ratih',
'Pindang Serani adalah sup ikan asam segar khas pesisir Indramayu. Kuah bening kekuningan dengan rasa asam segar dari belimbing wuluh dan tomat. Ikan segar (kakap, patin, atau nila) dimasak dengan kunyit, serai, dan daun kemangi. Cocok dimakan siang hari dengan nasi hangat.',
'cat-kuliner', 'Jl. Diponegoro No. 55, Indramayu', 'Indramayu', 'Indramayu',
NULL, '6287612345678', NULL, 'pindangseranibratih',
'Murah', 18000, 30000,
ARRAY['pindang serani','ikan','asam segar','khas pesisir','belimbing wuluh'], true, true, false, 4.7, 289,
-6.3250, 108.3190, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=400&fit=crop',
'{"senin":{"open":"10:00","close":"20:00","closed":false},"selasa":{"open":"10:00","close":"20:00","closed":false},"rabu":{"open":"10:00","close":"20:00","closed":false},"kamis":{"open":"10:00","close":"20:00","closed":false},"jumat":{"open":"10:00","close":"20:00","closed":false},"sabtu":{"open":"09:00","close":"21:00","closed":false},"minggu":{"open":"09:00","close":"21:00","closed":false}}'::jsonb),

('Bakso Sapi Mas Budi', 'bakso-sapi-mas-budi',
'Bakso sapi 100% asli tanpa campuran, tekstur kenyal sempurna. Kuah kaldu sapi bening gurih dengan aroma daun bawang dan seledri. Pilihan: bakso biasa, bakso urat, bakso mercon isi cabe rawit, dan pangsit goreng crispy. Favorit warga Jatibarang sejak 15 tahun lalu.',
'cat-kuliner', 'Jl. Ahmad Yani No. 34, Jatibarang', 'Jatibarang', 'Indramayu',
NULL, '6282345678901', NULL, 'baksomasbudi',
'Murah', 12000, 25000,
ARRAY['bakso','sapi','pangsit','mercon','kenyal'], false, true, false, 4.3, 167,
-6.4713, 108.2345, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&h=400&fit=crop',
'{"senin":{"open":"08:00","close":"18:00","closed":false},"selasa":{"open":"08:00","close":"18:00","closed":false},"rabu":{"open":"08:00","close":"18:00","closed":false},"kamis":{"open":"08:00","close":"18:00","closed":false},"jumat":{"open":"08:00","close":"18:00","closed":false},"sabtu":{"open":"08:00","close":"19:00","closed":false},"minggu":{"open":"09:00","close":"17:00","closed":false}}'::jsonb),

('Restoran Terapung Pantai Boom', 'restoran-terapung-pantai-boom',
'Pengalaman makan unik di atas air dengan pemandangan laut lepas. Restoran terapung pertama di Indramayu. Menu andalan: udang bakar bumbu rempah, ikan kakap goreng garing, kepiting rebus saus tiram, dan cumi saus padang. Cocok untuk makan siang keluarga atau dinner romantis. Tersedia area lesehan dan kursi.',
'cat-kuliner', 'Pantai Boom, Indramayu', 'Indramayu', 'Indramayu',
'0234-281234', '6281234509876', 'https://pantaiboom.id', 'restoranterapungboom',
'Mahal', 75000, 300000,
ARRAY['terapung','view laut','udang','gurame','romantis','keluarga'], true, true, true, 4.5, 198,
-6.3100, 108.3400, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop',
'{"senin":{"open":"10:00","close":"22:00","closed":false},"selasa":{"open":"10:00","close":"22:00","closed":false},"rabu":{"open":"10:00","close":"22:00","closed":false},"kamis":{"open":"10:00","close":"22:00","closed":false},"jumat":{"open":"10:00","close":"22:00","closed":false},"sabtu":{"open":"09:00","close":"23:00","closed":false},"minggu":{"open":"09:00","close":"23:00","closed":false}}'::jsonb),

('Kopi Tukang Indramayu', 'kopi-tukang-indramayu',
'Kafe kopi specialty dengan biji kopi pilihan dari berbagai daerah Indonesia. Tersedia kopi single origin Jawa, Flores, dan Toraja. Barista terlatih siap menyeduh dengan berbagai metode: V60, Chemex, AeroPress, dan espresso. Suasana nyaman dengan interior industrial chic. Tersedia camilan tradisional dan wifi kencang.',
'cat-kuliner', 'Jl. Veteran No. 10, Indramayu', 'Indramayu', 'Indramayu',
NULL, '6289012345678', NULL, 'kopitukangindramayu',
'Sedang', 15000, 45000,
ARRAY['kopi','cafe','wifi','specialty','third wave','nongkrong'], false, true, true, 4.5, 156,
-6.3280, 108.3210, 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=400&fit=crop',
'{"senin":{"open":"08:00","close":"22:00","closed":false},"selasa":{"open":"08:00","close":"22:00","closed":false},"rabu":{"open":"08:00","close":"22:00","closed":false},"kamis":{"open":"08:00","close":"22:00","closed":false},"jumat":{"open":"08:00","close":"23:00","closed":false},"sabtu":{"open":"07:00","close":"23:00","closed":false},"minggu":{"open":"07:00","close":"22:00","closed":false}}'::jsonb),

('Sate Kambing Pak Haji Saman', 'sate-kambing-pak-haji-saman',
'Sate kambing muda pilihan, dagingnya empuk dan tidak bau prengus. Bumbu kecap hitam dengan irisan bawang merah, tomat, dan cabe rawit. Setiap tusuk dibakar fresh sesuai pesanan. Tersedia juga sop kambing dan tongseng. Tempat makan sederhana namun rasa bintang lima.',
'cat-kuliner', 'Jl. Sudirman No. 120, Indramayu', 'Indramayu', 'Indramayu',
NULL, '6281234567890', NULL, NULL,
'Sedang', 25000, 60000,
ARRAY['sate kambing','grilled','kecap','halal','tongseng'], false, true, false, 4.4, 145,
-6.3310, 108.3220, 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&h=400&fit=crop',
'{"senin":{"open":"11:00","close":"21:00","closed":false},"selasa":{"open":"11:00","close":"21:00","closed":false},"rabu":{"open":"11:00","close":"21:00","closed":false},"kamis":{"open":"11:00","close":"21:00","closed":false},"jumat":{"open":"11:00","close":"21:00","closed":false},"sabtu":{"open":"10:00","close":"22:00","closed":false},"minggu":{"open":"10:00","close":"21:00","closed":false}}'::jsonb),

('Rujak Kangkung Bu Neni', 'rujak-kangkung-bu-neni',
'Rujak kangkung khas Indramayu yang langka! Kangkung segar direbus lalu disiram bumbu rujak dari kacang sangrai, gula aren, dan cabe. Segar, pedas, manis berpadu sempurna. Hanya buka pagi-siang. Sudah ada sejak 1990an dan turun temurun. Selalu habis sebelum jam 12 siang.',
'cat-kuliner', 'Pasar Baru Indramayu, Kios No. 34', 'Indramayu', 'Indramayu',
NULL, NULL, NULL, NULL,
'Murah', 5000, 12000,
ARRAY['rujak kangkung','sarapan','pedas','manis','legendaris','khas'], false, true, false, 4.7, 223,
-6.3270, 108.3195, 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=400&fit=crop',
'{"senin":{"open":"06:00","close":"12:00","closed":false},"selasa":{"open":"06:00","close":"12:00","closed":false},"rabu":{"open":"06:00","close":"12:00","closed":false},"kamis":{"open":"06:00","close":"12:00","closed":false},"jumat":{"open":"06:00","close":"11:30","closed":false},"sabtu":{"open":"06:00","close":"12:00","closed":false},"minggu":{"closed":true}}'::jsonb),

-- ================================================
-- WISATA
-- ================================================
('Pantai Tirtamaya', 'pantai-tirtamaya',
'Pantai paling populer di Indramayu dengan pasir putih bersih dan ombak tenang. Cocok untuk keluarga, ada wahana permainan air, banana boat, dan jetski. Terdapat warung makan seafood sepanjang pantai. Sunset di sini sangat indah. Fasilitas lengkap: toilet, parkir luas, musala, dan penginapan di sekitar pantai.',
'cat-wisata', 'Jl. Raya Tirtamaya, Juntinyuat', 'Juntinyuat', 'Indramayu',
'0234-356789', '6281345678901', NULL, 'pantaitirtamaya',
'Murah', 10000, 25000,
ARRAY['pantai','pasir putih','keluarga','banana boat','sunset','wisata'], true, true, true, 4.5, 892,
-6.2901, 108.4123, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop',
'{"senin":{"open":"07:00","close":"18:00","closed":false},"selasa":{"open":"07:00","close":"18:00","closed":false},"rabu":{"open":"07:00","close":"18:00","closed":false},"kamis":{"open":"07:00","close":"18:00","closed":false},"jumat":{"open":"07:00","close":"18:00","closed":false},"sabtu":{"open":"06:00","close":"19:00","closed":false},"minggu":{"open":"06:00","close":"19:00","closed":false}}'::jsonb),

('Pantai Karangsong', 'pantai-karangsong',
'Surga mangrove di Indramayu! Hutan bakau seluas 200 hektar yang menjadi rumah berbagai burung migrasi. Ada jembatan kayu sepanjang 1 km untuk menyusuri mangrove. Sambil berjalan bisa melihat nelayan menarik jaring dan burung-burung cantik. Tersedia perahu untuk tur sekitar mangrove. TPI (Tempat Pelelangan Ikan) ada di sini.',
'cat-wisata', 'Desa Karangsong, Indramayu', 'Indramayu', 'Indramayu',
NULL, '6282456789012', NULL, 'mangrovekarangsong',
'Murah', 5000, 15000,
ARRAY['mangrove','burung','nelayan','alam','TPI','edukasi'], true, true, false, 4.4, 567,
-6.3050, 108.3567, 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=400&fit=crop',
'{"senin":{"open":"06:00","close":"17:00","closed":false},"selasa":{"open":"06:00","close":"17:00","closed":false},"rabu":{"open":"06:00","close":"17:00","closed":false},"kamis":{"open":"06:00","close":"17:00","closed":false},"jumat":{"open":"06:00","close":"17:00","closed":false},"sabtu":{"open":"06:00","close":"18:00","closed":false},"minggu":{"open":"06:00","close":"18:00","closed":false}}'::jsonb),

('Situ Bolang', 'situ-bolang',
'Danau alami tersembunyi di tengah hutan Kecamatan Cikedung. Air jernih kebiruan dikelilingi pepohonan rindang. Spot foto instagramable dengan latar danau dan sawah hijau. Ada perahu tradisional untuk berkeliling danau. Udara sejuk sangat menyegarkan. Jarang turis, masih sangat alami dan tenang.',
'cat-wisata', 'Desa Bolang, Cikedung', 'Cikedung', 'Indramayu',
NULL, NULL, NULL, 'situbolang_official',
'Murah', 5000, 10000,
ARRAY['danau','alam','hidden gem','sejuk','foto','perahu'], true, true, false, 4.6, 312,
-6.5234, 108.1890, 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=400&fit=crop',
'{"senin":{"open":"06:00","close":"17:00","closed":false},"selasa":{"open":"06:00","close":"17:00","closed":false},"rabu":{"open":"06:00","close":"17:00","closed":false},"kamis":{"open":"06:00","close":"17:00","closed":false},"jumat":{"open":"06:00","close":"17:00","closed":false},"sabtu":{"open":"06:00","close":"18:00","closed":false},"minggu":{"open":"06:00","close":"18:00","closed":false}}'::jsonb),

('Pantai Lombang', 'pantai-lombang',
'Pantai dengan keunikan pohon cemara laut yang rimbun sepanjang bibir pantai. Suasana teduh dan sejuk meski siang hari terik. Cocok untuk piknik keluarga di bawah pohon cemara. Pasir putih halus dan bersih. Ombak cukup tenang. Tersedia warung makan lokal dan area bermain anak.',
'cat-wisata', 'Desa Lombang, Juntinyuat', 'Juntinyuat', 'Indramayu',
NULL, '6283456789012', NULL, NULL,
'Murah', 8000, 15000,
ARRAY['pantai','cemara','piknik','keluarga','teduh','indah'], false, true, false, 4.3, 234,
-6.2756, 108.4234, 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=400&fit=crop',
'{"senin":{"open":"07:00","close":"17:00","closed":false},"selasa":{"open":"07:00","close":"17:00","closed":false},"rabu":{"open":"07:00","close":"17:00","closed":false},"kamis":{"open":"07:00","close":"17:00","closed":false},"jumat":{"open":"07:00","close":"17:00","closed":false},"sabtu":{"open":"06:00","close":"18:00","closed":false},"minggu":{"open":"06:00","close":"18:00","closed":false}}'::jsonb),

('Candi Indramayu (Situs Buyut Bandem)', 'candi-indramayu',
'Situs arkeologi bersejarah dari abad ke-14 era Kerajaan Sunda-Galuh. Terdapat arca dan reruntuhan batu andesit yang masih terawat. Cerita rakyat setempat sangat kaya. Lokasi terpencil di perbukitan memberikan suasana mistis dan tenang. Cocok untuk pecinta sejarah dan budaya.',
'cat-wisata', 'Desa Telagasari, Haurgeulis', 'Haurgeulis', 'Indramayu',
NULL, NULL, NULL, NULL,
'Murah', 5000, 5000,
ARRAY['sejarah','candi','arkeologi','budaya','bersejarah'], false, true, false, 4.1, 89,
-6.4567, 108.1012, 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=400&fit=crop',
'{"senin":{"open":"08:00","close":"16:00","closed":false},"selasa":{"open":"08:00","close":"16:00","closed":false},"rabu":{"open":"08:00","close":"16:00","closed":false},"kamis":{"open":"08:00","close":"16:00","closed":false},"jumat":{"open":"08:00","close":"16:00","closed":false},"sabtu":{"open":"08:00","close":"17:00","closed":false},"minggu":{"open":"08:00","close":"17:00","closed":false}}'::jsonb),

('Wisata Religi Makam Sunan Drajat', 'makam-buyut-tambi',
'Makam dan kompleks ziarah Buyut Tambi, tokoh penyebar Islam di Indramayu. Arsitektur makam bergaya Islam-Jawa yang indah. Ramai peziarah setiap Kamis malam dan malam Jumat. Terdapat masjid tua bersejarah di kompleks yang sama. Pedagang oleh-oleh dan makanan tersedia di sekitar area.',
'cat-wisata', 'Desa Tambi, Sliyeg', 'Sliyeg', 'Indramayu',
NULL, NULL, NULL, NULL,
'Murah', 0, 10000,
ARRAY['ziarah','makam','religi','islam','sejarah','wali'], false, true, false, 4.5, 445,
-6.4123, 108.2567, 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=400&fit=crop',
'{"senin":{"open":"06:00","close":"20:00","closed":false},"selasa":{"open":"06:00","close":"20:00","closed":false},"rabu":{"open":"06:00","close":"20:00","closed":false},"kamis":{"open":"06:00","close":"21:00","closed":false},"jumat":{"open":"06:00","close":"21:00","closed":false},"sabtu":{"open":"06:00","close":"21:00","closed":false},"minggu":{"open":"06:00","close":"21:00","closed":false}}'::jsonb),

-- ================================================
-- HOTEL & PENGINAPAN
-- ================================================
('Hotel Bahari Inn Indramayu', 'hotel-bahari-inn-indramayu',
'Hotel bintang 2 terbaik di Indramayu dengan lokasi strategis di pusat kota. 45 kamar bersih dan nyaman dengan AC, TV, dan wifi. Tersedia kolam renang outdoor, restoran, dan ruang meeting. Cocok untuk perjalanan bisnis maupun wisata keluarga. Staf ramah dan profesional. Free breakfast untuk semua tamu.',
'cat-hotel', 'Jl. MT Haryono No. 100, Indramayu', 'Indramayu', 'Indramayu',
'0234-275000', '6281098765432', 'https://hotelbahariinn.com', 'hotelbahariinn',
'Sedang', 350000, 750000,
ARRAY['hotel','bintang 2','kolam renang','breakfast','meeting room','wifi'], true, true, true, 4.3, 234,
-6.3290, 108.3230, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop',
'{"senin":{"open":"00:00","close":"23:59","closed":false},"selasa":{"open":"00:00","close":"23:59","closed":false},"rabu":{"open":"00:00","close":"23:59","closed":false},"kamis":{"open":"00:00","close":"23:59","closed":false},"jumat":{"open":"00:00","close":"23:59","closed":false},"sabtu":{"open":"00:00","close":"23:59","closed":false},"minggu":{"open":"00:00","close":"23:59","closed":false}}'::jsonb),

('Penginapan Bahari Inn', 'penginapan-bahari-inn',
'Penginapan nyaman dan terjangkau di pusat kota Indramayu. Kamar bersih dengan AC dan kipas angin, tersedia kamar mandi dalam. Lokasi dekat pasar, rumah makan, dan objek wisata. Cocok untuk backpacker dan keluarga dengan budget terbatas. Check-in 24 jam, parkir gratis, sarapan tersedia.',
'cat-hotel', 'Jl. Sudirman No. 56, Indramayu', 'Indramayu', 'Indramayu',
'0234-271500', '6289876543210', NULL, NULL,
'Murah', 150000, 350000,
ARRAY['penginapan','murah','pusat kota','AC','parkir gratis'], true, true, false, 4.0, 156,
-6.3300, 108.3200, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=400&fit=crop',
'{"senin":{"open":"00:00","close":"23:59","closed":false},"selasa":{"open":"00:00","close":"23:59","closed":false},"rabu":{"open":"00:00","close":"23:59","closed":false},"kamis":{"open":"00:00","close":"23:59","closed":false},"jumat":{"open":"00:00","close":"23:59","closed":false},"sabtu":{"open":"00:00","close":"23:59","closed":false},"minggu":{"open":"00:00","close":"23:59","closed":false}}'::jsonb),

('Hotel Grand Indramayu', 'hotel-grand-indramayu',
'Hotel bintang 3 terbaik di Indramayu. Fasilitas lengkap: kolam renang besar, gym, spa, restoran fine dining, dan ballroom kapasitas 500 orang. 80 kamar mewah dengan desain modern. View pemandangan kota dari lantai atas. Layanan kamar 24 jam, business center, dan laundry. Ideal untuk acara pernikahan dan konferensi.',
'cat-hotel', 'Jl. Gatot Subroto No. 200, Indramayu', 'Indramayu', 'Indramayu',
'0234-280000', '6281122334455', 'https://hotelgrandindramayu.com', 'hotelgrandindramayu',
'Mahal', 600000, 1500000,
ARRAY['hotel','bintang 3','kolam renang','gym','spa','ballroom','mewah'], true, true, true, 4.6, 312,
-6.3270, 108.3240, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop',
'{"senin":{"open":"00:00","close":"23:59","closed":false},"selasa":{"open":"00:00","close":"23:59","closed":false},"rabu":{"open":"00:00","close":"23:59","closed":false},"kamis":{"open":"00:00","close":"23:59","closed":false},"jumat":{"open":"00:00","close":"23:59","closed":false},"sabtu":{"open":"00:00","close":"23:59","closed":false},"minggu":{"open":"00:00","close":"23:59","closed":false}}'::jsonb),

('Homestay Tirtamaya Beach', 'homestay-tirtamaya-beach',
'Homestay tepi pantai dengan view laut langsung dari kamar. Bangunan tradisional Jawa yang asri. 10 kamar dengan tempat tidur nyaman, AC, dan balkon menghadap laut. Bangun pagi sambil mendengar suara ombak. Sarapan dengan menu seafood segar. Cocok untuk liburan keluarga dan honeymoon.',
'cat-hotel', 'Jl. Pantai Tirtamaya No. 15, Juntinyuat', 'Juntinyuat', 'Indramayu',
NULL, '6285678901234', NULL, 'homestaytirtamaya',
'Sedang', 250000, 500000,
ARRAY['homestay','view laut','tepi pantai','honeymoon','sarapan seafood'], false, true, false, 4.4, 178,
-6.2890, 108.4100, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=400&fit=crop',
'{"senin":{"open":"00:00","close":"23:59","closed":false},"selasa":{"open":"00:00","close":"23:59","closed":false},"rabu":{"open":"00:00","close":"23:59","closed":false},"kamis":{"open":"00:00","close":"23:59","closed":false},"jumat":{"open":"00:00","close":"23:59","closed":false},"sabtu":{"open":"00:00","close":"23:59","closed":false},"minggu":{"open":"00:00","close":"23:59","closed":false}}'::jsonb),

('Villa Mangga Indah', 'villa-mangga-indah',
'Villa private dengan kebun mangga sendiri di area perbukitan Cikedung yang sejuk. Cocok untuk retreat keluarga atau korporat. 3 kamar tidur dengan kapasitas 10 orang. Ada kolam renang private, BBQ area, dan dapur lengkap. Bisa memetik mangga langsung dari pohon saat musim. Staf siap memasak sesuai request.',
'cat-hotel', 'Jl. Perbukitan Cikedung No. 8, Cikedung', 'Cikedung', 'Indramayu',
NULL, '6287890123456', NULL, 'villamangga_indah',
'Mahal', 1200000, 2500000,
ARRAY['villa','private','kolam renang','kebun mangga','retreat','keluarga'], false, true, false, 4.7, 89,
-6.5100, 108.1780, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop',
'{"senin":{"open":"00:00","close":"23:59","closed":false},"selasa":{"open":"00:00","close":"23:59","closed":false},"rabu":{"open":"00:00","close":"23:59","closed":false},"kamis":{"open":"00:00","close":"23:59","closed":false},"jumat":{"open":"00:00","close":"23:59","closed":false},"sabtu":{"open":"00:00","close":"23:59","closed":false},"minggu":{"open":"00:00","close":"23:59","closed":false}}'::jsonb),

-- ================================================
-- MASJID
-- ================================================
('Masjid Agung Al-Aqobah Indramayu', 'masjid-agung-al-aqobah',
'Masjid terbesar dan termegah di Kabupaten Indramayu. Arsitektur megah perpaduan gaya Timur Tengah dan Jawa. Kubah emas besar menjadi landmark kota. Kapasitas 5.000 jamaah, fasilitas wudu terpisah pria-wanita, parkir luas. Menara setinggi 50 meter bisa dilihat dari jarak jauh. Pengajian rutin dan kajian Islam setiap minggu.',
'cat-masjid', 'Jl. RA Kartini No. 1, Indramayu', 'Indramayu', 'Indramayu',
'0234-271000', NULL, NULL, 'masjidagungindramayu',
'Murah', 0, 0,
ARRAY['masjid','terbesar','megah','landmark','kubah emas','jamaah'], true, true, true, 4.9, 567,
-6.3295, 108.3185, 'https://images.unsplash.com/photo-1545179605-1296651e9d43?w=800&h=400&fit=crop',
'{"senin":{"open":"04:00","close":"21:30","closed":false},"selasa":{"open":"04:00","close":"21:30","closed":false},"rabu":{"open":"04:00","close":"21:30","closed":false},"kamis":{"open":"04:00","close":"21:30","closed":false},"jumat":{"open":"04:00","close":"21:30","closed":false},"sabtu":{"open":"04:00","close":"21:30","closed":false},"minggu":{"open":"04:00","close":"21:30","closed":false}}'::jsonb),

('Masjid Jami Baiturrahman Jatibarang', 'masjid-jami-baiturrahman-jatibarang',
'Masjid bersejarah pusat kota Jatibarang yang berdiri sejak 1920. Arsitektur kolonial-Islam yang unik. Menara tua masih berdiri kokoh. Tempat favorit shalat Jumat masyarakat Jatibarang dan sekitarnya. Taman masjid yang rindang menjadi tempat ngabuburit saat Ramadan. Tersedia perpustakaan Islam mini.',
'cat-masjid', 'Jl. Raya Jatibarang No. 1, Jatibarang', 'Jatibarang', 'Indramayu',
NULL, NULL, NULL, NULL,
'Murah', 0, 0,
ARRAY['masjid','bersejarah','kolonial','1920','Jatibarang','jumat'], false, true, false, 4.7, 234,
-6.4720, 108.2350, 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=400&fit=crop',
'{"senin":{"open":"04:00","close":"21:00","closed":false},"selasa":{"open":"04:00","close":"21:00","closed":false},"rabu":{"open":"04:00","close":"21:00","closed":false},"kamis":{"open":"04:00","close":"21:00","closed":false},"jumat":{"open":"04:00","close":"21:00","closed":false},"sabtu":{"open":"04:00","close":"21:00","closed":false},"minggu":{"open":"04:00","close":"21:00","closed":false}}'::jsonb),

('Masjid At-Taqwa Haurgeulis', 'masjid-at-taqwa-haurgeulis',
'Masjid raya Kecamatan Haurgeulis dengan arsitektur modern minimalis. Kapasitas 2.000 jamaah. AC sentral membuat nyaman beribadah. Tersedia kelas mengaji anak-anak setiap sore. Sound system terbaik se-Indramayu utara. Tempat parkir sangat luas di area depan masjid.',
'cat-masjid', 'Jl. Raya Haurgeulis No. 45, Haurgeulis', 'Haurgeulis', 'Indramayu',
NULL, NULL, NULL, NULL,
'Murah', 0, 0,
ARRAY['masjid','modern','AC','mengaji','parkir luas'], false, true, false, 4.6, 156,
-6.4456, 108.0890, 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=400&fit=crop',
'{"senin":{"open":"04:00","close":"21:00","closed":false},"selasa":{"open":"04:00","close":"21:00","closed":false},"rabu":{"open":"04:00","close":"21:00","closed":false},"kamis":{"open":"04:00","close":"21:00","closed":false},"jumat":{"open":"04:00","close":"21:00","closed":false},"sabtu":{"open":"04:00","close":"21:00","closed":false},"minggu":{"open":"04:00","close":"21:00","closed":false}}'::jsonb),

-- ================================================
-- BELANJA
-- ================================================
('Pasar Baru Indramayu', 'pasar-baru-indramayu',
'Pasar tradisional terbesar di Indramayu. Lebih dari 500 pedagang menjual berbagai kebutuhan: sayur mayur segar, ikan laut, daging, buah-buahan, pakaian, alat pertanian, dan oleh-oleh khas. Pusat kuliner jajanan pasar tersedia di area food court. Buka dari subuh hingga siang. Harga murah dan bisa tawar!',
'cat-belanja', 'Jl. Pahlawan No. 1, Indramayu', 'Indramayu', 'Indramayu',
'0234-271789', NULL, NULL, NULL,
'Murah', 5000, 500000,
ARRAY['pasar','tradisional','sayur','ikan','daging','oleh-oleh','murah'], true, true, false, 4.2, 678,
-6.3272, 108.3198, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop',
'{"senin":{"open":"04:00","close":"14:00","closed":false},"selasa":{"open":"04:00","close":"14:00","closed":false},"rabu":{"open":"04:00","close":"14:00","closed":false},"kamis":{"open":"04:00","close":"14:00","closed":false},"jumat":{"open":"04:00","close":"14:00","closed":false},"sabtu":{"open":"04:00","close":"15:00","closed":false},"minggu":{"open":"04:00","close":"14:00","closed":false}}'::jsonb),

('Toko Oleh-Oleh Mangga Harum', 'toko-oleh-oleh-mangga-harum',
'Toko oleh-oleh khas Indramayu terlengkap. Aneka produk olahan mangga: dodol mangga, manisan mangga, sirup mangga, keripik mangga, dan selai mangga. Juga tersedia terasi khas Indramayu, ikan asin premium, krupuk kulit, dan batik tulis Indramayu. Harga produsen, bisa beli grosir. Kemasan cantik siap dijadikan buah tangan.',
'cat-belanja', 'Jl. Raya Sukra No. 123, Sukra', 'Sukra', 'Indramayu',
NULL, '6281567890123', NULL, 'oleholahmangga',
'Murah', 15000, 250000,
ARRAY['oleh-oleh','mangga','dodol','terasi','ikan asin','batik','krupuk'], true, true, true, 4.5, 345,
-6.2156, 108.2567, 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop',
'{"senin":{"open":"07:00","close":"20:00","closed":false},"selasa":{"open":"07:00","close":"20:00","closed":false},"rabu":{"open":"07:00","close":"20:00","closed":false},"kamis":{"open":"07:00","close":"20:00","closed":false},"jumat":{"open":"07:00","close":"20:00","closed":false},"sabtu":{"open":"07:00","close":"21:00","closed":false},"minggu":{"open":"08:00","close":"20:00","closed":false}}'::jsonb),

('Mall Indramayu Plaza', 'mall-indramayu-plaza',
'Pusat perbelanjaan modern pertama di Indramayu. 3 lantai dengan anchor tenant supermarket, fashion brand lokal dan nasional, food court 30+ tenant, bioskop, dan area bermain anak. Parkir motor dan mobil luas. AC sejuk. Event dan promo menarik setiap weekend. Tempat nongkrong favorit anak muda Indramayu.',
'cat-belanja', 'Jl. Sudirman No. 200, Indramayu', 'Indramayu', 'Indramayu',
'0234-285000', '6281678901234', NULL, 'indramayuplaza',
'Sedang', 10000, 1000000,
ARRAY['mall','belanja','bioskop','food court','fashion','modern'], true, true, true, 4.1, 512,
-6.3310, 108.3240, 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=400&fit=crop',
'{"senin":{"open":"10:00","close":"21:00","closed":false},"selasa":{"open":"10:00","close":"21:00","closed":false},"rabu":{"open":"10:00","close":"21:00","closed":false},"kamis":{"open":"10:00","close":"21:00","closed":false},"jumat":{"open":"10:00","close":"22:00","closed":false},"sabtu":{"open":"09:00","close":"22:00","closed":false},"minggu":{"open":"09:00","close":"22:00","closed":false}}'::jsonb),

-- ================================================
-- JASA
-- ================================================
('Bengkel Motor Pak Agus', 'bengkel-motor-pak-agus',
'Bengkel motor terpercaya dengan pengalaman 20 tahun. Spesialis motor Yamaha, Honda, dan Suzuki. Teknisi bersertifikat resmi. Servis ringan, ganti oli, tune up, overhaul mesin, las body, dan cat. Spare part original dan KW super tersedia. Harga transparan, gratis konsultasi. Tunggu atau ambil-antar.',
'cat-jasa', 'Jl. Ahmad Yani No. 88, Indramayu', 'Indramayu', 'Indramayu',
NULL, '6281789012345', NULL, NULL,
'Murah', 25000, 500000,
ARRAY['bengkel','motor','yamaha','honda','servis','oli','tune up'], false, true, true, 4.4, 234,
-6.3295, 108.3205, 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=400&fit=crop',
'{"senin":{"open":"08:00","close":"17:00","closed":false},"selasa":{"open":"08:00","close":"17:00","closed":false},"rabu":{"open":"08:00","close":"17:00","closed":false},"kamis":{"open":"08:00","close":"17:00","closed":false},"jumat":{"open":"08:00","close":"16:00","closed":false},"sabtu":{"open":"08:00","close":"16:00","closed":false},"minggu":{"closed":true}}'::jsonb),

('Tukang Listrik Bang Udin', 'tukang-listrik-bang-udin',
'Jasa instalasi listrik, perbaikan MCB, ganti saklar dan stop kontak, pasang lampu, dan instalasi panel listrik. Berpengalaman 15 tahun, sudah mengerjakan 500+ rumah dan gedung di Indramayu. Garansi pekerjaan 1 tahun. Tersedia panggilan darurat 24 jam untuk konsleting atau mati listrik.',
'cat-jasa', 'Jl. Veteran No. 34, Indramayu', 'Indramayu', 'Indramayu',
NULL, '6282890123456', NULL, NULL,
'Sedang', 50000, 2000000,
ARRAY['listrik','instalasi','MCB','panel','konsleting','24 jam','darurat'], false, true, false, 4.6, 178,
-6.3285, 108.3215, 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=400&fit=crop',
'{"senin":{"open":"07:00","close":"19:00","closed":false},"selasa":{"open":"07:00","close":"19:00","closed":false},"rabu":{"open":"07:00","close":"19:00","closed":false},"kamis":{"open":"07:00","close":"19:00","closed":false},"jumat":{"open":"07:00","close":"17:00","closed":false},"sabtu":{"open":"07:00","close":"18:00","closed":false},"minggu":{"open":"08:00","close":"14:00","closed":false}}'::jsonb),

('Tukang Bangunan H. Sobari', 'tukang-bangunan-h-sobari',
'Kontraktor dan tukang bangunan berpengalaman 25 tahun. Jasa: bangun rumah baru, renovasi, pasang keramik, plester, cat dinding, dan gypsum. Tim 10 orang siap mengerjakan proyek skala kecil hingga besar. Konsultasi desain gratis. Sudah mengerjakan 200+ proyek di seluruh Indramayu. Harga bersaing, kualitas terjamin.',
'cat-jasa', 'Jl. Diponegoro No. 78, Indramayu', 'Indramayu', 'Indramayu',
NULL, '6283901234567', NULL, NULL,
'Sedang', 100000, 100000000,
ARRAY['bangunan','kontraktor','renovasi','keramik','cat','gypsum'], false, true, false, 4.5, 145,
-6.3305, 108.3195, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=400&fit=crop',
'{"senin":{"open":"07:00","close":"17:00","closed":false},"selasa":{"open":"07:00","close":"17:00","closed":false},"rabu":{"open":"07:00","close":"17:00","closed":false},"kamis":{"open":"07:00","close":"17:00","closed":false},"jumat":{"open":"07:00","close":"17:00","closed":false},"sabtu":{"open":"07:00","close":"15:00","closed":false},"minggu":{"closed":true}}'::jsonb),

-- ================================================
-- KESEHATAN
-- ================================================
('Apotek Kimia Farma Indramayu', 'apotek-kimia-farma-indramayu',
'Apotek resmi Kimia Farma dengan koleksi obat terlengkap di Indramayu. Tersedia obat bebas, obat keras dengan resep dokter, vitamin, suplemen, alat kesehatan, dan produk bayi. Apoteker terlatih siap memberikan konsultasi obat. Program loyalty card untuk pelanggan setia. Harga sesuai HET nasional.',
'cat-kesehatan', 'Jl. Sudirman No. 45, Indramayu', 'Indramayu', 'Indramayu',
'0234-271345', '6284012345678', 'https://kimiafarma.co.id', NULL,
'Sedang', 5000, 500000,
ARRAY['apotek','kimia farma','obat','vitamin','alat kesehatan','resep'], true, true, true, 4.4, 345,
-6.3300, 108.3210, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=400&fit=crop',
'{"senin":{"open":"07:00","close":"21:00","closed":false},"selasa":{"open":"07:00","close":"21:00","closed":false},"rabu":{"open":"07:00","close":"21:00","closed":false},"kamis":{"open":"07:00","close":"21:00","closed":false},"jumat":{"open":"07:00","close":"21:00","closed":false},"sabtu":{"open":"07:00","close":"21:00","closed":false},"minggu":{"open":"08:00","close":"20:00","closed":false}}'::jsonb),

('Klinik Pratama Sehat Bersama', 'klinik-pratama-sehat-bersama',
'Klinik kesehatan umum dan spesialis dengan 5 dokter berpengalaman. Layanan: pemeriksaan umum, imunisasi anak, KB, pemeriksaan ibu hamil, dan cek laboratorium. Menerima BPJS Kesehatan dan asuransi swasta. Antrian online via WhatsApp. Dokter spesialis anak setiap Selasa dan Kamis. Apotek in-house tersedia.',
'cat-kesehatan', 'Jl. Veteran No. 23, Indramayu', 'Indramayu', 'Indramayu',
'0234-272678', '6285123456789', NULL, 'kliniksehatbersama',
'Sedang', 50000, 300000,
ARRAY['klinik','dokter','BPJS','imunisasi','laboratorium','spesialis anak'], true, true, true, 4.5, 289,
-6.3285, 108.3200, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop',
'{"senin":{"open":"07:00","close":"20:00","closed":false},"selasa":{"open":"07:00","close":"20:00","closed":false},"rabu":{"open":"07:00","close":"20:00","closed":false},"kamis":{"open":"07:00","close":"20:00","closed":false},"jumat":{"open":"07:00","close":"20:00","closed":false},"sabtu":{"open":"07:00","close":"17:00","closed":false},"minggu":{"open":"08:00","close":"14:00","closed":false}}'::jsonb),

('RSUD dr. Soewondo Indramayu', 'rsud-indramayu',
'Rumah sakit umum daerah terbesar di Kabupaten Indramayu. Fasilitas lengkap: IGD 24 jam, ICU, NICU, ruang operasi, laboratorium canggih, radiologi, dan fisioterapi. 200+ tempat tidur. Dokter spesialis dari berbagai bidang. Menerima semua jenis asuransi termasuk BPJS kelas 1, 2, dan 3. Ambulans 24 jam.',
'cat-kesehatan', 'Jl. Imam Bonjol No. 1, Indramayu', 'Indramayu', 'Indramayu',
'0234-272005', '6286234567890', 'https://rsudindramayu.go.id', NULL,
'Sedang', 0, 5000000,
ARRAY['rumah sakit','IGD','ICU','BPJS','spesialis','ambulans','24 jam'], true, true, true, 4.0, 678,
-6.3280, 108.3225, 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=400&fit=crop',
'{"senin":{"open":"00:00","close":"23:59","closed":false},"selasa":{"open":"00:00","close":"23:59","closed":false},"rabu":{"open":"00:00","close":"23:59","closed":false},"kamis":{"open":"00:00","close":"23:59","closed":false},"jumat":{"open":"00:00","close":"23:59","closed":false},"sabtu":{"open":"00:00","close":"23:59","closed":false},"minggu":{"open":"00:00","close":"23:59","closed":false}}'::jsonb),

-- ================================================
-- PENDIDIKAN
-- ================================================
('SMAN 1 Indramayu', 'sman-1-indramayu',
'SMA Negeri terbaik dan tertua di Indramayu, berdiri sejak 1965. Akreditasi A. Prestasi membanggakan: juara olimpiade sains provinsi, alumni masuk PTN favorit setiap tahun. Fasilitas: laboratorium lengkap, perpustakaan digital, lapangan olahraga, masjid sekolah, dan kantin sehat. Program unggulan MIPA dan IPS.',
'cat-pendidikan', 'Jl. Dr. Wahidin No. 37, Indramayu', 'Indramayu', 'Indramayu',
'0234-271140', NULL, 'https://sman1indramayu.sch.id', NULL,
'Murah', 0, 500000,
ARRAY['SMA','sekolah negeri','akreditasi A','olimpiade','PTN','prestasi'], false, true, true, 4.6, 234,
-6.3275, 108.3185, 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop',
'{"senin":{"open":"06:30","close":"15:30","closed":false},"selasa":{"open":"06:30","close":"15:30","closed":false},"rabu":{"open":"06:30","close":"15:30","closed":false},"kamis":{"open":"06:30","close":"15:30","closed":false},"jumat":{"open":"06:30","close":"11:30","closed":false},"sabtu":{"open":"06:30","close":"12:00","closed":false},"minggu":{"closed":true}}'::jsonb),

('Bimbel Ganesha Operation Indramayu', 'bimbel-ganesha-indramayu',
'Bimbingan belajar terkemuka dengan metode pembelajaran aktif dan teruji. Persiapan UN, UTBK/SNBT, dan olimpiade. Pengajar berpengalaman dan berdedikasi. Kelas kecil maksimal 15 siswa untuk pembelajaran optimal. Tersedia kelas reguler, intensif, dan privat. Garansi nilai meningkat atau belajar gratis!',
'cat-pendidikan', 'Jl. Sudirman No. 67, Indramayu', 'Indramayu', 'Indramayu',
'0234-282000', '6287345678901', 'https://ganesha.co.id', NULL,
'Sedang', 200000, 600000,
ARRAY['bimbel','les','UTBK','UN','olimpiade','privat','SD SMP SMA'], false, true, true, 4.5, 167,
-6.3308, 108.3230, 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop',
'{"senin":{"open":"13:00","close":"20:00","closed":false},"selasa":{"open":"13:00","close":"20:00","closed":false},"rabu":{"open":"13:00","close":"20:00","closed":false},"kamis":{"open":"13:00","close":"20:00","closed":false},"jumat":{"open":"14:00","close":"20:00","closed":false},"sabtu":{"open":"08:00","close":"17:00","closed":false},"minggu":{"closed":true}}'::jsonb);

-- ================================================
-- Update place_count per category
-- ================================================
UPDATE public.categories c
SET place_count = (
  SELECT COUNT(*) FROM public.places p WHERE p.category_id = c.id AND p.is_active = true
);

-- ================================================
-- SAMPLE REVIEWS (buat beberapa tempat unggulan)
-- ================================================
-- Note: reviews membutuhkan user_id yang valid dari tabel profiles
-- Jalankan bagian ini hanya jika sudah ada user terdaftar
-- Atau bisa skip dulu, reviews akan muncul saat user mulai menambahkan

SELECT 'Seed data berhasil dimasukkan! Total places: ' || COUNT(*) as result FROM public.places;
