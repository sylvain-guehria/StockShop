import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';

const addCompany = async (req: NextApiRequest, res: NextApiResponse) => {
  const { company } = req.body;

  if (!company) throw new Error('company is required to add company');

  const supabase = createServerComponentClient<Database>({ cookies });

  const { error } = await supabase.from(TableNames.COMPANIES).insert(company);

  if (error) {
    logException(error);
    res.status(400).end();
    return;
  }
  res.status(200).json(true);
};

export default addCompany;
