import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { USERS } = TableNames;

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid } = req.body;

    const userRef = await firestoreAdmin
      .collection(USERS)
      .doc(uid as string)
      .get();

    const userDoc = await firestoreAdmin.collection(USERS).doc(uid as string);

    if (!userRef.exists) {
      res.statusMessage = `User with uid : ${uid} does not exist`;
      res.status(400).end();
      return;
    }

    await userDoc.delete();
    res.status(200).end();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when saving user', e);
    res.status(400).end();
  }
};

export default deleteUser;
