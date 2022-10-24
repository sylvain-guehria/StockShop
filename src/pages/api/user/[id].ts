import type { NextApiRequest, NextApiResponse } from 'next';

const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  // const { id } = req.query;
  try {
    if (req.method === 'PUT') {
      // await firestore
      //   .collection('users')
      //   .doc(id)
      //   .update({
      //     ...req.body,
      //   });
    } else if (req.method === 'GET') {
      // const doc = await firestore.collection('users').doc(id).get();
      // if (!doc.exists) {
      //   // res.status(200).end();
      // } else {
      //   res.status(200).json(doc.data());
      // }
    } else if (req.method === 'DELETE') {
      // await firestore.collection('users').doc(id).delete();
    }
    res.status(200).end();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    res.status(400).end();
  }
};

export default getUserById;
