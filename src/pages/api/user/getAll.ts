import { logException } from 'logger';
import type { NextApiRequest, NextApiResponse } from 'next';

const getAllUsers = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json({});
  } catch (error) {
    logException(error, { when: 'getting all users' });
    res.status(400).end();
  }
};

export default getAllUsers;
