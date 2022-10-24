import { firestore, firestoreFunctions } from 'firebaseFolder/clientApp';
import type { NextApiRequest, NextApiResponse } from 'next';

const { getDocs, collection } = firestoreFunctions;

const getAllUsers = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'users'));
    const usersData = querySnapshot.forEach((doc) => doc.data());
    res.status(200).json(usersData);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when fetching users', e);
    res.status(400).end();
  }
};

export default getAllUsers;
