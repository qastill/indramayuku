export interface Place {
  id: string
  name: string
  slug: string
  description?: string
  category_id?: string
  category?: Category
  address: string
  kecamatan?: string
  kota: string
  phone?: string
  website?: string
  whatsapp?: string
  instagram?: string
  price_range?: 'Murah' | 'Sedang' | 'Mahal' | 'Sangat Mahal'
  price_min?: number
  price_max?: number
  rating: number
  review_count: number
  is_verified: boolean
  is_featured: boolean
  is_active: boolean
  hours?: Record<string, { open: string; close: string; closed: boolean }>
  tags?: string[]
  images?: string[]
  cover_image?: string
  owner_id?: string
  created_at: string
  updated_at: string
  reviews?: Review[]
  is_bookmarked?: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  color?: string
  place_count: number
  created_at: string
}

export interface Review {
  id: string
  place_id: string
  user_id: string
  profile?: Profile
  rating: number
  title?: string
  content: string
  images?: string[]
  helpful_count: number
  visit_date?: string
  visit_type?: string
  is_verified_visit: boolean
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  username: string
  full_name?: string
  avatar_url?: string
  bio?: string
  location?: string
  review_count: number
  created_at: string
  updated_at: string
}

export const PRICE_RANGE_LABELS: Record<string, string> = {
  'Murah': 'Rp',
  'Sedang': 'Rp Rp',
  'Mahal': 'Rp Rp Rp',
  'Sangat Mahal': 'Rp Rp Rp Rp'
}

export const KECAMATAN_LIST = [
  'Indramayu', 'Sindang', 'Balongan', 'Kandanghaur', 'Losarang',
  'Cantigi', 'Arahan', 'Kedokanbunder', 'Juntinyuat', 'Karangampel',
  'Krangkeng', 'Pasekan', 'Sliyeg', 'Jatibarang', 'Bangodua',
  'Tukdana', 'Widasari', 'Kertasemaya', 'Sukagumiwang', 'Terisi',
  'Cikedung', 'Lelea', 'Bongas', 'Anjatan', 'Patrol',
  'Sukra', 'Gabuswetan', 'Kroya', 'Haurgeulis', 'Gantar', 'Trisi'
]
