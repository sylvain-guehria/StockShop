import type { NextApiRequest, NextApiResponse } from 'next';

const getCompanyByUserId = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { userId },
    method,
  } = req;

  if (!userId) {
    res.status(400).end('User id is mandatory');
    return;
  }

  try {
    switch (method) {
      case 'GET':
        res.status(200).json({});
        return;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    res.status(400).end();
  }
};

export default getCompanyByUserId;
