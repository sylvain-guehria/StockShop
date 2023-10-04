import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body) {
    return NextResponse.json({ error: 'company is required to add company' });
  }

  const supabase = createServerComponentClient<Database>({ cookies });

  const { error, status } = await supabase
    .from(TableNames.COMPANIES)
    .insert(body);

  if (error) {
    logException(error, { when: 'adding company' });
    NextResponse.json({ error });
    return;
  }

  // 201 = created successfully
  return NextResponse.json(status === 201);
}
