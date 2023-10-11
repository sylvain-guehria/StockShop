import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const companyId = searchParams.get('companyId');

  if (!companyId) {
    return NextResponse.json({
      error: 'companyId is mandatory to get inventories',
    });
  }

  const supabase = createServerComponentClient<Database>({ cookies });

  const { error, data: inventories } = await supabase
    .from(TableNames.INVENTORIES)
    .select('*')
    .eq('companyId', companyId);

  const inventoriesProductCount: Record<string, number | null> = {};

  await Promise.all(
    (inventories || []).map(async (inventory) => {
      const { count: numberOfProduct } = await supabase
        .from(TableNames.PRODUCTS)
        .select('*', { count: 'exact', head: true });
      inventoriesProductCount[inventory.id] = numberOfProduct;
    }),
  );

  if (error) {
    logException(error, { when: 'getting inventory by company id' });
    return NextResponse.json(null);
  }
  return NextResponse.json({
    inventories,
    inventoriesProductCount,
  });
}
