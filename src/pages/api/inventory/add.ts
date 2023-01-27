import type { NextApiRequest, NextApiResponse } from 'next';
import createServerSupabaseSSRClient from 'supabase/server/supabase-ssr';
import { TableNames } from 'supabase/tables/tableNames';

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
    // eslint-disable-next-line no-console
    console.error('error when adding an inventory', error);
    res.status(400).end();
    return;
  }
  res.status(200).json(true);
};

export default addInventory;
