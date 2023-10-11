import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { PROVIDERS } from '@/modules/user/userType';

export const dynamic = 'force-dynamic';

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies });

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: PROVIDERS.GOOGLE,
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) return NextResponse.json(null);

  return NextResponse.json(data);
}
