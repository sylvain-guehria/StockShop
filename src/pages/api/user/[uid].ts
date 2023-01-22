import type { NextApiRequest, NextApiResponse } from 'next';
import supabaseBrowser from 'supabase/client/supabase-browser';
import { ProfileColumns } from 'supabase/tables/profiles';
import { TableNames } from 'supabase/tables/tableNames';

const userById = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  if (!id) {
    res.status(400).end('User id is mandatory to get profile');
    return;
  }

  try {
    if (method === 'GET') {
      const { data: profile } = await supabaseBrowser
        .from(TableNames.PRODUCTS)
        .select(
          `${ProfileColumns.id}, ${ProfileColumns.email}, ${ProfileColumns.username}, ${ProfileColumns.firstName}, ${ProfileColumns.lastName}, ${ProfileColumns.phone}, ${ProfileColumns.role}, ${ProfileColumns.locale}, ${ProfileColumns.hasInventoryManagementServiceActivated}, ${ProfileColumns.hasSeenFirstConnectionModal}, ${ProfileColumns.companyId}`
        );
      res.status(200).json(profile);
      return;
    }
    if (method === 'PUT') {
      const { data: profile } = await supabaseBrowser
        .from('profiles')
        .update({ ...req.body });
      res.status(200).json(profile);
      return;
    }

    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    res.status(400).end();
  }
};

export default userById;
