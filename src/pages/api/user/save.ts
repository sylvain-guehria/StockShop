import { firestore, firestoreFunctions } from 'firebaseFolder/clientApp';
import { TableNames, UserAttibutes } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { USERS } = TableNames;
const { EMAIL } = UserAttibutes;

const { collection, query, where, getDocs, setDoc, doc } = firestoreFunctions;

// CLIENT SIDE
const saveUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const usersRef = collection(firestore, USERS);
    const { uid, email, provider } = req.body;

    const q = query(collection(firestore, USERS), where(EMAIL, '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size) {
      res.statusMessage = 'Cet email est déjà utilisé.';
      res.status(400).end();
    }

    const docRef = firestoreFunctions.doc(firestore, USERS, uid);
    const docSnap = await firestoreFunctions.getDoc(docRef);

    if (docSnap.exists()) {
      res.statusMessage = `A user already has this uid : ${uid}, cannot create new user`;
      res.status(400).end();
    }

    await setDoc(doc(usersRef, uid), {
      uid,
      email,
      provider,
    });
    res.status(200).json(uid);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when saving user', e);
    res.status(400).end();
  }
};

export default saveUser;
