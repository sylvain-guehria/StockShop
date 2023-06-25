import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';

const deleteInventory = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { inventoryId },
    method,
  } = req;

  if (!inventoryId)
    throw new Error('inventoryId is required to delete the inventory');

  if (method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const supabase = createServerComponentClient<Database>({ cookies });

  const { error } = await supabase
    .from(TableNames.INVENTORIES)
    .delete()
    .eq('id', inventoryId);

  if (error) {
    logException(error, { when: 'deleting inventory' });
    res.status(400).end();
    return;
  }
  res.status(200).json(true);
};

export default deleteInventory;
