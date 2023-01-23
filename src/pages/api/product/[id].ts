import type { NextApiRequest, NextApiResponse } from 'next';

const productById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;
  const { id } = query;

  try {
    switch (method) {
      case 'GET':
        return;
      case 'PUT':
        res.status(200).json(id);
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

export default productById;
