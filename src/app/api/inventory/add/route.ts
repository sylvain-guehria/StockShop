import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';

const addInventory = async (req: NextApiRequest, res: NextApiResponse) => {
  const { inventory } = req.body;

  if (!inventory) throw new Error('inventory is required to add inventory');

  if (!inventory.companyId)
    throw new Error('companyId is required to add inventory');

  const supabase = createServerComponentClient<Database>({ cookies });

  const { error } = await supabase
    .from(TableNames.INVENTORIES)
    .insert(inventory);

  if (error) {
    logException(error, { when: 'adding inventory' });
    res.status(400).end();
    return;
  }
  res.status(200).json(true);
};

export default addInventory;
