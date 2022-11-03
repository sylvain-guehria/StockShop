import { setCookie } from 'cookies-next';
import { authAdmin } from 'firebaseFolder/serverApp';
import type { NextApiRequest, NextApiResponse } from 'next';

const sessionLogout = async (req: NextApiRequest, res: NextApiResponse) => {
  // const sessionCookie = req.cookies.session || '';
  // res.setHeader(
  //   'Set-Cookie',
  //   'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  // );

  const { sessionCookie } = req.body;

  authAdmin
    .verifySessionCookie(sessionCookie)
    .then((decodedClaims) => {
      return authAdmin.revokeRefreshTokens(decodedClaims.sub);
    })
    .then(() => {
      setCookie('session', null, { req, res });
      return res.status(200).end().redirect('/');
    })
    .catch((error) => {
      return res.status(400).end(error).redirect('/');
    });
};

export default sessionLogout;
