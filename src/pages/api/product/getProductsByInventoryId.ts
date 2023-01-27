import type { NextApiRequest, NextApiResponse } from 'next';
import createServerSupabaseSSRClient from 'supabase/server/supabase-ssr';
import { TableNames } from 'supabase/tables/tableNames';

import { ProductAttributes } from '@/modules/product/productType';
import { parseBoolean } from '@/utils/primitiveUtils';

export const getPagination = (page: number | string, size: number | string) => {
  const pageNumber = parseInt(page as string, 10);
  const sizeNumber = parseInt(size as string, 10);

  const limit = size ? +size : 3;
  const from = pageNumber ? pageNumber * limit : 0;
  const to = pageNumber ? from + sizeNumber - 1 : sizeNumber - 1;

  return { from, to };
};

const getProductsByUserIdAndInventoryId = async (
  req: NextApiRequest,
  res: NextApiResponse
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

  const supabaseSsr = createServerSupabaseSSRClient({ req, res });

  const { from, to } = getPagination(
    currentPage as string,
    numberOfProductsPerPage as string
  );

  const boolIsPublic = parseBoolean(filterIsPublic as string);

  const { error, data } = await supabaseSsr
    .from(TableNames.PRODUCTS)
    .select('*')
    .match({
      inventoryId,
      categoryId: filterCategoryId,
      subCategoryId: filterSubCategoryId,
      isPublic: boolIsPublic,
    })
    .gt(filterToBuy === 'true' ? ProductAttributes.TO_BUY : '', 0)
    .order(sorterField as any, {
      ascending: sorterOrder === 'asc',
    })
    .range(from, to);

  if (error) {
    // eslint-disable-next-line no-console
    console.error('error when getting products by inventory', error);
    res.status(400).end();
    return [];
  }
  return res.status(200).json(data);
};

export default getProductsByUserIdAndInventoryId;
