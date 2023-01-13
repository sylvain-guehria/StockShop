import type { NextApiRequest, NextApiResponse } from 'next';

const userByUid = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { uid },
    method,
  } = req;

  try {
    switch (method) {
      case 'GET':
        res.status(200).json({ uid });
        return;
      case 'PUT':
        res.status(200).json({ uid });
        return;
      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    res.status(400).end();
  }
};

export default userByUid;
