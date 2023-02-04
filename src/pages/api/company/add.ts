import type { NextApiRequest, NextApiResponse } from 'next';
import { TableNames } from 'supabase/enums/tableNames';
import createServerSupabaseSSRClient from 'supabase/server/supabase-ssr';

const addCompany = async (req: NextApiRequest, res: NextApiResponse) => {
  const { company } = req.body;

  if (!company) throw new Error('company is required to add company');

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
