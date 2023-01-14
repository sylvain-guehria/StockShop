/* eslint-disable no-console */
import { getCookie, setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { sessionCookieName } from 'supabase/constant';
import { SupabaseAuthenticationError } from 'supabase/errorCodes';

const checkUserSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionCookie = getCookie(sessionCookieName, { req, res });

  if (!sessionCookie) return res.status(400).end('No session cookie');

  try {
    const decodedClaims = { uid: 'uid' };
    return res.status(200).json(decodedClaims.uid);
  } catch (error: any) {
    if (error.code === SupabaseAuthenticationError.SessionCookieRevoked) {
      // TODO : Session cookie is revoked. cannot be set ATM, waiting for vercel to add the ability to do it.
      setCookie(sessionCookieName, null, { req, res });
    }
    // eslint-disable-next-line no-console
    console.log('error decodedClaims', error);
    return res.status(400).end('User not found');
  }
};

export default checkUserSession;
