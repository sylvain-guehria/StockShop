import type { AxiosStatic } from 'axios';
import type { UserCredential } from 'firebase/auth';

import type { UserRepository } from '@/modules/user/userRepository';

type LoginWithEmailParamsType = {
  signInWithEmailAndPassword: any;
  email: string;
  password: string;
  axios: AxiosStatic;
};

export const loginWithEmail =
  (userRepository: UserRepository) =>
  async ({
    email,
    password,
    axios,
    signInWithEmailAndPassword,
  }: LoginWithEmailParamsType) => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();

      await axios.post('/api/sessionInit', { idToken });
      return await userRepository.getById(userCredential.user.uid);
    } catch (error: any) {
      return null;
    }
  };
