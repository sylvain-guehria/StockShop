import 'server-only';

import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

const createServerSupabaseClient = () =>
  createServerComponentSupabaseClient({
    headers,
    cookies,
  });

export default createServerSupabaseClient;
