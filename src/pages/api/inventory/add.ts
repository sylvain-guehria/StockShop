import { logException } from 'logger';
import type { NextApiRequest, NextApiResponse } from 'next';

import { TableNames } from '@/supabase/enums/tableNames';
import createServerSupabaseSSRClient from '@/supabase/server/supabase-ssr';

const addInventory = async (req: NextApiRequest, res: NextApiResponse) => {
  const { inventory } = req.body;

  if (!inventory) throw new Error('inventory is required to add inventory');

  if (!inventory.companyId)
    throw new Error('companyId is required to add inventory');

  const supabaseSsr = createServerSupabaseSSRClient({ req, res });

  const { error } = await supabaseSsr
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
