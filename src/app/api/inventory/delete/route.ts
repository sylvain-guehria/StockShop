import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const inventoryId = searchParams.get('inventoryId');

  if (!inventoryId) {
    return NextResponse.json(null);
  }

  const supabase = createServerComponentClient<Database>({ cookies });

  const { error, status } = await supabase
    .from(TableNames.INVENTORIES)
    .delete()
    .eq('id', inventoryId);

  if (error) {
    logException(error, { when: 'deleting inventory' });
    return NextResponse.json(null);
  }
  return NextResponse.json(status === 204);
}
