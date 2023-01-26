import type { NextApiRequest, NextApiResponse } from 'next';

const addCompany = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, company } = req.body;

    if (!userId) {
      return res.status(400).end('User id is mandatory to add a company');
    }

    return res.status(200).json(company);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error when adding company', e);
    return res.status(400).end(e);
  }
};

export default addCompany;
