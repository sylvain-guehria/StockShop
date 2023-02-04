import type { NextApiRequest, NextApiResponse } from 'next';
import { TableNames } from 'supabase/enums/tableNames';
import createServerSupabaseSSRClient from 'supabase/server/supabase-ssr';

const userById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;
  const { id } = query;

  if (!id) {
    res.status(400).end('User id is mandatory to get profile');
    return;
  }

  const supabaseSsr = createServerSupabaseSSRClient({ req, res });

  if (method === 'GET') {
    const { data: profile, error } = await supabaseSsr
      .from(TableNames.PROFILES)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      // eslint-disable-next-line no-console
      console.error('error when getting user profile', error);
      res.status(400).end();
      return;
    }
    res.status(200).json(profile);
    return;
  }
  if (method === 'PUT') {
    const { error } = await supabaseSsr
      .from(TableNames.PROFILES)
      .update({ ...req.body })
      .eq('id', id)
      .single();
    if (error) {
      // eslint-disable-next-line no-console
      console.error('error when updating user profile', error);
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
