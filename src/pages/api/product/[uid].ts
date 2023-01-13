import type { NextApiRequest, NextApiResponse } from 'next';

const productByUid = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;
  const { uid } = query;

  try {
    switch (method) {
      case 'GET':
        return;
      case 'PUT':
        res.status(200).json(uid);
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

export default productByUid;
