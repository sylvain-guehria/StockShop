import type { Auth } from 'firebase/auth';
import Cookies from 'js-cookie';

import { sessionCookieName } from '../../firebaseFolder/constant';
import { FirebaseAuthenticationError } from '../../firebaseFolder/errorCodes';

type LoginWithEmailParamsType = {
  signOut: (auth: Auth) => Promise<void>;
  auth: Auth;
};

export const logout =
  () =>
  async ({ signOut, auth }: LoginWithEmailParamsType) => {
    try {
      await signOut(auth);
      const cookies = Cookies.get();
      const sessionCookie = cookies ? cookies[sessionCookieName] : '';

      await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/sessionLogout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: `${sessionCookieName}=${sessionCookie}`,
        },
      });
      Cookies.remove(sessionCookieName);
    } catch (error: any) {
      throw new FirebaseAuthenticationError(error.code);
    }
  };
