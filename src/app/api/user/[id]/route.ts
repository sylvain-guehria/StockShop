import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';
import { remplaceEmptyStringWithNull } from '@/utils/objectUtils';

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const body = await request.json();

  const supabase = createServerComponentClient<Database>({ cookies });

  const { error, status } = await supabase
    .from(TableNames.PROFILES)
    .update(remplaceEmptyStringWithNull(body))
    .eq('id', id);
  if (error) {
    logException(error, { when: 'updating user profile' });
    return NextResponse.json(null);
  }

  return NextResponse.json(status === 204 ? body : null);
}

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const id = params.slug;

  if (!id) {
    return NextResponse.json({ error: 'User id is mandatory to get profile' });
  }

  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: profile, error } = await supabase
    .from(TableNames.PROFILES)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    logException(error, { when: 'getting user profile by id' });
    return NextResponse.json(null);
  }
  return NextResponse.json(profile);
}
