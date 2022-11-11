import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { USERS } = TableNames;

const getCompanyByUserId = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { userId },
    method,
  } = req;

  console.log('userId-************************', userId);
  console.log('method***********************', method);

  if (!userId) {
    res.status(400).end('User uid is mandatory');
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

  const userCompaniesRef = await firestoreAdmin
    .collection(USERS)
    .doc(userId as string)
    .collection(TableNames.COMPANIES);

  const snapshotUserCompaniesCount = await userCompaniesRef.count().get();

  if (snapshotUserCompaniesCount.data().count === 0) {
    // eslint-disable-next-line no-console
    console.log(`User with uid ${userId} has no companies`);
    res.status(200).end();
    return;
  }

  const snapshotUserCompanies = await userCompaniesRef.get();

  try {
    switch (method) {
      case 'GET':
        res.status(200).json(snapshotUserCompanies.docs[0]?.data());
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

export default getCompanyByUserId;
