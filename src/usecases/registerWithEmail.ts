import type { NextRouter } from 'next/router';

import type userRepository from '../modules/user/userRepository';
import { PROVIDERS } from '../modules/user/userType';

export const registerWithEmail =
  (userRepository: userRepository) =>
  async (
    signUpEmail: (arg0: string, arg1: string) => any,
    router: NextRouter,
    { email, password }: RegisterInfo
  ): Promise<void> => {
    let uid = '';

    // ADD IN DB
    try {
      uid = await userRepository.add({
        email,
        provider: PROVIDERS.EMAIL,
      });
    } catch (e) {
      throw new Error('Error userRepository.add', e);
    }
    // eslint-disable-next-line no-console
    console.log('registeredWithEmail with uid : ', uid);

    // SIGN UP IN FIREBASE IF SUCCESS IN DB
    if (uid) {
      try {
        await signUpEmail(email, password);
        router.push('/');
      } catch (e) {
        // DELETE USER ADDED BEFORE
        throw new Error('Error firebase signUpEmail', e);
      }
    }
  };

type AuthResponse = {
  uid: string | undefined;
  email: string | null | undefined;
  firstName: string | undefined;
};

type RegisterInfo = {
  email: string;
  password: string;
};
