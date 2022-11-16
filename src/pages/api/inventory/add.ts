import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { USERS, COMPANIES, INVENTORIES } = TableNames;

const addInventory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { inventory, userUid, companyUid } = req.body;

    if (!userUid) {
      res.status(400).end('User uid is mandatory to add inventories');
      return;
    }

    if (!companyUid) {
      res.status(400).end('Company uid is mandatory to add inventories');
      return;
    }

    const userRef = await firestoreAdmin
      .collection(USERS)
      .doc(userUid as string)
      .get();

    if (!userRef.exists) {
      res.status(404).end(`User with uid ${userUid} found`);
      return;
    }

    const companyRef = await firestoreAdmin
      .collection(USERS)
      .doc(userUid as string)
      .collection(COMPANIES)
      .doc(companyUid as string)
      .get();

    if (!companyRef.exists) {
      res.status(404).end(`Company with uid ${companyUid} not found`);
      return;
    }

    await firestoreAdmin
      .collection(USERS)
      .doc(userUid)
      .collection(COMPANIES)
      .doc(companyUid)
      .collection(INVENTORIES)
      .doc(inventory.uid)
      .set(inventory);

    res.status(200).json(inventory);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when adding inventory', e);
    res.status(400).end();
  }
};

export default addInventory;
