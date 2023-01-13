import type { NextApiRequest, NextApiResponse } from 'next';

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { userUid, companyUid, inventoryUid, productUid },
    method,
  } = req;

  try {
    switch (method) {
      case 'DELETE':
        res.status(200).end({ userUid, companyUid, inventoryUid, productUid });
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

export default deleteProduct;
