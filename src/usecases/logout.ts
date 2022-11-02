import type { AxiosStatic } from 'axios';
import type { Auth } from 'firebase/auth';
import { FirebaseAuthenticationError } from 'firebaseFolder/errorCodes';

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
      return await axios.post('/api/sessionLogout');
    } catch (error: any) {
      throw new FirebaseAuthenticationError(error.code);
    }
  };
