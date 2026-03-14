import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('place_count', { ascending: false })
    if (error) throw error
    return NextResponse.json({ categories: data })
  } catch {
    return NextResponse.json({ error: 'Gagal memuat kategori' }, { status: 500 })
  }
}
