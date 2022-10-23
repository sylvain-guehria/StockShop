import type { NextRouter } from 'next/router';

import type userRepository from '../modules/user/userRepository';
import { PROVIDERS, ROLES } from '../modules/user/userType';

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
        role: ROLES.USER,
      });
    } catch (e) {
      throw new Error('Error userRepository.add', e);
    }

    // SIGN UP IN FIREBASE IF SUCCESS IN DB
    if (uid) {
      const success = await signUpEmail(email, password);
      if (success) {
        router.push('/');
        return;
      }
      await userRepository.delete(uid);
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
