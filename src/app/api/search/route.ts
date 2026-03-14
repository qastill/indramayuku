import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()
  const limit = parseInt(searchParams.get('limit') || '12')

  if (!q) return NextResponse.json({ results: [] })

  try {
    const { data, error } = await supabase
      .from('places')
      .select('*, category:categories(*)')
      .eq('is_active', true)
      .or(`name.ilike.%${q}%,description.ilike.%${q}%,address.ilike.%${q}%,kecamatan.ilike.%${q}%`)
      .order('rating', { ascending: false })
      .limit(limit)

    if (error) throw error
    return NextResponse.json({ results: data, query: q })
  } catch {
    return NextResponse.json({ error: 'Gagal mencari' }, { status: 500 })
  }
}
