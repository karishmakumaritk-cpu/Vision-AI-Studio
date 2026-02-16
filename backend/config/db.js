const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Supabase environment variables not set. Database operations will fail.');
  console.warn('Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env file');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

module.exports = supabase;
