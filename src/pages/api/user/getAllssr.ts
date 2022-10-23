import type { DocumentData } from '@firebase/firestore';
// @ts-ignore
import firestore from 'firebaseFolder/firestore';

const getAllUsers = async (
  _req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: any): void; new (): any };
      end: { (): void; new (): any };
    };
  }
) => {
  try {
    const users = await firestore.collection('users').get();
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
