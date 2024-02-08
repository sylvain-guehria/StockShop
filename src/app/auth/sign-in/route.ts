import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const requestData = await request.json();
  const { email, password } = requestData;
  const supabase = createRouteHandlerClient({ cookies });

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return NextResponse.json(error ? { error } : data);
}
