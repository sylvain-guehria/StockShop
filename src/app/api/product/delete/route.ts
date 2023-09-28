import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { productId },
    method,
  } = req;

  if (!productId)
    throw new Error('productId is required to delete the product');

  if (method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const supabase = createServerComponentClient<Database>({ cookies });

  const { error } = await supabase
    .from(TableNames.PRODUCTS)
    .delete()
    .eq('id', productId);

  if (error) {
    logException(error, { when: 'deleting inventory' });
    res.status(400).end();
    return;
  }
  res.status(200).json(true);
};

export default deleteProduct;
