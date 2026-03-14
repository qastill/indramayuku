-- ================================================
-- STEP 1: RESET TOTAL - Jalankan ini dulu
-- ================================================

-- Drop semua dengan CASCADE
DROP TABLE IF EXISTS public.forum_comments CASCADE;
DROP TABLE IF EXISTS public.forum_posts CASCADE;
DROP TABLE IF EXISTS public.bookmarks CASCADE;
DROP TABLE IF EXISTS public.helpful_votes CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.places CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.update_place_rating() CASCADE;
DROP FUNCTION IF EXISTS public.update_category_count() CASCADE;
DROP FUNCTION IF EXISTS public.update_forum_comment_count() CASCADE;

-- Hapus storage policies lama
DROP POLICY IF EXISTS "Anyone can view images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their files" ON storage.objects;

SELECT 'STEP 1 DONE - Lanjut Step 2' as status;
