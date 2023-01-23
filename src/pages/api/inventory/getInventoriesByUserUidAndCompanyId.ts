import type { NextApiRequest, NextApiResponse } from 'next';

const getInventoriesByUserIdAndCompanyId = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { userId, companyId },
    method,
  } = req;

  try {
    switch (method) {
      case 'GET':
        res.status(200).json({ userId, companyId });
        return;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    res.status(400).end('[]');
  }
};

export default getInventoriesByUserIdAndCompanyId;
