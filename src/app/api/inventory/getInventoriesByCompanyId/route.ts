import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';

const getInventoriesByCompanyId = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const {
    query: { companyId },
  } = req;

  if (!companyId) {
    res.status(400).end('companyId is mandatory to get inventories');
    return [];
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
    res.status(400).end();
    return [];
  }
  return res.status(200).json({
    inventories,
    inventoriesProductCount,
  });
};

export default getInventoriesByCompanyId;
