import type { NextApiRequest, NextApiResponse } from 'next';

const addUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { ...user } = req.body;

    res.status(200).json(user);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when adding user', e);
    res.status(400).end();
  }
};

export default addUser;
