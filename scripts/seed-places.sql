-- ================================================
-- SEED DATA LENGKAP - 80+ Tempat di Indramayu
-- Paste di Supabase SQL Editor → Run
-- ================================================

-- Hapus data lama dulu
DELETE FROM public.places;

-- ================================================
-- KULINER (25 tempat)
-- ================================================
INSERT INTO public.places (name, slug, description, category_id, address, kecamatan, phone, price_range, tags, is_featured, rating, review_count, latitude, longitude) VALUES

('Warung Nasi Lengko Bu Imas', 'warung-nasi-lengko-bu-imas',
'Nasi Lengko legendaris sejak 1985. Tahu, tempe, mentimun, tauge, bumbu kacang khas Indramayu. Wajib coba!',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Siliwangi No. 45, Indramayu', 'Indramayu', '0234-271234', 'Murah',
ARRAY['nasi lengko','makanan khas','sarapan','legendaris'], true, 4.8, 312, -6.3276, 108.3215),

('RM Seafood Karangsong', 'rm-seafood-karangsong',
'Seafood segar langsung dari nelayan. Ikan bakar, udang goreng, kepiting soka, cumi. View pantai indah.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Budi Dharma No. 12, Karangsong', 'Indramayu', '0234-272345', 'Sedang',
ARRAY['seafood','ikan bakar','kepiting','udang','pantai'], true, 4.6, 245, -6.3150, 108.3456),

('Warung Pedesan Ayam Bu Sari', 'warung-pedesan-ayam-bu-sari',
'Pedesan Ayam khas Indramayu. Bumbu kluwek hitam pekat, pedas nampol, ayam kampung empuk. Porsi jumbo!',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Veteran No. 67, Losarang', 'Losarang', '087834567890', 'Murah',
ARRAY['pedesan','ayam','pedas','kluwek','khas indramayu'], true, 4.9, 421, -6.2834, 108.1234),

('Depot Empal Gentong H. Apud', 'depot-empal-gentong-h-apud',
'Empal gentong kuah santan rempah. Daging sapi, babat, kikil empuk. Sudah berdiri 25 tahun.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. DI Panjaitan No. 33, Indramayu', 'Indramayu', '0234-273456', 'Sedang',
ARRAY['empal gentong','sapi','babat','santan','rempah'], false, 4.5, 178, -6.3300, 108.3180),

('Mie Kocok Pak Darto', 'mie-kocok-pak-darto',
'Mie kocok kuah kaldu sapi gurih kental, kikil empuk, tauge segar. 30 tahun melayani warga Indramayu.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Gatot Subroto No. 88, Indramayu', 'Indramayu', '085712345678', 'Murah',
ARRAY['mie kocok','kikil','kaldu sapi','legendaris'], false, 4.6, 203, -6.3290, 108.3200),

('Sate Kambing Pak Haji Saman', 'sate-kambing-pak-haji-saman',
'Sate kambing muda empuk, tidak bau. Bumbu kecap khas Jawa. Grilled fresh setiap pesanan.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Sudirman No. 120, Indramayu', 'Indramayu', '081234567890', 'Sedang',
ARRAY['sate kambing','grilled','kecap','halal'], false, 4.4, 145, -6.3310, 108.3220),

('Warung Pindang Serani Bu Ratih', 'warung-pindang-serani-bu-ratih',
'Pindang Serani asam segar khas pesisir Indramayu. Ikan kakap, patin, atau nila. Cocok dimakan siang.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Diponegoro No. 55, Indramayu', 'Indramayu', '087612345678', 'Murah',
ARRAY['pindang serani','ikan','asam','khas pesisir'], true, 4.7, 289, -6.3250, 108.3190),

('Bakso Sapi Mas Budi', 'bakso-sapi-mas-budi',
'Bakso sapi kenyal, kuah bening gurih, pangsit crispy. Pilihan: bakso biasa, mercon, urat.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Ahmad Yani No. 34, Jatibarang', 'Jatibarang', '082345678901', 'Murah',
ARRAY['bakso','sapi','pangsit','mercon'], false, 4.3, 167, -6.4713, 108.2345),

('Nasi Jamblang Khas Indramayu', 'nasi-jamblang-khas-indramayu',
'Nasi jamblang dibungkus daun jati. Lauk pilihan: tahu, tempe, paru, sambal terasi. Otentik!',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Pahlawan No. 22, Indramayu', 'Indramayu', NULL, 'Murah',
ARRAY['nasi jamblang','daun jati','paru','sambal'], false, 4.4, 134, -6.3260, 108.3205),

('Restoran Terapung Pantai Boom', 'restoran-terapung-pantai-boom',
'Restoran di atas air, view laut lepas. Menu andalan: udang bakar, ikan gurame, kepiting rebus.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Pantai Boom, Indramayu', 'Indramayu', '0234-281234', 'Mahal',
ARRAY['terapung','view laut','udang','gurame','romantis'], true, 4.5, 198, -6.3100, 108.3400),

('Kopi Tukang Indramayu', 'kopi-tukang-indramayu',
'Kafe kopi specialty lokal. Single origin kopi Jawa. Tersedia snack tradisional dan wifi kencang.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Veteran No. 10, Indramayu', 'Indramayu', '089012345678', 'Sedang',
ARRAY['kopi','cafe','wifi','specialty','kopi jawa'], false, 4.5, 156, -6.3280, 108.3210),

('Soto Ayam Kampung Pak Tono', 'soto-ayam-kampung-pak-tono',
'Soto ayam kampung kuah bening kunyit. Telur, koya gurih, sambal rawit. Sarapan favorit warga.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Pasar Baru Indramayu, Los A No. 5', 'Indramayu', NULL, 'Murah',
ARRAY['soto ayam','kampung','kunyit','sarapan'], false, 4.3, 98, -6.3285, 108.3195),

('Warung Bubur Ayam Jl. Sudirman', 'warung-bubur-ayam-sudirman',
'Bubur ayam komplit: cakwe, kacang, bawang goreng, suwiran ayam. Buka pagi jam 05.00.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Sudirman No. 45, Indramayu', 'Indramayu', NULL, 'Murah',
ARRAY['bubur ayam','sarapan','pagi','cakwe'], false, 4.2, 87, -6.3270, 108.3215),

('RM Padang Sari Bundo', 'rm-padang-sari-bundo',
'Masakan Padang lengkap. Rendang, ayam pop, gulai, dendeng balado. Nasi putih pulen.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Gatot Subroto No. 55, Indramayu', 'Indramayu', '0234-274321', 'Sedang',
ARRAY['padang','rendang','gulai','ayam pop'], false, 4.1, 76, -6.3295, 108.3205),

('Kedai Es Puter Mang Acep', 'kedai-es-puter-mang-acep',
'Es puter tradisional putar tangan. Rasa durian, kelapa muda, coklat. Segar di siang hari panas.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Alun-alun Indramayu', 'Indramayu', NULL, 'Murah',
ARRAY['es puter','tradisional','durian','kelapa muda','segar'], false, 4.6, 234, -6.3278, 108.3212),

('Warung Gado-gado Bu Neneng', 'warung-gado-gado-bu-neneng',
'Gado-gado saus kacang segar diulek. Sayuran rebus, lontong, kerupuk. Vegetarian friendly.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Cipto No. 18, Indramayu', 'Indramayu', NULL, 'Murah',
ARRAY['gado-gado','vegetarian','kacang','sayuran'], false, 4.3, 112, -6.3282, 108.3218),

('Bebek Goreng H. Slamet', 'bebek-goreng-h-slamet',
'Bebek goreng kering renyah, empuk dalam. Sambal hijau/merah pedas. Lalapan segar komplit.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Raya Jatibarang No. 88', 'Jatibarang', '081345678901', 'Sedang',
ARRAY['bebek goreng','renyah','sambal','lalapan'], false, 4.4, 143, -6.4720, 108.2350),

('Warung Kopi Dermayu', 'warung-kopi-dermayu',
'Kopi tubruk, kopi susu kental manis, teh tarik. Cemilan: pisang goreng, risol, lemper.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Siliwangi No. 10, Indramayu', 'Indramayu', NULL, 'Murah',
ARRAY['kopi tubruk','kopi susu','pisang goreng','nongkrong'], false, 4.2, 89, -6.3268, 108.3208),

('RM Ikan Bakar Juntinyuat', 'rm-ikan-bakar-juntinyuat',
'Ikan bakar segar langsung dari TPI Juntinyuat. Pilihan: kakap, kerapu, bawal, tenggiri.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Raya Juntinyuat No. 12', 'Juntinyuat', '082456789012', 'Sedang',
ARRAY['ikan bakar','segar','kakap','kerapu','TPI'], true, 4.7, 267, -6.3641, 108.4012),

('Martabak Manis Surabaya Pak Eko', 'martabak-manis-pak-eko',
'Martabak manis tebal, lembut. Isi: keju, coklat, kacang, green tea, red velvet. Buka sore.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Sudirman (depan BRI), Indramayu', 'Indramayu', NULL, 'Sedang',
ARRAY['martabak','manis','keju','coklat','jajanan'], false, 4.4, 156, -6.3305, 108.3225),

('Nasi Goreng Bang Jali', 'nasi-goreng-bang-jali',
'Nasi goreng kampung, special seafood, pete. Buka 24 jam. Porsi besar, harga bersahabat.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Ahmad Yani, Indramayu', 'Indramayu', '083456789012', 'Murah',
ARRAY['nasi goreng','24 jam','seafood','pete'], false, 4.3, 198, -6.3288, 108.3198),

('Warung Kupat Tahu Indramayu', 'warung-kupat-tahu-indramayu',
'Kupat tahu khas Indramayu, saus kacang manis pedas. Tambah lontong, bihun. Sarapan mantap!',
(SELECT id FROM categories WHERE slug='kuliner'),
'Pasar Mambo, Indramayu', 'Indramayu', NULL, 'Murah',
ARRAY['kupat tahu','kacang','sarapan','lontong'], false, 4.4, 134, -6.3272, 108.3202),

('Seafood Balong Endah', 'seafood-balong-endah',
'Kolam pancing sekaligus restoran. Ikan gurame, lele, nila, mas. Dimasak sesuai selera.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Desa Balong, Indramayu', 'Indramayu', '084567890123', 'Sedang',
ARRAY['kolam pancing','gurame','lele','segar','keluarga'], false, 4.5, 178, -6.3400, 108.3100),

('Es Dawet Ayu Mang Ipin', 'es-dawet-ayu-mang-ipin',
'Es dawet ayu segar, cendol hijau, santan gurih, gula merah. Minuman tradisional segar.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Alun-alun Haurgeulis', 'Haurgeulis', NULL, 'Murah',
ARRAY['es dawet','cendol','santan','tradisional','segar'], false, 4.3, 89, -6.3513, 108.0234),

('Warung Nasi Uduk Bu Yayah', 'warung-nasi-uduk-bu-yayah',
'Nasi uduk gurih, lauk: ayam goreng, tempe orek, sambal kacang. Sarapan pagi Indramayu.',
(SELECT id FROM categories WHERE slug='kuliner'),
'Jl. Karang Anyar No. 5, Indramayu', 'Indramayu', NULL, 'Murah',
ARRAY['nasi uduk','ayam goreng','tempe','sambal'], false, 4.2, 76, -6.3265, 108.3195);

-- ================================================
-- WISATA (15 tempat)
-- ================================================
INSERT INTO public.places (name, slug, description, category_id, address, kecamatan, phone, price_range, tags, is_featured, rating, review_count, latitude, longitude) VALUES

('Pantai Karangsong', 'pantai-karangsong',
'Hutan mangrove terluas di Jabar. Habitat burung bangau ribuan ekor. Perahu wisata sungai mangrove.',
(SELECT id FROM categories WHERE slug='wisata'),
'Desa Karangsong, Indramayu', 'Indramayu', '0234-274567', 'Murah',
ARRAY['pantai','mangrove','burung','alam','fotografi'], true, 4.7, 456, -6.3050, 108.3500),

('Pantai Tirtamaya', 'pantai-tirtamaya',
'Wisata pantai terpopuler Indramayu. Wahana air, kolam renang, penginapan, kuliner. Ramai weekend.',
(SELECT id FROM categories WHERE slug='wisata'),
'Desa Juntinyuat, Juntinyuat', 'Juntinyuat', '0234-351234', 'Sedang',
ARRAY['pantai','wahana air','kolam renang','keluarga','liburan'], true, 4.4, 567, -6.3600, 108.4100),

('Pantai Glayem', 'pantai-glayem',
'Pasir putih bersih. Ombak tenang cocok berenang. Sunset indah, warung seafood segar sepanjang pantai.',
(SELECT id FROM categories WHERE slug='wisata'),
'Desa Juntinyuat, Juntinyuat', 'Juntinyuat', NULL, 'Murah',
ARRAY['pantai','pasir putih','berenang','sunset','seafood'], true, 4.5, 334, -6.3580, 108.4050),

('Pantai Balongan', 'pantai-balongan',
'Pantai dengan view kilang minyak Pertamina Balongan. Unik dan instagramable. Sunrise terbaik.',
(SELECT id FROM categories WHERE slug='wisata'),
'Desa Balongan, Balongan', 'Balongan', NULL, 'Murah',
ARRAY['pantai','pertamina','sunrise','instagramable','unik'], false, 4.3, 189, -6.2734, 108.3456),

('Situ Bojongsari', 'situ-bojongsari',
'Danau buatan seluas 5 ha. Memancing, gazebo, perahu bebek. Camping area tersedia. Keluarga.',
(SELECT id FROM categories WHERE slug='wisata'),
'Desa Bojongsari, Kertasemaya', 'Kertasemaya', NULL, 'Murah',
ARRAY['danau','memancing','camping','perahu','keluarga'], false, 4.2, 134, -6.5012, 108.2834),

('Waduk Cipancuh', 'waduk-cipancuh',
'Waduk irigasi terbesar Indramayu. Spot memancing, olahraga air, foto dengan latar waduk luas.',
(SELECT id FROM categories WHERE slug='wisata'),
'Desa Cipancuh, Haurgeulis', 'Haurgeulis', NULL, 'Murah',
ARRAY['waduk','memancing','olahraga air','alam','foto'], false, 4.1, 98, -6.3600, 108.0100),

('Hutan Mangrove Pantai Dadap', 'hutan-mangrove-pantai-dadap',
'Ekowisata mangrove dengan jembatan kayu. Habitat kepiting, ikan, burung. Edukasi lingkungan.',
(SELECT id FROM categories WHERE slug='wisata'),
'Desa Dadap, Juntinyuat', 'Juntinyuat', NULL, 'Murah',
ARRAY['mangrove','ekowisata','kepiting','edukasi','jembatan kayu'], false, 4.4, 156, -6.3700, 108.4200),

('Makam Buyut Wirakrama', 'makam-buyut-wirakrama',
'Wisata religi bersejarah. Makam leluhur Indramayu abad ke-15. Ramai peziarah setiap malam Jumat.',
(SELECT id FROM categories WHERE slug='wisata'),
'Desa Dermayu, Sindang', 'Sindang', NULL, 'Murah',
ARRAY['wisata religi','ziarah','bersejarah','makam','leluhur'], false, 4.0, 78, -6.3100, 108.3050),

('Islamic Center Indramayu', 'islamic-center-indramayu',
'Kompleks masjid megah dengan menara tinggi. Arsitektur Islamic modern. Landmark kota Indramayu.',
(SELECT id FROM categories WHERE slug='wisata'),
'Jl. Raya Indramayu-Cirebon', 'Indramayu', NULL, 'Murah',
ARRAY['masjid','islamic center','arsitektur','landmark','wisata religi'], true, 4.6, 234, -6.3400, 108.3300),

('Pantai Eretan Wetan', 'pantai-eretan-wetan',
'Kampung nelayan tradisional. Lelang ikan TPI pagi hari. Kuliner seafood segar murah meriah.',
(SELECT id FROM categories WHERE slug='wisata'),
'Desa Eretan Wetan, Kandanghaur', 'Kandanghaur', NULL, 'Murah',
ARRAY['nelayan','TPI','lelang ikan','seafood','tradisional'], false, 4.3, 145, -6.2100, 108.0600),

('Monumen Perjuangan Indramayu', 'monumen-perjuangan-indramayu',
'Monumen bersejarah perjuangan rakyat Indramayu. Museum mini, taman rekreasi. Gratis masuk.',
(SELECT id FROM categories WHERE slug='wisata'),
'Jl. Letjend Suprapto, Indramayu', 'Indramayu', NULL, 'Murah',
ARRAY['sejarah','monumen','museum','gratis','edukasi'], false, 4.0, 67, -6.3320, 108.3230),

('Bukit Keling Haurgeulis', 'bukit-keling-haurgeulis',
'Perbukitan hijau di selatan Indramayu. Trekking ringan, view sawah luas, udara segar.',
(SELECT id FROM categories WHERE slug='wisata'),
'Desa Keling, Haurgeulis', 'Haurgeulis', NULL, 'Murah',
ARRAY['bukit','trekking','sawah','udara segar','alam'], false, 4.2, 89, -6.4000, 108.0000),

('Pantai Karang Song Mangrove Boardwalk', 'mangrove-boardwalk-karangsong',
'Jembatan kayu panjang di atas mangrove. Spot foto kece, sunset view, fauna laut.',
(SELECT id FROM categories WHERE slug='wisata'),
'Karangsong, Indramayu', 'Indramayu', NULL, 'Murah',
ARRAY['boardwalk','mangrove','foto','sunset','fauna laut'], true, 4.8, 345, -6.3030, 108.3520),

('Gedung Negara Indramayu', 'gedung-negara-indramayu',
'Bangunan kolonial Belanda bersejarah. Arsitektur kuno yang terawat. Spot foto vintage.',
(SELECT id FROM categories WHERE slug='wisata'),
'Jl. Sudirman, Indramayu', 'Indramayu', NULL, 'Murah',
ARRAY['kolonial','bersejarah','foto vintage','arsitektur','Belanda'], false, 3.9, 56, -6.3308, 108.3218),

('Pantai Plentong', 'pantai-plentong',
'Pantai tenang dan sepi, cocok untuk piknik keluarga. Ikan segar dari nelayan langsung.',
(SELECT id FROM categories WHERE slug='wisata'),
'Desa Plentong, Losarang', 'Losarang', NULL, 'Murah',
ARRAY['pantai','sepi','piknik','nelayan','ikan segar'], false, 4.1, 78, -6.2700, 108.1100);

-- ================================================
-- HOTEL & PENGINAPAN (10 tempat)
-- ================================================
INSERT INTO public.places (name, slug, description, category_id, address, kecamatan, phone, price_range, tags, is_featured, rating, review_count, latitude, longitude) VALUES

('Trisula Hotel Indramayu', 'trisula-hotel-indramayu',
'Hotel bintang 3 terbaik Indramayu. Kolam renang outdoor, restoran, ballroom, WiFi. Pusat kota.',
(SELECT id FROM categories WHERE slug='hotel'),
'Jl. Sudirman No. 1, Indramayu', 'Indramayu', '0234-272800', 'Mahal',
ARRAY['hotel','bintang 3','kolam renang','ballroom','pusat kota'], true, 4.5, 312, -6.3315, 108.3225),

('Aston Indramayu', 'aston-indramayu',
'Hotel modern jaringan Aston. Kamar luas, AC, TV LED, breakfast. Business center, parkir luas.',
(SELECT id FROM categories WHERE slug='hotel'),
'Jl. Raya Indramayu-Cirebon Km 2', 'Indramayu', '0234-281000', 'Mahal',
ARRAY['hotel','aston','modern','breakfast','business'], true, 4.4, 234, -6.3380, 108.3280),

('Hotel Mutiara Indramayu', 'hotel-mutiara-indramayu',
'Hotel nyaman tengah kota. Kamar standar hingga deluxe. AC, hot water, TV. Harga terjangkau.',
(SELECT id FROM categories WHERE slug='hotel'),
'Jl. Veteran No. 100, Indramayu', 'Indramayu', '0234-273000', 'Sedang',
ARRAY['hotel','terjangkau','AC','hot water','pusat kota'], false, 4.0, 145, -6.3290, 108.3210),

('Penginapan Bahari Inn', 'penginapan-bahari-inn',
'Penginapan bersih dekat pantai. AC, TV, kamar mandi dalam. Cocok backpacker dan wisatawan.',
(SELECT id FROM categories WHERE slug='hotel'),
'Jl. Karangsong No. 23, Indramayu', 'Indramayu', '0234-273900', 'Sedang',
ARRAY['penginapan','dekat pantai','backpacker','bersih'], false, 4.1, 98, -6.3180, 108.3390),

('Villa Tirtamaya Beach', 'villa-tirtamaya-beach',
'Villa tepi pantai Tirtamaya. View laut dari kamar, private beach, BBQ area. Untuk keluarga.',
(SELECT id FROM categories WHERE slug='hotel'),
'Pantai Tirtamaya, Juntinyuat', 'Juntinyuat', '085678901234', 'Mahal',
ARRAY['villa','pantai','view laut','BBQ','keluarga'], true, 4.6, 178, -6.3610, 108.4120),

('Guest House Anggrek', 'guest-house-anggrek',
'Guest house bersih dan nyaman. Kamar mandi dalam, AC, sarapan tersedia. Area parkir luas.',
(SELECT id FROM categories WHERE slug='hotel'),
'Jl. Melati No. 15, Indramayu', 'Indramayu', '0234-274500', 'Murah',
ARRAY['guest house','sarapan','parkir','bersih','nyaman'], false, 3.9, 67, -6.3300, 108.3230),

('Hotel Jatibarang', 'hotel-jatibarang',
'Hotel di pusat kota Jatibarang. Fasilitas lengkap, meeting room, parkir motor & mobil.',
(SELECT id FROM categories WHERE slug='hotel'),
'Jl. Raya Jatibarang No. 45', 'Jatibarang', '0234-352000', 'Sedang',
ARRAY['hotel','jatibarang','meeting room','parkir'], false, 3.8, 56, -6.4718, 108.2348),

('Homestay Kampung Nelayan Eretan', 'homestay-eretan',
'Menginap di rumah nelayan. Pengalaman unik: ikut melaut, makan hasil tangkapan. Budget friendly.',
(SELECT id FROM categories WHERE slug='hotel'),
'Kampung Nelayan Eretan, Kandanghaur', 'Kandanghaur', '086789012345', 'Murah',
ARRAY['homestay','nelayan','melaut','unik','budget'], false, 4.3, 89, -6.2110, 108.0580),

('Hotel Haurgeulis', 'hotel-haurgeulis',
'Hotel transit jalur Pantura. Kamar bersih, parkir truk & bus. Dekat rest area dan SPBU.',
(SELECT id FROM categories WHERE slug='hotel'),
'Jl. Raya Pantura, Haurgeulis', 'Haurgeulis', '0234-380000', 'Murah',
ARRAY['hotel','pantura','transit','truk','bus'], false, 3.7, 78, -6.3510, 108.0240),

('Penginapan Syariah Al-Hikmah', 'penginapan-syariah-al-hikmah',
'Penginapan berbasis syariah. Kamar bersih, sholat tersedia, makanan halal. Dekat masjid.',
(SELECT id FROM categories WHERE slug='hotel'),
'Jl. K.H. Agus Salim, Indramayu', 'Indramayu', '087890123456', 'Murah',
ARRAY['syariah','halal','masjid','bersih','nyaman'], false, 4.2, 112, -6.3295, 108.3215);

-- ================================================
-- BELANJA (10 tempat)
-- ================================================
INSERT INTO public.places (name, slug, description, category_id, address, kecamatan, phone, price_range, tags, is_featured, rating, review_count) VALUES

('Pasar Baru Indramayu', 'pasar-baru-indramayu',
'Pasar tradisional terbesar. Sembako, batik, oleh-oleh khas, kuliner pasar. Buka subuh.',
(SELECT id FROM categories WHERE slug='belanja'),
'Jl. Pasar Baru, Indramayu', 'Indramayu', NULL, 'Murah',
ARRAY['pasar','sembako','batik','oleh-oleh','tradisional'], true, 4.2, 234),

('Toko Batik Paoman Indramayu', 'toko-batik-paoman',
'Batik khas Indramayu motif Paoman. Tulis, cap, printing. Bisa custom. Harga pabrik.',
(SELECT id FROM categories WHERE slug='belanja'),
'Jl. Paoman No. 15, Indramayu', 'Indramayu', '085612345678', 'Sedang',
ARRAY['batik','paoman','khas indramayu','tulis','cap'], true, 4.7, 189),

('Pusat Oleh-oleh Mangga Indramayu', 'pusat-oleh-oleh-mangga',
'Mangga gedong gincu, dodol mangga, sirup mangga, kerupuk, terasi. Oleh-oleh terlengkap.',
(SELECT id FROM categories WHERE slug='belanja'),
'Jl. Diponegoro No. 78, Indramayu', 'Indramayu', '0234-275678', 'Sedang',
ARRAY['oleh-oleh','mangga','gedong gincu','dodol','kerupuk'], true, 4.6, 312),

('Pasar Jatibarang', 'pasar-jatibarang',
'Pasar terbesar di Jatibarang. Sayur, buah, ikan segar, pakaian, elektronik. Ramai tiap hari.',
(SELECT id FROM categories WHERE slug='belanja'),
'Jl. Raya Jatibarang', 'Jatibarang', NULL, 'Murah',
ARRAY['pasar','sayur','buah','ikan','pakaian'], false, 4.0, 134),

('Galeri Batik Ciawi', 'galeri-batik-ciawi',
'Galeri batik Indramayu dengan koleksi lengkap. Batik motif ikan, padi, mangga. Pengiriman online.',
(SELECT id FROM categories WHERE slug='belanja'),
'Desa Ciawi, Indramayu', 'Indramayu', '088901234567', 'Sedang',
ARRAY['batik','galeri','motif ikan','mangga','online'], false, 4.4, 98),

('Toko Elektronik Mutiara', 'toko-elektronik-mutiara',
'Elektronik, HP, laptop, accessories. Garansi resmi. Service center. Cicilan 0%.',
(SELECT id FROM categories WHERE slug='belanja'),
'Jl. Ahmad Yani No. 50, Indramayu', 'Indramayu', '0234-276000', 'Sedang',
ARRAY['elektronik','HP','laptop','garansi','cicilan'], false, 4.1, 78),

('Pasar Haurgeulis', 'pasar-haurgeulis',
'Pusat perbelanjaan kawasan pantura barat. Grosir sembako, hasil bumi, pakaian.',
(SELECT id FROM categories WHERE slug='belanja'),
'Jl. Raya Haurgeulis', 'Haurgeulis', NULL, 'Murah',
ARRAY['pasar','grosir','sembako','pantura','barat'], false, 3.9, 67),

('Toko Kerupuk Ikan Indramayu', 'toko-kerupuk-ikan-indramayu',
'Kerupuk ikan tenggiri, udang, cumi langsung dari produsen. Harga grosir. Oleh-oleh khas.',
(SELECT id FROM categories WHERE slug='belanja'),
'Jl. Karangsong, Indramayu', 'Indramayu', '089012345679', 'Murah',
ARRAY['kerupuk ikan','tenggiri','udang','grosir','produsen'], false, 4.5, 145),

('Mini Market Alfa Indramayu', 'alfamart-indramayu-sudirman',
'Minimarket lengkap. Kebutuhan sehari-hari, ATM, bayar tagihan, 24 jam.',
(SELECT id FROM categories WHERE slug='belanja'),
'Jl. Sudirman No. 80, Indramayu', 'Indramayu', NULL, 'Sedang',
ARRAY['minimarket','24 jam','ATM','sembako','tagihan'], false, 4.0, 123),

('Toko Emas Bu Hajjah Mimin', 'toko-emas-bu-hajjah-mimin',
'Perhiasan emas 24K dan 22K. Kalung, gelang, cincin, anting. Buyback tersedia.',
(SELECT id FROM categories WHERE slug='belanja'),
'Jl. Pasar Baru No. 30, Indramayu', 'Indramayu', '0234-277000', 'Mahal',
ARRAY['emas','perhiasan','kalung','gelang','buyback'], false, 4.3, 89);

-- ================================================
-- KESEHATAN / APOTEK (8 tempat)
-- ================================================
INSERT INTO public.places (name, slug, description, category_id, address, kecamatan, phone, price_range, tags, is_featured, rating, review_count) VALUES

('RSUD Indramayu', 'rsud-indramayu',
'Rumah Sakit Umum Daerah terbesar Indramayu. IGD 24 jam, rawat inap, poli spesialis lengkap.',
(SELECT id FROM categories WHERE slug='kesehatan'),
'Jl. Kesehatan No. 1, Indramayu', 'Indramayu', '0234-271008', 'Sedang',
ARRAY['rumah sakit','IGD','rawat inap','spesialis','BPJS'], true, 3.8, 234),

('RS Bhayangkara Indramayu', 'rs-bhayangkara-indramayu',
'RS Polri, terbuka untuk umum. Poli umum, spesialis, IGD. BPJS diterima.',
(SELECT id FROM categories WHERE slug='kesehatan'),
'Jl. Budi Utomo, Indramayu', 'Indramayu', '0234-272500', 'Sedang',
ARRAY['rumah sakit','polri','BPJS','spesialis','IGD'], false, 3.9, 156),

('Apotek K-24 Indramayu', 'apotek-k24-indramayu',
'Apotek 24 jam. Obat generik dan paten. Konsultasi apoteker. Delivery available.',
(SELECT id FROM categories WHERE slug='kesehatan'),
'Jl. Sudirman No. 90, Indramayu', 'Indramayu', '0234-274000', 'Sedang',
ARRAY['apotek','24 jam','obat','konsultasi','delivery'], false, 4.2, 198),

('Puskesmas Kota Indramayu', 'puskesmas-kota-indramayu',
'Puskesmas terbaik kota Indramayu. Poli umum, KIA, gigi, imunisasi. BPJS gratis.',
(SELECT id FROM categories WHERE slug='kesehatan'),
'Jl. Pahlawan, Indramayu', 'Indramayu', '0234-271500', 'Murah',
ARRAY['puskesmas','BPJS','gratis','imunisasi','gigi'], false, 4.0, 145),

('Klinik Pratama Sehat Bersama', 'klinik-pratama-sehat-bersama',
'Klinik umum dan gigi. Praktek dokter setiap hari. Lab sederhana, obat lengkap.',
(SELECT id FROM categories WHERE slug='kesehatan'),
'Jl. Veteran No. 22, Indramayu', 'Indramayu', '0234-275000', 'Sedang',
ARRAY['klinik','dokter','gigi','lab','obat'], false, 4.1, 112),

('Apotek Kimia Farma Indramayu', 'apotek-kimia-farma-indramayu',
'Apotek resmi Kimia Farma. Obat keras, bebas, suplemen. Lab klinik tersedia.',
(SELECT id FROM categories WHERE slug='kesehatan'),
'Jl. Ahmad Yani No. 10, Indramayu', 'Indramayu', '0234-273500', 'Sedang',
ARRAY['apotek','kimia farma','lab klinik','suplemen','resmi'], false, 4.3, 167),

('Klinik Bersalin Ibu dan Anak', 'klinik-bersalin-ibu-anak',
'Spesialis kebidanan dan anak. Persalinan normal dan caesar. Konsultasi KB, imunisasi.',
(SELECT id FROM categories WHERE slug='kesehatan'),
'Jl. Cipto No. 30, Indramayu', 'Indramayu', '0234-276500', 'Sedang',
ARRAY['bersalin','kebidanan','anak','imunisasi','KB'], false, 4.4, 198),

('Apotek Jatibarang Sehat', 'apotek-jatibarang-sehat',
'Apotek lengkap di Jatibarang. Melayani resep dokter, obat bebas, vitamin anak.',
(SELECT id FROM categories WHERE slug='kesehatan'),
'Jl. Raya Jatibarang No. 20', 'Jatibarang', '0234-353000', 'Murah',
ARRAY['apotek','resep','vitamin','anak','Jatibarang'], false, 4.0, 89);

-- ================================================
-- OTOMOTIF (5 tempat)
-- ================================================
INSERT INTO public.places (name, slug, description, category_id, address, kecamatan, phone, price_range, tags, is_featured, rating, review_count) VALUES

('Bengkel Surya Motor', 'bengkel-surya-motor',
'Bengkel motor & mobil terpercaya. Tune up, ganti oli, service AC, ban. Teknisi berpengalaman.',
(SELECT id FROM categories WHERE slug='otomotif'),
'Jl. Sudirman No. 200, Indramayu', 'Indramayu', '0234-277777', 'Sedang',
ARRAY['bengkel','motor','mobil','service AC','oli'], false, 4.3, 178),

('Showroom Honda Indramayu', 'showroom-honda-indramayu',
'Dealer resmi Honda. Motor baru, bekas, kredit. Servis resmi, spare part original.',
(SELECT id FROM categories WHERE slug='otomotif'),
'Jl. Ahmad Yani No. 100, Indramayu', 'Indramayu', '0234-278000', 'Mahal',
ARRAY['honda','dealer resmi','kredit','servis','spare part'], false, 4.2, 145),

('Bengkel Las & Bubut Maju Jaya', 'bengkel-las-bubut-maju-jaya',
'Bengkel las listrik, karbit, argon. Bubut, frais, turning. Melayani industri dan rumahan.',
(SELECT id FROM categories WHERE slug='otomotif'),
'Jl. Industri No. 5, Indramayu', 'Indramayu', '085234567890', 'Sedang',
ARRAY['bengkel las','bubut','frais','industri','rumahan'], false, 4.1, 89),

('Cuci Mobil & Motor Star', 'cuci-mobil-motor-star',
'Cuci steam profesional. Salju, vacuum, poles, coating. Antri cepat, hasil bersih mengkilap.',
(SELECT id FROM categories WHERE slug='otomotif'),
'Jl. Cipto No. 88, Indramayu', 'Indramayu', '083678901234', 'Murah',
ARRAY['cuci mobil','steam','vacuum','poles','coating'], false, 4.4, 134),

('Rental Mobil Indramayu', 'rental-mobil-indramayu',
'Sewa mobil harian/mingguan. Avanza, Xenia, Innova, Hi-Ace. Lepas kunci atau dengan sopir.',
(SELECT id FROM categories WHERE slug='otomotif'),
'Jl. Veteran No. 55, Indramayu', 'Indramayu', '087234567890', 'Sedang',
ARRAY['rental','sewa mobil','avanza','innova','sopir'], false, 4.0, 112);

-- ================================================
-- KECANTIKAN (4 tempat)
-- ================================================
INSERT INTO public.places (name, slug, description, category_id, address, kecamatan, phone, price_range, tags, is_featured, rating, review_count) VALUES

('Salon Cantik Ibu Dewi', 'salon-cantik-ibu-dewi',
'Salon lengkap: potong rambut, keramas, creambath, rebonding, cat rambut, rias pengantin.',
(SELECT id FROM categories WHERE slug='kecantikan'),
'Jl. Siliwangi No. 80, Indramayu', 'Indramayu', '0234-279000', 'Sedang',
ARRAY['salon','rambut','rebonding','rias','pengantin'], false, 4.3, 145),

('Barbershop Kece Indramayu', 'barbershop-kece-indramayu',
'Barbershop modern. Potong, shave, facial, cuci rambut. Walk-in welcome. Barber profesional.',
(SELECT id FROM categories WHERE slug='kecantikan'),
'Jl. Diponegoro No. 90, Indramayu', 'Indramayu', '088123456789', 'Sedang',
ARRAY['barbershop','potong','shave','facial','modern'], false, 4.5, 198),

('Salon & Spa Permata', 'salon-spa-permata',
'Salon plus spa. Massage, lulur, facial, mani-pedi. Paket hemat tersedia. Booking required.',
(SELECT id FROM categories WHERE slug='kecantikan'),
'Jl. Veteran No. 33, Indramayu', 'Indramayu', '0234-280000', 'Sedang',
ARRAY['salon','spa','massage','lulur','facial'], false, 4.4, 167),

('Klinik Kecantikan Ayu', 'klinik-kecantikan-ayu',
'Klinik kecantikan medis. Perawatan kulit, laser, filler, botox. Dokter spesialis kulit.',
(SELECT id FROM categories WHERE slug='kecantikan'),
'Jl. Sudirman No. 50, Indramayu', 'Indramayu', '0234-281500', 'Mahal',
ARRAY['klinik kecantikan','laser','filler','dokter','kulit'], false, 4.2, 89);

-- ================================================
-- PERBANKAN (4 tempat)
-- ================================================
INSERT INTO public.places (name, slug, description, category_id, address, kecamatan, phone, price_range, tags, is_featured, rating, review_count) VALUES

('Bank BRI Cabang Indramayu', 'bank-bri-indramayu',
'Bank BRI cabang utama Indramayu. Tabungan, kredit, transfer, KUR UMKM, mobile banking.',
(SELECT id FROM categories WHERE slug='perbankan'),
'Jl. Sudirman No. 30, Indramayu', 'Indramayu', '0234-272000', 'Murah',
ARRAY['bank','BRI','KUR','UMKM','mobile banking'], false, 3.9, 167),

('Bank BNI Cabang Indramayu', 'bank-bni-indramayu',
'Bank BNI layanan lengkap. Tabungan, deposito, kredit rumah, kartu kredit, investasi.',
(SELECT id FROM categories WHERE slug='perbankan'),
'Jl. Ahmad Yani No. 15, Indramayu', 'Indramayu', '0234-273000', 'Murah',
ARRAY['bank','BNI','deposito','kredit rumah','investasi'], false, 3.8, 134),

('Bank Mandiri Indramayu', 'bank-mandiri-indramayu',
'Bank Mandiri terlengkap. E-banking, Mandiri Syariah, payroll, bisnis, priority.',
(SELECT id FROM categories WHERE slug='perbankan'),
'Jl. Sudirman No. 55, Indramayu', 'Indramayu', '0234-274500', 'Murah',
ARRAY['bank','mandiri','syariah','payroll','e-banking'], false, 4.0, 156),

('Koperasi Simpan Pinjam Indramayu', 'ksp-indramayu',
'Koperasi simpan pinjam terpercaya. Bunga ringan, proses cepat, tanpa agunan hingga 5 juta.',
(SELECT id FROM categories WHERE slug='perbankan'),
'Jl. Pahlawan No. 10, Indramayu', 'Indramayu', '0234-275500', 'Murah',
ARRAY['koperasi','simpan pinjam','bunga ringan','UMKM','tanpa agunan'], false, 4.1, 89);

-- Update place_count di categories
UPDATE public.categories c
SET place_count = (
  SELECT COUNT(*) FROM public.places p
  WHERE p.category_id = c.id AND p.is_active = true
);

SELECT
  c.name as kategori,
  c.place_count as jumlah_tempat
FROM categories c
ORDER BY place_count DESC;
