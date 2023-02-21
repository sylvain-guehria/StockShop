import 'server-only';

import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import type { Database } from 'src/types/supabase';

const createServerCompSupabaseClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

export default createServerCompSupabaseClient;