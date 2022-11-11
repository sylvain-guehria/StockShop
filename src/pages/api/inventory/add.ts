import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidV4 } from 'uuid';

const { USERS, COMPANIES, INVENTORIES } = TableNames;

const addInventory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, companyId } = req.body;

    if (!userId) {
      res.status(400).end('User uid is mandatory to add inventories');
      return;
    }

    if (!companyId) {
      res.status(400).end('Company uid is mandatory to add inventories');
      return;
    }

    const userRef = await firestoreAdmin
      .collection(USERS)
      .doc(userId as string)
      .get();

    if (!userRef.exists) {
      res.status(404).end(`User with uid ${userId} found`);
      return;
    }

    const companyRef = await firestoreAdmin
      .collection(USERS)
      .doc(userId as string)
      .collection(COMPANIES)
      .doc(companyId as string)
      .get();

    if (!companyRef.exists) {
      res.status(404).end(`Company with uid ${companyId} not found`);
      return;
    }

    const inventoriesRef = await firestoreAdmin
      .collection(USERS)
      .doc(userId as string)
      .collection(COMPANIES)
      .doc(companyId as string)
      .collection(INVENTORIES);

    const snapshotInventoriesCount = await inventoriesRef.count().get();

    const uid = uuidV4();

    const defaultInventory = {
      uid,
      name: `Inventaire N°${snapshotInventoriesCount.data().count + 1}`,
    };

    await firestoreAdmin
      .collection(USERS)
      .doc(userId)
      .collection(COMPANIES)
      .doc(companyId)
      .collection(INVENTORIES)
      .doc(uid)
      .set(defaultInventory);

    res.status(200).json(defaultInventory);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when adding inventory', e);
    res.status(400).end();
  }
};

export default addInventory;
