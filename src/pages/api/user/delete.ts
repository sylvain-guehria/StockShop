import { logException } from 'logger';
import type { NextApiRequest, NextApiResponse } from 'next';

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.body;

    res.status(200).end({ id });
  } catch (error) {
    logException(error, { when: 'deleting user' });
    res.status(400).end();
  }
};

export default deleteUser;
