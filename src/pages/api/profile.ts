import { authAdmin } from 'firebaseFolder/serverApp';
import type { NextApiRequest, NextApiResponse } from 'next';

const sessionInit = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sessionCookie } = req.body;

  //   const sessionCookie = getCookie('session', { req, res });

  if (!sessionCookie) return res.status(401).end();

  try {
    const decodedClaims = await authAdmin.verifySessionCookie(
      sessionCookie,
      true /** checkRevoked */
    );
    return res.status(200).json(decodedClaims);
  } catch (error: any) {
    return res.redirect('/');
  }
};

export default sessionInit;
