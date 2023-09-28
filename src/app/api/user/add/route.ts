import { logException } from 'logger';
import type { NextApiRequest, NextApiResponse } from 'next';

const addUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { ...user } = req.body;
    res.status(200).json(user);
  } catch (error) {
    logException(error, { when: 'updating adding user' });
    res.status(400).end();
  }
};

export default addUser;
