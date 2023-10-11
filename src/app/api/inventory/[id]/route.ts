import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const body = await request.json();

  if (!id) {
    return NextResponse.json({
      error: 'Inventory id is mandatory to update an inventory',
    });
  }

  if (!body) {
    return NextResponse.json({
      error: 'Inventory body is mandatory to update an inventory',
    });
  }

  const supabase = createServerComponentClient<Database>({ cookies });

  const { error, status } = await supabase
    .from(TableNames.INVENTORIES)
    .update(body)
    .eq('id', id)
    .single();

  if (error) {
    logException(error, { when: 'updating inventory' });
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
    return NextResponse.json({
      error: 'Inventory id is mandatory to get an inventory',
    });
  }

  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: inventory, error } = await supabase
    .from(TableNames.INVENTORIES)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    logException(error, { when: 'updating inventory' });
    return NextResponse.json(null);
  }
  return NextResponse.json(inventory);
}
