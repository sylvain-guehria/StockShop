import type { NextApiRequest, NextApiResponse } from 'next';

const inventoryById = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  const { userId, companyId } = req.body;

  const inventory = {
    id: req.body.id,
    name: req.body.name,
    isPublic: req.body.isPublic,
    isDefaultInventory: req.body.isDefaultInventory,
    color: req.body.color,
  };

  if (!id) {
    res.status(400).end('Inventory id is mandatory to update an inventory');
    return;
  }

  if (!userId) {
    res.status(400).end('userId is mandatory to update an inventory');
    return;
  }

  if (!companyId) {
    res.status(400).end('companyId is mandatory to update an inventory');
    return;
  }

  try {
    switch (method) {
      case 'GET':
        res.status(200).json(inventory);
        return;
      case 'PUT':
        res.status(200).end();
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

export default inventoryById;
