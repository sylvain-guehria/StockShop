import { setCookie } from 'cookies-next';
import { authAdmin } from 'firebaseFolder/serverApp';
import type { NextApiRequest, NextApiResponse } from 'next';

const sessionInit = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idToken } = req.body;

  const towWeeksInMillisSeconds = 14 * 24 * 60 * 60 * 1000;
  const towWeeksInSeconds = towWeeksInMillisSeconds / 1000;

  try {
    const sessionToken = await authAdmin.createSessionCookie(idToken, {
      expiresIn: towWeeksInMillisSeconds,
    });

    setCookie('session', sessionToken, { req, res, maxAge: towWeeksInSeconds });

    return res.status(200).end();
  } catch (e: any) {
    return res.status(400).end('Failed to create a session cookie', e.message);
  }
};

export default sessionInit;
