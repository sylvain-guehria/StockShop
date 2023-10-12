import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';
import { remplaceEmptyStringWithNull } from '@/utils/objectUtils';

export async function POST(request: Request) {
  const body = await request.json();

  const supabase = createServerComponentClient<Database>({ cookies });

  const { error, status } = await supabase
    .from(TableNames.COMPANIES)
    .insert(remplaceEmptyStringWithNull(body));

  if (error) {
    logException(error, { when: 'adding company' });
    NextResponse.json(null);
    return;
  }

  return NextResponse.json(status === 201 ? body : null);
}
