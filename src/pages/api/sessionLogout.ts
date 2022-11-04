import { getCookie, setCookie } from 'cookies-next';
import { sessionCookieName } from 'firebaseFolder/constant';
import { authAdmin } from 'firebaseFolder/serverApp';
import type { NextApiRequest, NextApiResponse } from 'next';

const sessionLogout = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionCookie = getCookie(sessionCookieName, { req, res });

  if (!sessionCookie) return res.status(400).end('No session cookie');

  try {
    const decodedClaims = await authAdmin.verifySessionCookie(
      sessionCookie as string
    );
    await authAdmin.revokeRefreshTokens(decodedClaims.sub);
    setCookie('session', null, { req, res });
    return res.status(200).end('Session revoked');
  } catch (error: any) {
    return res.status(400).end(error).redirect('/');
  }
};

export default sessionLogout;
