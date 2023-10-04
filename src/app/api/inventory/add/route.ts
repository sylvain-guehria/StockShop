import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body) {
    return NextResponse.json({
      error: 'inventory is required to add inventory',
    });
  }

  if (!body.companyId) {
    return NextResponse.json({
      error: 'companyId is required to add inventory',
    });
  }

  const supabase = createServerComponentClient<Database>({ cookies });

  const { error, status } = await supabase
    .from(TableNames.INVENTORIES)
    .insert(body);

  if (error) {
    logException(error, { when: 'adding inventory' });
    return NextResponse.json({ error });
  }

  // 201 = created successfully
  return NextResponse.json(status === 201);
}
