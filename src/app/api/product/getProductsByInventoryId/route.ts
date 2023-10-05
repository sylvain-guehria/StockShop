import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { ProductAttributes } from '@/modules/product/productType';
import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';
import { getPagination } from '@/utils/apiUtils';
import { removeKeysWithNoValues } from '@/utils/objectUtils';
import { parseBoolean } from '@/utils/primitiveUtils';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const inventoryId = searchParams.get('inventoryId');
  const currentPage = searchParams.get('currentPage');
  const numberOfProductsPerPage = searchParams.get('numberOfProductsPerPage');
  const sorterField = searchParams.get('sorterField');
  const sorterOrder = searchParams.get('sorterOrder');
  const filterCategoryId = searchParams.get('filterCategoryId');
  const filterSubCategoryId = searchParams.get('filterSubCategoryId');
  const filterToBuy = searchParams.get('filterToBuy');
  const filterIsPublic = searchParams.get('filterIsPublic');

  const supabase = createServerComponentClient<Database>({ cookies });

  const { from, to } = getPagination(
    currentPage as string,
    numberOfProductsPerPage as string,
  );

  const boolIsPublic = parseBoolean(filterIsPublic as string);

  let match: any = {
    inventoryId,
    categoryId: filterCategoryId,
    subCategoryId: filterSubCategoryId,
    isPublic: boolIsPublic,
  };

  match = removeKeysWithNoValues(match);

  const { error, data } = await supabase
    .from(TableNames.PRODUCTS)
    .select('*')
    .match(match)
    .gt(filterToBuy === 'true' ? ProductAttributes.TO_BUY : '', 0)
    .order(sorterField as any, {
      ascending: sorterOrder === 'asc',
    })
    .range(from, to);

  const { count } = await supabase
    .from(TableNames.PRODUCTS)
    .select('*', { count: 'exact', head: true })
    .match(match)
    .gt(filterToBuy === 'true' ? ProductAttributes.TO_BUY : '', 0);

  if (error) {
    logException(error, { when: 'getting products by inventory id' });
    NextResponse.json({ error });
    return [];
  }
  return NextResponse.json({
    count,
    results: data,
  });
}
