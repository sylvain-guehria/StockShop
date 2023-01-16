import type { NextApiRequest, NextApiResponse } from 'next';

const addInventory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { inventory, userId, companyId } = req.body;

    res.status(200).json({ inventory, userId, companyId });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when adding inventory', e);
    res.status(400).end();
  }
};

export default addInventory;
