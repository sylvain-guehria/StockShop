import type { NextApiRequest, NextApiResponse } from 'next';

import { TableNames } from '@/supabase/enums/tableNames';
import createServerSupabaseSSRClient from '@/supabase/server/supabase-ssr';

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

  const supabaseSsr = createServerSupabaseSSRClient({ req, res });

  const { error } = await supabaseSsr
    .from(TableNames.PRODUCTS)
    .delete()
    .eq('id', productId);

  if (error) {
    // eslint-disable-next-line no-console
    console.error('error when deleting a product', error);
    res.status(400).end();
    return;
  }
  res.status(200).json(true);
};

export default deleteProduct;
