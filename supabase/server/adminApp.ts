import { createClient } from '@supabase/supabase-js';

// DO NOT USE THIS EXCEPT IF YOU NEED ADMIN RIGHT
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPERBASE_SERVICE_ROLE as string,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  }
);

export const supabaseAuthAdmin = supabase.auth.admin;
export const supabaseAdmin = supabase;
