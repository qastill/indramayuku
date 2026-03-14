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
  subcategory?: string
  hours?: Record<string, { open: string; close: string; closed: boolean }>
  tags?: string[]
  images?: string[]
  cover_image?: string
  latitude?: number
  longitude?: number
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

export const CATEGORY_IMAGES: Record<string, string> = {
  kuliner: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
  wisata: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
  hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
  belanja: 'https://images.unsplash.com/photo-1555529771-7888783a18d3?w=400&h=300&fit=crop',
  kesehatan: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop',
  pendidikan: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
  transportasi: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop',
  hiburan: 'https://images.unsplash.com/photo-1603739903239-8b6e64c3b185?w=400&h=300&fit=crop',
  kecantikan: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
  otomotif: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop',
  perbankan: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400&h=300&fit=crop',
  properti: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
  olahraga: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
  loker: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop',
  kafe: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
  'rumah-sakit': 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop',
  'kolam-renang': 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop',
  default: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
}

export const KECAMATAN_LIST = [
  'Indramayu', 'Sindang', 'Balongan', 'Kandanghaur', 'Losarang',
  'Cantigi', 'Arahan', 'Kedokanbunder', 'Juntinyuat', 'Karangampel',
  'Krangkeng', 'Pasekan', 'Sliyeg', 'Jatibarang', 'Bangodua',
  'Tukdana', 'Widasari', 'Kertasemaya', 'Sukagumiwang', 'Terisi',
  'Cikedung', 'Lelea', 'Bongas', 'Anjatan', 'Patrol',
  'Sukra', 'Gabuswetan', 'Kroya', 'Haurgeulis', 'Gantar', 'Trisi'
]
