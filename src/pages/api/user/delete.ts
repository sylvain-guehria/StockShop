import type { NextApiRequest, NextApiResponse } from 'next';

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.body;

    res.status(200).end({ id });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when saving user', e);
    res.status(400).end();
  }
};

export default deleteUser;
