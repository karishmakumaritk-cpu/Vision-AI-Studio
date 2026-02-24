const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  // Not throwing here to allow local dev of other endpoints; callers should handle missing client.
  console.warn('[supabase.server] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not configured.');
}

const supabase = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

module.exports = { supabase };
