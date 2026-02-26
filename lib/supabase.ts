import { createClient, SupabaseClient } from '@supabase/supabase-js'

export type UserRole = 'user' | 'admin' | 'worker'
export type SubscriptionStatus = 'trial' | 'active' | 'expired'

export interface DbUser {
  id: string
  name: string | null
  email: string
  password_hash: string | null
  role: UserRole
  trial_start: string | null
  trial_end: string | null
  subscription_status: SubscriptionStatus
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface DbWorkflow {
  id: string
  user_id: string
  workflow_type: string
  description: string | null
  requirements: Record<string, unknown>
  status: 'pending' | 'building' | 'completed' | 'cancelled'
  price: number
  worker_id: string | null
  created_at: string
  updated_at: string
}

// Lazy singleton — only created on first use so the build phase
// doesn't fail when NEXT_PUBLIC_SUPABASE_URL is not set.
let _client: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (_client) return _client

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set. ' +
      'Check your Vercel environment variables.'
    )
  }

  // NEXT_PUBLIC_SUPABASE_URL must be the Supabase project REST URL (https://<ref>.supabase.co).
  // A PostgreSQL connection string (postgresql:// or postgres://) will NOT work here.
  if (!/^https:\/\//i.test(supabaseUrl)) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL is misconfigured. It must be an HTTPS URL such as ' +
      'https://<project-ref>.supabase.co — not a PostgreSQL connection string. ' +
      'Check your Vercel environment variables.'
    )
  }

  _client = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  return _client
}

// Server-side client (bypasses RLS — only use in API routes/server components)
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getClient() as any)[prop]
  },
})
