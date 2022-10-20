// @ts-ignore
import firestore from 'firebaseFolder/firestore';

const getUserById = async (
  req: { query: { id: any }; method: string; body: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: any): void; new (): any };
      end: { (): void; new (): any };
    };
  }
) => {
  const { id } = req.query;
  try {
    if (req.method === 'PUT') {
      await firestore
        .collection('users')
        .doc(id)
        .update({
          ...req.body,
        });
    } else if (req.method === 'GET') {
      const doc = await firestore.collection('users').doc(id).get();
      if (!doc.exists) {
        // res.status(200).end();
      } else {
        res.status(200).json(doc.data());
      }
    } else if (req.method === 'DELETE') {
      await firestore.collection('users').doc(id).delete();
    }
    res.status(200).end();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    res.status(400).end();
  }
};

export default getUserById;
