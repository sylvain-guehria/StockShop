import type { NextApiRequest, NextApiResponse } from 'next';
import { TableNames } from 'supabase/enums/tableNames';
import createServerSupabaseSSRClient from 'supabase/server/supabase-ssr';

const addProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { product } = req.body;

  if (!product) throw new Error('product is required to add product');

  const supabaseSsr = createServerSupabaseSSRClient({ req, res });

  const { error } = await supabaseSsr.from(TableNames.PRODUCTS).insert(product);

  if (error) {
    // eslint-disable-next-line no-console
    console.error('error when adding a product', error);
    res.status(400).end();
    return;
  }
  res.status(200).json(true);
};

export default addProduct;
