import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';

const productById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;
  const { id } = query;

  if (!id) {
    res.status(400).end('Product id is mandatory to update a product');
    return;
  }

  const supabase = createServerComponentClient<Database>({ cookies });

  if (method === 'GET') {
    const { data: prod, error } = await supabase
      .from(TableNames.PRODUCTS)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logException(error, { when: 'getting product' });
      res.status(400).end();
      return;
    }
    res.status(200).json(prod);
    return;
  }
  if (method === 'PUT') {
    const { error } = await supabase
      .from(TableNames.PRODUCTS)
      .update(req.body.product)
      .eq('id', id)
      .single();
    if (error) {
      logException(error, { when: 'updating inventory' });
      res.status(400).end();
      return;
    }
    res.status(200).json(true);
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${method} Not Allowed`);
};

export default productById;
