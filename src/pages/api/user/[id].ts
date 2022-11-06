import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

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

  const userRef = await firestoreAdmin
    .collection(USERS)
    .doc(id as string)
    .get();

  const userDoc = await firestoreAdmin.collection(USERS).doc(id as string);

  try {
    switch (method) {
      case 'GET':
        if (!userRef.exists) {
          res.status(400).end(`User with id ${id} does not exist`);
          return;
        }
        res.status(200).json(userRef.data());
        return;
      case 'PUT':
        userDoc.update({ ...req.body });
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
