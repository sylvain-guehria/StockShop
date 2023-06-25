import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

import { TableNames } from '@/supabase/enums/tableNames';
import type { Database } from '@/types/supabase';
import { removeKeysWithNoValues } from '@/utils/objectUtils';

const userById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;
  const { id } = query;

  if (!id) {
    res.status(400).end('User id is mandatory to get profile');
    return;
  }

  const supabase = createServerComponentClient<Database>({ cookies });

  if (method === 'GET') {
    const { data: profile, error } = await supabase
      .from(TableNames.PROFILES)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logException(error, { when: 'getting user profile by id' });
      res.status(400).end();
      return;
    }
    res.status(200).json(profile);
    return;
  }
  if (method === 'PUT') {
    const { error } = await supabase
      .from(TableNames.PROFILES)
      .update(removeKeysWithNoValues(req.body))
      .eq('id', id);
    if (error) {
      logException(error, { when: 'updating user profile' });
      res.status(400).end();
      return;
    }
    res.status(200).json(true);
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${method} Not Allowed`);
};

export default userById;
