import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be 8+ characters' }, { status: 400 })
    }

    // Check if email already exists
    const { data: existing } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    const password_hash = await bcrypt.hash(password, 12)
    const now = new Date()
    const trial_end = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours

    const { error } = await supabaseAdmin.from('users').insert({
      name,
      email,
      password_hash,
      role: 'user',
      trial_start: now.toISOString(),
      trial_end: trial_end.toISOString(),
      subscription_status: 'trial',
    })

    if (error) {
      console.error('Signup DB error:', error)
      return NextResponse.json({ error: 'Signup failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Signup error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
