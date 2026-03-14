import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const placeId = searchParams.get('place_id')
  const userId = searchParams.get('user_id')
  const limit = parseInt(searchParams.get('limit') || '10')

  try {
    let query = supabase
      .from('reviews')
      .select('*, profile:profiles(*), place:places(id,name,slug)')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (placeId) query = query.eq('place_id', placeId)
    if (userId) query = query.eq('user_id', userId)

    const { data, error } = await query
    if (error) throw error
    return NextResponse.json({ reviews: data })
  } catch {
    return NextResponse.json({ error: 'Gagal memuat ulasan' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('reviews')
      .insert({ ...body, user_id: user.id })
      .select('*, profile:profiles(*)')
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Kamu sudah mengulas tempat ini' }, { status: 409 })
      }
      throw error
    }

    return NextResponse.json({ review: data }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Gagal mengirim ulasan' }, { status: 500 })
  }
}
