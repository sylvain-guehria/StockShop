import { AuthFirebaseErrorCodes } from 'firebaseFolder/errorCodes';
import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames, UserAttibutes } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { USERS } = TableNames;
const { EMAIL } = UserAttibutes;

const addUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const usersRef = collection(firestore, USERS);
    const { ...user } = req.body;

    const usersRef = firestoreAdmin.collection(USERS);

    const usersSnapShot = await usersRef.where(EMAIL, '==', user.email).get();

    if (!usersSnapShot.empty) {
      res.status(400).end(AuthFirebaseErrorCodes.EmailAlreadyInUse);
      return;
    }

    const userRef = await firestoreAdmin.collection(USERS).doc(user.uid).get();

    if (userRef.exists) {
      res.statusMessage = `A user already has this uid : ${user.uid}, cannot create new user`;
      res.status(400).end(AuthFirebaseErrorCodes.EmailAlreadyInUse);
      return;
    }

    await firestoreAdmin.collection(USERS).doc(user.uid).set(user);
    res.status(200).json(user.uid);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when adding user', e);
    res.status(400).end();
  }
};

export default addUser;
