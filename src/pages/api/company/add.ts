import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidV4 } from 'uuid';

const { USERS, COMPANIES } = TableNames;

const addCompany = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = req.body;

    const userRef = await firestoreAdmin
      .collection(USERS)
      .doc(userId as string)
      .get();

    if (!userRef.exists) {
      res.status(404).end(`User with uid ${userId} found`);
      return;
    }

    const uid = uuidV4();

    const defaultCompany = {
      uid,
      name: 'Mon entreprise',
    };

    await firestoreAdmin
      .collection(USERS)
      .doc(userId)
      .collection(COMPANIES)
      .doc()
      .set(defaultCompany);

    res.status(200).json(defaultCompany);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when adding user', e);
    res.status(400).end();
  }
};

export default addCompany;
