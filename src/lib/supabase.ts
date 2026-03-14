import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
        }
        Update: {
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
        }
      }
      places: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          category_id: string | null
          address: string
          kecamatan: string | null
          kota: string
          phone: string | null
          website: string | null
          whatsapp: string | null
          instagram: string | null
          price_range: string | null
          price_min: number | null
          price_max: number | null
          rating: number
          review_count: number
          is_verified: boolean
          is_featured: boolean
          is_active: boolean
          hours: Record<string, any>
          tags: string[] | null
          images: string[] | null
          cover_image: string | null
          owner_id: string | null
          created_at: string
          updated_at: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          color: string | null
          place_count: number
          created_at: string
        }
      }
      reviews: {
        Row: {
          id: string
          place_id: string
          user_id: string
          rating: number
          title: string | null
          content: string
          images: string[] | null
          helpful_count: number
          visit_date: string | null
          visit_type: string | null
          is_verified_visit: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          place_id: string
          user_id: string
          rating: number
          title?: string | null
          content: string
          images?: string[] | null
          visit_date?: string | null
          visit_type?: string | null
        }
        Update: {
          rating?: number
          title?: string | null
          content?: string
          images?: string[] | null
          visit_date?: string | null
          visit_type?: string | null
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          place_id: string
          created_at: string
        }
      }
    }
  }
}
