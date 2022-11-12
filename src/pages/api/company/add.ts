import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { USERS, COMPANIES } = TableNames;

const addCompany = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userUid, company } = req.body;

    if (!userUid) {
      res.status(400).end('User uid is mandatory to add a company');
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

    await firestoreAdmin
      .collection(USERS)
      .doc(userUid)
      .collection(COMPANIES)
      .doc(company.uid)
      .set(company);

    res.status(200).json(company);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when adding company', e);
    res.status(400).end(e);
  }
};

export default addCompany;
