import { firestore, firestoreFunctions } from 'firebaseFolder/clientApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

const { updateDoc, doc, getDoc } = firestoreFunctions;
const { USERS } = TableNames;

const userById = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  if (!id) {
    res.status(400).end('User uid is mandatory');
    return;
  }

  const userRef = doc(firestore, USERS, id as string);
  const userSnapshot = await getDoc(userRef);

  try {
    switch (method) {
      case 'GET':
        if (!userSnapshot.exists()) {
          res.status(400).end(`User with id ${id} does not exist`);
          return;
        }
        res.status(200).json(userSnapshot.data());
        return;
      case 'PUT':
        await updateDoc(userRef, {
          ...req.body,
        });
        res.status(200).end();
        return;
      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    res.status(400).end();
  }
};

export default userById;
