import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { USERS, COMPANIES, INVENTORIES } = TableNames;

const inventoryByUid = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { uid },
    method,
  } = req;

  const { userUid, companyUid } = req.body;

  const inventory = {
    uid: req.body.uid,
    name: req.body.name,
    isPublic: req.body.isPublic,
    isDefaultInventory: req.body.isDefaultInventory,
    color: req.body.color,
  };

  if (!uid) {
    res.status(400).end('Inventory uid is mandatory to update an inventory');
    return;
  }

  if (!userUid) {
    res.status(400).end('userUid is mandatory to update an inventory');
    return;
  }

  if (!companyUid) {
    res.status(400).end('companyUid is mandatory to update an inventory');
    return;
  }

  const inventoryRef = await firestoreAdmin
    .collection(USERS)
    .doc(userUid as string)
    .collection(COMPANIES)
    .doc(companyUid as string)
    .collection(INVENTORIES)
    .doc(uid as string)
    .get();

  const inventoryDoc = await firestoreAdmin
    .collection(USERS)
    .doc(userUid as string)
    .collection(COMPANIES)
    .doc(companyUid as string)
    .collection(INVENTORIES)
    .doc(uid as string);

  try {
    switch (method) {
      case 'GET':
        if (!inventoryRef.exists) {
          res.status(400).end(`Inventory with uid ${uid} does not exist`);
          return;
        }
        res.status(200).json(inventoryRef.data());
        return;
      case 'PUT':
        if (!inventoryRef.exists) {
          res.status(400).end(`Inventory with uid ${uid} does not exist`);
          return;
        }
        inventoryDoc.update(inventory);
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

export default inventoryByUid;
