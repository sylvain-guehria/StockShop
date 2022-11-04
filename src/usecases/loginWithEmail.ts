import type { AxiosStatic } from 'axios';
import type { Auth, UserCredential } from 'firebase/auth';
import { FirebaseAuthenticationError } from 'firebaseFolder/errorCodes';

type LoginWithEmailParamsType = {
  signInWithEmailAndPassword: (
    auth: Auth,
    email: string,
    password: string
  ) => Promise<UserCredential>;
  email: string;
  password: string;
  auth: Auth;
  axios: AxiosStatic;
};

export const loginWithEmail =
  () =>
  async ({
    signInWithEmailAndPassword,
    email,
    password,
    auth,
    axios,
  }: LoginWithEmailParamsType) => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();

      await axios.post('/api/sessionInit', {
        idToken,
      });
    } catch (error: any) {
      throw new FirebaseAuthenticationError(error.code);
    }
  };
