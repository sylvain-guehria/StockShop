import type { NextApiRequest, NextApiResponse } from 'next';

const addProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { product, userId, companyId } = req.body;
  const { inventoryId } = product;

  try {
    res.status(200).json({ inventoryId, userId, companyId });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when adding inventory', e);
    res.status(400).end();
  }
};

export default addProduct;
