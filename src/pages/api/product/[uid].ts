import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { USERS, COMPANIES, INVENTORIES, PRODUCTS } = TableNames;

const productByUid = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { uid },
    method,
  } = req;

  const { userUid, companyUid, inventoryUid } = req.body;

  const product = {
    uid: req.body.uid,
    label: req.body.label,
    description: req.body.description,
    quantityInInventory: req.body.quantityInInventory,
    optimumQuantity: req.body.optimumQuantity,
    buyingPrice: req.body.buyingPrice,
    sellingPrice: req.body.sellingPrice,
    tva: req.body.tva,
    categoryUid: req.body.categoryUid,
    subCategoryUid: req.body.subCategoryUid,
    publicDisponibility: req.body.publicDisponibility,
    isPublic: req.body.isPublic,
    toBuy: req.body.toBuy,
  };

  if (!uid) {
    res.status(400).end('Product uid is mandatory to update a product');
    return;
  }

  if (!userUid) {
    res.status(400).end('userUid is mandatory to update a product');
    return;
  }

  if (!companyUid) {
    res.status(400).end('companyUid is mandatory to update a product');
    return;
  }

  if (!inventoryUid) {
    res.status(400).end('inventoryUid is mandatory to update a product');
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
