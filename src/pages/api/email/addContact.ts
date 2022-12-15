import type { NextApiRequest, NextApiResponse } from 'next';

import createSendinblueContact from '@/sendinblue/addContact';

const addContact = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    email,
    listIds,
  }: {
    email: string;
    listIds: number[];
  } = req.body;

  const success = await createSendinblueContact({
    email,
    listIds,
  });
  return res.status(success ? 200 : 400).end();
};

export default addContact;
