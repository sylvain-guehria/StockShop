import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { USERS, COMPANIES, INVENTORIES, PRODUCTS } = TableNames;

const addProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { product, userUid, companyUid, inventoryUid } = req.body;

    if (!userUid) {
      res.status(400).end('User uid is mandatory to add a product');
      return;
    }

    if (!companyUid) {
      res.status(400).end('Company uid is mandatory to add product');
      return;
    }

    if (!inventoryUid) {
      res.status(400).end('Inventory uid is mandatory to add product');
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

    const inventoryRef = await firestoreAdmin
      .collection(USERS)
      .doc(userUid)
      .collection(COMPANIES)
      .doc(companyUid)
      .collection(INVENTORIES)
      .doc(inventoryUid)
      .get();

    if (!inventoryRef.exists) {
      res.status(404).end(`Inventory with uid ${inventoryUid} not found`);
      return;
    }

    await firestoreAdmin
      .collection(USERS)
      .doc(userUid)
      .collection(COMPANIES)
      .doc(companyUid)
      .collection(INVENTORIES)
      .doc(inventoryUid)
      .collection(PRODUCTS)
      .doc(product.uid)
      .set(product);

    res.status(200).json(product);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when adding inventory', e);
    res.status(400).end();
  }
};

export default addProduct;
