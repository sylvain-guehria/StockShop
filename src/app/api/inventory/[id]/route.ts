import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';

const inventoryById = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  const inventory = {
    id: req.body.id,
    name: req.body.name,
    isPublic: req.body.isPublic,
    isDefaultInventory: req.body.isDefaultInventory,
    color: req.body.color,
  };

  if (!id) throw new Error('Inventory id is mandatory to update an inventory');

  const supabase = createServerComponentClient<Database>({ cookies });

  if (method === 'GET') {
    const { data: inventor, error } = await supabase
      .from(TableNames.INVENTORIES)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logException(error, { when: 'getting inventory' });
      res.status(400).end();
      return;
    }
    res.status(200).json(inventor);
    return;
  }
  if (method === 'PUT') {
    const { error } = await supabase
      .from(TableNames.INVENTORIES)
      .update({ ...inventory })
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

export default inventoryById;
