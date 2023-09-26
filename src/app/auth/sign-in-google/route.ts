import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { PROVIDERS } from '@/modules/user/userType';
import { getURL } from '@/usecases/auth/authUtils';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.auth.signInWithOAuth({
    provider: PROVIDERS.GOOGLE,
    options: {
      redirectTo: getURL(),
    },
  });

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not authenticate user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      },
    );
  }

  return NextResponse.redirect(requestUrl.origin, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
