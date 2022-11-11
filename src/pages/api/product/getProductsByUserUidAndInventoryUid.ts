import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { USERS, COMPANIES, INVENTORIES, PRODUCTS } = TableNames;

const getProductsByUserUidAndInventoryUid = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { userUid, inventoryUid },
    method,
  } = req;

  if (!userUid) {
    // eslint-disable-next-line no-console
    console.log('User uid is mandatory to get products');
    res.status(400).end('[]');
    return;
  }

  if (!inventoryUid) {
    // eslint-disable-next-line no-console
    console.log('Inventory uid is mandatory to get products');
    res.status(400).end('[]');
    return;
  }

  const userRef = await firestoreAdmin
    .collection(USERS)
    .doc(userUid as string)
    .get();

  if (!userRef.exists) {
    // eslint-disable-next-line no-console
    console.log(`User with uid ${userUid} not found`);
    res.status(200).end('[]');
    return;
  }

  const companiesRef = await firestoreAdmin
    .collection(USERS)
    .doc(userUid as string)
    .collection(COMPANIES);

  const snapshotCompanyCount = await companiesRef.count().get();

  if (snapshotCompanyCount.data().count === 0) {
    // eslint-disable-next-line no-console
    console.log(`No company found for user with uid ${userUid}`);
    res.status(200).end('[]');
    return;
  }

  const snapshotCompanies = await companiesRef.get();
  const companies = snapshotCompanies.docs.map((doc) => doc.data());
  const company = companies[0];
  const companyUid = company?.uid;

  const inventoriesRef = await firestoreAdmin
    .collection(USERS)
    .doc(userUid as string)
    .collection(COMPANIES)
    .doc(companyUid as string)
    .collection(INVENTORIES)
    .doc(inventoryUid as string)
    .get();

  if (inventoriesRef.exists) {
    // eslint-disable-next-line no-console
    console.log(
      `Inventory ${inventoryUid}, Company uid ${companyUid}, User uid ${userUid} does not exist`
    );
    res.status(200).end('[]');
    return;
  }

  const productsRef = await firestoreAdmin
    .collection(USERS)
    .doc(userUid as string)
    .collection(COMPANIES)
    .doc(companyUid as string)
    .collection(INVENTORIES)
    .doc(inventoryUid as string)
    .collection(PRODUCTS)
    .get();

  try {
    switch (method) {
      case 'GET':
        res.status(200).json(productsRef.docs.map((doc) => doc.data()));
        return;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    res.status(400).end('[]');
  }
};

export default getProductsByUserUidAndInventoryUid;
