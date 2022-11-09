import { getCookie, setCookie } from 'cookies-next';
import { sessionCookieName } from 'firebaseFolder/constant';
import { AuthFirebaseErrorCodes } from 'firebaseFolder/errorCodes';
import { authAdmin } from 'firebaseFolder/serverApp';
import type { NextApiRequest, NextApiResponse } from 'next';

const profile = async (req: NextApiRequest, res: NextApiResponse) => {
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
      // TODO : Session cookie is revoked. Force user to login => NOT WORKING.
      setCookie(sessionCookieName, null, { req, res });
    }
    return res.status(400).end('User not found');
  }
};

export default profile;