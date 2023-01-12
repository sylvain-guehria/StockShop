import { getCookie, setCookie } from 'cookies-next';
import { sessionCookieName } from 'firebaseFolder/constant';
import { authAdmin } from 'firebaseFolder/serverApp';
import type { NextApiRequest, NextApiResponse } from 'next';

const sessionLogout = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionCookie = getCookie(sessionCookieName, { req, res });

  if (!sessionCookie) return res.status(400).end('No session cookie');

  setCookie('session', null, { req, res });

  await authAdmin
    .verifySessionCookie(sessionCookie as string)
    .then((decodedClaims) => authAdmin.revokeRefreshTokens(decodedClaims.sub))
    // eslint-disable-next-line no-console
    .catch((error) => console.log(error));
  return res.status(200).end('Session Cookie deleted');
};

export default sessionLogout;
