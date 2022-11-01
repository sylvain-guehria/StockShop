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
};

export const loginWithEmail =
  () =>
  async ({
    signInWithEmailAndPassword,
    email,
    password,
    auth,
  }: LoginWithEmailParamsType) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new FirebaseAuthenticationError(error.code);
    }
  };
