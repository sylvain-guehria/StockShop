import type { DocumentData } from '@firebase/firestore';
import { firestoreAdmin } from 'firebaseFolder/serverApp';
import type { NextApiRequest, NextApiResponse } from 'next';

const getAllUsers = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await firestoreAdmin.collection('users').get();
    const usersData = users.docs.map((user: DocumentData) => ({
      id: user.id,
      ...user.data(),
    }));
    res.status(200).json(usersData);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when fetching users', e);
    res.status(400).end();
  }
};

export default getAllUsers;
