import type { NextApiRequest, NextApiResponse } from 'next';
import createServerSupabaseSSRClient from 'supabase/server/supabase-ssr';
import { TableNames } from 'supabase/tables/tableNames';

const productById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;
  const { id } = query;

  if (!id) {
    res.status(400).end('Product id is mandatory to update a product');
    return;
  }

  const supabaseSsr = createServerSupabaseSSRClient({ req, res });

  if (method === 'GET') {
    const { data: prod, error } = await supabaseSsr
      .from(TableNames.PRODUCTS)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      // eslint-disable-next-line no-console
      console.error('error when getting product', error);
      res.status(400).end();
      return;
    }
    res.status(200).json(prod);
    return;
  }
  if (method === 'PUT') {
    const { error } = await supabaseSsr
      .from(TableNames.PRODUCTS)
      .update(req.body.product)
      .eq('id', id)
      .single();
    if (error) {
      // eslint-disable-next-line no-console
      console.error('error when updating product', error);
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
