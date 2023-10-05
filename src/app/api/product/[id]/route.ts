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
      error: 'Product id is mandatory to update an product',
    });
  }

  if (!body) {
    return NextResponse.json({
      error: 'Product body is mandatory to update an product',
    });
  }

  const supabase = createServerComponentClient<Database>({ cookies });

  const { error, status } = await supabase
    .from(TableNames.PRODUCTS)
    .update(body)
    .eq('id', id)
    .single();

  if (error) {
    logException(error, { when: 'updating product' });
    return NextResponse.json({ error });
  }

  return NextResponse.json(status === 204);
}

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const id = params.slug;

  if (!id) {
    return NextResponse.json({
      error: 'Product id is mandatory to update an product',
    });
  }

  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: product, error } = await supabase
    .from(TableNames.PRODUCTS)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    logException(error, { when: 'updating product' });
    return NextResponse.json({
      error: 'Error when updating product',
    });
  }
  return NextResponse.json(product);
}
