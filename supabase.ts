import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

// Server-side client (bypasses RLS — only use in API routes/server components)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

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
