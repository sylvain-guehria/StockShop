import type { NextApiRequest, NextApiResponse } from 'next';
import { TableNames } from 'supabase/tables/tableNames';

const userById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;
  const { id } = query;

  if (!id) {
    res.status(400).end('User id is mandatory to get profile');
    return;
  }

  try {
    if (method === 'GET') {
      const { data: profile } = await supabase
        .from(TableNames.PROFILES)
        .select('*');
      console.log('profile***********************', profile);
      res.status(200).json(profile);
      return;
    }
    if (method === 'PUT') {
      const { data: profile } = await supabase
        .from(TableNames.PROFILES)
        .update({ ...req.body });
      res.status(200).json(profile);
      return;
    }

    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when getting user profile', e);
    res.status(400).end();
  }
};

export default userById;
