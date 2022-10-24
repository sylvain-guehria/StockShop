import { firestore, firestoreFunctions } from 'firebaseFolder/clientApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { USERS } = TableNames;

const { deleteDoc, doc } = firestoreFunctions;

// CLIENT SIDE
const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid } = req.body;
    const docRef = firestoreFunctions.doc(firestore, USERS, uid);
    const docSnap = await firestoreFunctions.getDoc(docRef);

    if (!docSnap.exists()) {
      res.statusMessage = `User with uid : ${uid} does not exist`;
      res.status(400).end();
      return;
    }

    await deleteDoc(doc(firestore, TableNames.USERS, uid));
    res.status(200).end();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when saving user', e);
    res.status(400).end();
  }
};

export default deleteUser;
