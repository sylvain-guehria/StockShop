import type { NextApiRequest, NextApiResponse } from 'next';
import { TableNames } from 'supabase/enums/tableNames';
import createServerSupabaseSSRClient from 'supabase/server/supabase-ssr';

const getInventoriesByCompanyId = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { companyId },
  } = req;

  if (!companyId) {
    res.status(400).end('companyId is mandatory to get inventories');
    return [];
  }

  const supabaseSsr = createServerSupabaseSSRClient({ req, res });

  const { error, data } = await supabaseSsr
    .from(TableNames.INVENTORIES)
    .select('*')
    .eq('companyId', companyId);

  if (error) {
    // eslint-disable-next-line no-console
    console.error('error when getting inventory by company id', error);
    res.status(400).end();
    return [];
  }
  return res.status(200).json(data);
};

export default getInventoriesByCompanyId;
