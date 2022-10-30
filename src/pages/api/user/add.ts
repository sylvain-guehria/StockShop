import { firestore, firestoreFunctions } from 'firebaseFolder/clientApp';
import { AuthFirebaseErrorCodes } from 'firebaseFolder/errorCodes';
import { TableNames, UserAttibutes } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { USERS } = TableNames;
const { EMAIL } = UserAttibutes;

const { collection, query, where, getDocs, setDoc, doc, getDoc } =
  firestoreFunctions;

// CLIENT SIDE
const addUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const usersRef = collection(firestore, USERS);
    const { ...user } = req.body;

    const q = query(
      collection(firestore, USERS),
      where(EMAIL, '==', user.email)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size) {
      res.status(400).end(AuthFirebaseErrorCodes.EmailAlreadyInUse);
      return;
    }

    const docRef = doc(firestore, USERS, user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      res.statusMessage = `A user already has this uid : ${user.uid}, cannot create new user`;
      res.status(400).end();
      return;
    }

    await setDoc(doc(usersRef, user.uid), user);
    res.status(200).json(user.uid);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when adding user', e);
    res.status(400).end();
  }
};

export default addUser;
