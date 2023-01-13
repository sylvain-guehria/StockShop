import type { NextApiRequest, NextApiResponse } from 'next';

const getAllUsers = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json({});
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when fetching users', e);
    res.status(400).end();
  }
};

export default getAllUsers;
