import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { USERS, COMPANIES, INVENTORIES } = TableNames;

const deleteInventory = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { userUid, companyUid, inventoryUid },
    method,
  } = req;

  if (!inventoryUid) {
    res.status(400).end('Inventory uid is mandatory to delete an inventory');
    return;
  }

  if (!userUid) {
    res.status(400).end('userUid is mandatory to delete an inventory');
    return;
  }

  if (!companyUid) {
    res.status(400).end('companyUid is mandatory to delete an inventory');
    return;
  }

  const inventoryRef = await firestoreAdmin
    .collection(USERS)
    .doc(userUid as string)
    .collection(COMPANIES)
    .doc(companyUid as string)
    .collection(INVENTORIES)
    .doc(inventoryUid as string)
    .get();

  const inventoryDoc = await firestoreAdmin
    .collection(USERS)
    .doc(userUid as string)
    .collection(COMPANIES)
    .doc(companyUid as string)
    .collection(INVENTORIES)
    .doc(inventoryUid as string);

  try {
    switch (method) {
      case 'DELETE':
        if (!inventoryRef.exists) {
          res
            .status(400)
            .end(`Inventory with uid ${inventoryUid} does not exist`);
          return;
        }
        inventoryDoc.delete();
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

export default deleteInventory;
