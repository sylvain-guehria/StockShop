import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';

const addProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { product } = req.body;

  if (!product) throw new Error('product is required to add product');

  const supabase = createServerComponentClient<Database>({ cookies });

  const { error } = await supabase.from(TableNames.PRODUCTS).insert(product);

  if (error) {
    logException(error, { when: 'adding inventory' });
    res.status(400).end();
    return;
  }
  res.status(200).json(true);
};

export default addProduct;
