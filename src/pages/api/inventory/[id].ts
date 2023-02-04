import type { NextApiRequest, NextApiResponse } from 'next';

import { TableNames } from '@/supabase/enums/tableNames';
import createServerSupabaseSSRClient from '@/supabase/server/supabase-ssr';

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

  if (!id) {
    res.status(400).end('Inventory id is mandatory to update an inventory');
    return;
  }
  const supabaseSsr = createServerSupabaseSSRClient({ req, res });

  if (method === 'GET') {
    const { data: inventor, error } = await supabaseSsr
      .from(TableNames.INVENTORIES)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      // eslint-disable-next-line no-console
      console.error('error when getting inventory', error);
      res.status(400).end();
      return;
    }
    res.status(200).json(inventor);
    return;
  }
  if (method === 'PUT') {
    const { error } = await supabaseSsr
      .from(TableNames.INVENTORIES)
      .update({ ...inventory })
      .eq('id', id)
      .single();
    if (error) {
      // eslint-disable-next-line no-console
      console.error('error when updating inventory', error);
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
