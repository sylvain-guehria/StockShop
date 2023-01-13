import type { NextApiRequest, NextApiResponse } from 'next';

const getInventoriesByUserUidAndCompanyUid = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { userUid, companyUid },
    method,
  } = req;

  try {
    switch (method) {
      case 'GET':
        res.status(200).json({ userUid, companyUid });
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

export default getInventoriesByUserUidAndCompanyUid;
