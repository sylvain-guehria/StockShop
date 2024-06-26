import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.auth.signOut();

  return NextResponse.json(error ? { error } : {});
}
