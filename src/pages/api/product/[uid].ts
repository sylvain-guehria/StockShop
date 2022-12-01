import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { USERS, COMPANIES, INVENTORIES, PRODUCTS } = TableNames;

const productByUid = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method, body } = req;

  const { uid } = query;

  let userUid;
  let companyUid;
  let inventoryUid;
  let product;

  if (method === 'GET') {
    userUid = query.userUid;
    companyUid = query.companyUid;
    inventoryUid = query.inventoryUid;
  }

  if (method === 'PUT') {
    userUid = body.userUid;
    companyUid = body.companyUid;
    inventoryUid = body.inventoryUid;
    product = body.product;
  }

  if (!uid) {
    res.status(400).end('Product uid is mandatory to get or update a product');
    return;
  }

  if (!userUid) {
    res.status(400).end('userUid is mandatory to get or update a product');
    return;
  }

  if (!companyUid) {
    res.status(400).end('companyUid is mandatory to get or update a product');
    return;
  }

  if (!inventoryUid) {
    res.status(400).end('inventoryUid is mandatory to get or update a product');
    return;
  }

  const productRef = await firestoreAdmin
    .collection(USERS)
    .doc(userUid as string)
    .collection(COMPANIES)
    .doc(companyUid as string)
    .collection(INVENTORIES)
    .doc(inventoryUid as string)
    .collection(PRODUCTS)
    .doc(uid as string)
    .get();

  const productDoc = await firestoreAdmin
    .collection(USERS)
    .doc(userUid as string)
    .collection(COMPANIES)
    .doc(companyUid as string)
    .collection(INVENTORIES)
    .doc(inventoryUid as string)
    .collection(PRODUCTS)
    .doc(uid as string);

  try {
    switch (method) {
      case 'GET':
        if (!productRef.exists) {
          res.status(400).end(`Product with uid ${uid} does not exist`);
          return;
        }
        res.status(200).json({ ...productRef.data(), inventoryUid });
        return;
      case 'PUT':
        if (!productRef.exists) {
          res.status(400).end(`Product with uid ${uid} does not exist`);
          return;
        }
        productDoc.update(product);
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

export default productByUid;
