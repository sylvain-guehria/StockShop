import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { USERS, COMPANIES, INVENTORIES } = TableNames;

const getInventoriesByUserIdAndCompanyId = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { userId, companyId },
    method,
  } = req;

  if (!userId) {
    res.status(400).end('User uid is mandatory to get inventories');
    return;
  }

  if (!companyId) {
    res.status(400).end('Company uid is mandatory to get inventories');
    return;
  }

  const userRef = await firestoreAdmin
    .collection(USERS)
    .doc(userId as string)
    .get();

  if (!userRef.exists) {
    res.status(404).end(`User with uid ${userId} not found`);
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

  if (snapshotInventoriesCount.data().count === 0) {
    // eslint-disable-next-line no-console
    console.log(
      `Company uid ${companyId}, User uid ${userId} has  no inventory`
    );
    res.status(200).end();
    return;
  }

  const snapshotInventries = await inventoriesRef.get();

  try {
    switch (method) {
      case 'GET':
        res.status(200).json(snapshotInventries.docs.map((doc) => doc.data()));
        return;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    res.status(400).end();
  }
};

export default getInventoriesByUserIdAndCompanyId;
