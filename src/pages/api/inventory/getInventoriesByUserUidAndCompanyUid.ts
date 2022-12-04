import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { USERS, COMPANIES, INVENTORIES } = TableNames;

const getInventoriesByUserUidAndCompanyUid = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { userUid, companyUid },
    method,
  } = req;

  if (!userUid) {
    res.status(400).end('User uid is mandatory to get inventories');
    return;
  }

  if (!companyUid) {
    res.status(400).end('Company uid is mandatory to get inventories');
    return;
  }

  // THIS IS AN EXCELLENT CHECKING BUT TO EXPENSIVE do we need it?

  // const userRef = await firestoreAdmin
  //   .collection(USERS)
  //   .doc(userUid as string)
  //   .get();

  // if (!userRef.exists) {
  //   // eslint-disable-next-line no-console
  //   console.log(`User with uid ${userUid} not found`);
  //   res.status(200).end([]);
  //   return;
  // }

  // const companyRef = await firestoreAdmin
  //   .collection(USERS)
  //   .doc(userUid as string)
  //   .collection(COMPANIES)
  //   .doc(companyUid as string)
  //   .get();

  // if (!companyRef.exists) {
  //   // eslint-disable-next-line no-console
  //   console.log(`Company with uid ${companyUid} not found`);
  //   res.status(200).end('[]');
  //   return;
  // }

  const inventoriesRef = await firestoreAdmin
    .collection(USERS)
    .doc(userUid as string)
    .collection(COMPANIES)
    .doc(companyUid as string)
    .collection(INVENTORIES);

  const snapshotInventoriesCount = await inventoriesRef.count().get();

  if (snapshotInventoriesCount.data().count === 0) {
    // eslint-disable-next-line no-console
    console.log(
      `Company uid ${companyUid}, User uid ${userUid} has  no inventory`
    );
    res.status(200).end('[]');
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
    res.status(400).end('[]');
  }
};

export default getInventoriesByUserUidAndCompanyUid;
