/* eslint-disable no-console */
import { getCookie, setCookie } from 'cookies-next';
import { sessionCookieName } from 'firebaseFolder/constant';
import { AuthFirebaseErrorCodes } from 'firebaseFolder/errorCodes';
import { authAdmin } from 'firebaseFolder/serverApp';
import type { NextApiRequest, NextApiResponse } from 'next';

const checkUserSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionCookie = getCookie(sessionCookieName, { req, res });

  if (!sessionCookie) return res.status(400).end('No session cookie');

  try {
    const decodedClaims = await authAdmin.verifySessionCookie(
      sessionCookie as string,
      true /** checkRevoked */
    );
    return res.status(200).json(decodedClaims.uid);
  } catch (error: any) {
    if (error.code === AuthFirebaseErrorCodes.SessionCookieRevoked) {
      // TODO : Session cookie is revoked. cannot be set ATM, waiting for vercel to add the ability to do it.
      setCookie(sessionCookieName, null, { req, res });
    }
    // eslint-disable-next-line no-console
    console.log('error decodedClaims', error);
    return res.status(400).end('User not found');
  }
};

export default checkUserSession;
