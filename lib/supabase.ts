import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// NEXT_PUBLIC_SUPABASE_URL must be the Supabase project REST URL (https://<ref>.supabase.co).
// A PostgreSQL connection string (postgresql:// or postgres://) will NOT work here —
// that belongs in DATABASE_URL for Prisma only.
if (supabaseUrl && !/^https:\/\//i.test(supabaseUrl)) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_URL is misconfigured. It must be an HTTPS URL such as ' +
    'https://<project-ref>.supabase.co — not a PostgreSQL connection string. ' +
    'Check your Vercel environment variables.'
  )
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})
