import type { AxiosStatic } from 'axios';
import type { Auth } from 'firebase/auth';
import { sessionCookieName } from 'firebaseFolder/constant';
import { FirebaseAuthenticationError } from 'firebaseFolder/errorCodes';
import Cookies from 'js-cookie';

type LoginWithEmailParamsType = {
  signOut: (auth: Auth) => Promise<void>;
  auth: Auth;
  axios: AxiosStatic;
};

export const logout =
  () =>
  async ({ signOut, auth, axios }: LoginWithEmailParamsType) => {
    try {
      await signOut(auth);
      const sessionCookie = Cookies.get(sessionCookieName);
      await axios.post('/api/sessionLogout', {
        sessionCookie,
      });
    } catch (error: any) {
      throw new FirebaseAuthenticationError(error.code);
    }
  };
