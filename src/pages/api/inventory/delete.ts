import type { NextApiRequest, NextApiResponse } from 'next';
import createServerSupabaseSSRClient from 'supabase/server/supabase-ssr';
import { TableNames } from 'supabase/tables/tableNames';

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

  const supabaseSsr = createServerSupabaseSSRClient({ req, res });

  const { error } = await supabaseSsr
    .from(TableNames.INVENTORIES)
    .delete()
    .eq('id', inventoryId);

  if (error) {
    // eslint-disable-next-line no-console
    console.error('error when deleting an inventory', error);
    res.status(400).end();
    return;
  }
  res.status(200).json(true);
};

export default deleteInventory;
