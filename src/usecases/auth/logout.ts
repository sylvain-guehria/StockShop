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
      const cookies = Cookies.get();
      const sessionCookie = cookies ? cookies[sessionCookieName] : '';

      if (sessionCookie) {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sessionLogout`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Cookie: `${sessionCookieName}=${sessionCookie}`,
          },
        });
        Cookies.remove(sessionCookieName);
      }
      await signOut(auth);
    } catch (error: any) {
      throw new FirebaseAuthenticationError({
        errorCode: error.code,
        message: error.message,
      });
    }
  };
