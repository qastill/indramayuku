import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const sort = searchParams.get('sort') || 'rating'
  const price = searchParams.get('price')
  const featured = searchParams.get('featured')
  const limit = parseInt(searchParams.get('limit') || '12')
  const page = parseInt(searchParams.get('page') || '1')
  const offset = (page - 1) * limit

  try {
    let query = supabase
      .from('places')
      .select('*, category:categories(*)', { count: 'exact' })
      .eq('is_active', true)

    if (category) query = query.eq('categories.slug', category)
    if (price) query = query.eq('price_range', price)
    if (featured === 'true') query = query.eq('is_featured', true)

    if (sort === 'newest') query = query.order('created_at', { ascending: false })
    else if (sort === 'popular') query = query.order('review_count', { ascending: false })
    else query = query.order('rating', { ascending: false })

    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({
      places: data,
      total: count,
      page,
      totalPages: Math.ceil((count || 0) / limit)
    })
  } catch (err) {
    return NextResponse.json({ error: 'Gagal memuat data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Generate slug
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    const { data, error } = await supabase
      .from('places')
      .insert({ ...body, slug, owner_id: user.id })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ place: data }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Gagal membuat tempat' }, { status: 500 })
  }
}
