import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';
import { registerSchema } from '@/lib/validations';

const TRIAL_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = registerSchema.parse(body);

    const { data: existing } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', data.email)
      .single();

    if (existing) return NextResponse.json({ error: 'Email already exists' }, { status: 409 });

    const hash = await bcrypt.hash(data.password, 10);
    const now = new Date();
    const trialEnd = new Date(now.getTime() + TRIAL_DURATION_MS);

    const { error } = await supabaseAdmin.from('users').insert({
      email: data.email,
      name: data.name,
      password_hash: hash,
      role: 'user',
      trial_start: now.toISOString(),
      trial_end: trialEnd.toISOString(),
      subscription_status: 'trial',
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
