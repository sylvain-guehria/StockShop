import { getCookie, setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { sessionCookieName } from 'superbase/constant';

const sessionLogout = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionCookie = getCookie(sessionCookieName, { req, res });

  if (!sessionCookie) return res.status(400).end('No session cookie');

  setCookie(sessionCookieName, null, { req, res });

  return res.status(200).end('Session Cookie deleted');
};

export default sessionLogout;
