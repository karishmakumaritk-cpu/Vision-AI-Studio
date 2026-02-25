import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Environment variable VITE_SUPABASE_URL is not set. Please configure it in frontend/.env before running the app.');
}

if (!supabaseAnonKey) {
  throw new Error('Environment variable VITE_SUPABASE_ANON_KEY is not set. Please configure it in frontend/.env before running the app.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
