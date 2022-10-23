import { firestore, firestoreFunctions } from 'firebaseFolder/clientApp';

const { getDocs, collection } = firestoreFunctions;

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
