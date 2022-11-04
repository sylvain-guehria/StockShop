import type { Auth } from 'firebase/auth';
import { sessionCookieName } from 'firebaseFolder/constant';
import { FirebaseAuthenticationError } from 'firebaseFolder/errorCodes';
import Cookies from 'js-cookie';

type LoginWithEmailParamsType = {
  signOut: (auth: Auth) => Promise<void>;
  auth: Auth;
};

export const logout =
  () =>
  async ({ signOut, auth }: LoginWithEmailParamsType) => {
    try {
      await signOut(auth);
      const sessionCookie = Cookies.get(sessionCookieName);
      console.log(
        'process.env.NEXT_PUBLIC_CLIENT_URL',
        process.env.NEXT_PUBLIC_CLIENT_URL
      );
      await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/sessionLogout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: `${sessionCookieName}=${sessionCookie}`,
        },
      });
    } catch (error: any) {
      throw new FirebaseAuthenticationError(error.code);
    }
  };
