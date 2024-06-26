import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body) {
    return NextResponse.json(null);
  }

  if (!body.id) {
    return NextResponse.json(null);
  }

  const supabase = createServerComponentClient<Database>({ cookies });

  const { error, status } = await supabase
    .from(TableNames.PRODUCTS)
    .insert(body);

  if (error) {
    logException(error, { when: 'adding inventory' });
    return NextResponse.json(null);
  }
  return NextResponse.json(status === 201 ? body : null);
}
