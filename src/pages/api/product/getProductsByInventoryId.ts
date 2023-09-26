import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

import { ProductAttributes } from '@/modules/product/productType';
import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';
import { getPagination } from '@/utils/apiUtils';
import { removeKeysWithNoValues } from '@/utils/objectUtils';
import { parseBoolean } from '@/utils/primitiveUtils';

const getProductsByInventoryId = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const {
    query: {
      inventoryId,
      currentPage,
      numberOfProductsPerPage,
      sorterField,
      sorterOrder,
      filterCategoryId,
      filterSubCategoryId,
      filterToBuy,
      filterIsPublic,
    },
  } = req;

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
    res.status(400).end();
    return [];
  }
  return res.status(200).json({
    count,
    results: data,
  });
};

export default getProductsByInventoryId;
