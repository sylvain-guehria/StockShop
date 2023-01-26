import type { NextApiRequest, NextApiResponse } from 'next';
import createServerSupabaseSSRClient from 'supabase/server/supabase-ssr';
import { TableNames } from 'supabase/tables/tableNames';

const addCompany = async (req: NextApiRequest, res: NextApiResponse) => {
  const { company } = req.body;

  const supabaseSsr = createServerSupabaseSSRClient({ req, res });

  const { error } = await supabaseSsr
    .from(TableNames.COMPANIES)
    .insert(company);

  if (error) {
    // eslint-disable-next-line no-console
    console.error('error when adding a company', error);
    res.status(400).end();
    return;
  }
  res.status(200).json(true);
};

export default addCompany;
