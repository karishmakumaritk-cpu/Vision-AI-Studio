const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('[supabase] Missing SUPABASE_URL or SUPABASE_SERVICE_KEY.');
}

module.exports = createClient(supabaseUrl || 'https://example.supabase.co', supabaseServiceKey || 'demo-key');
