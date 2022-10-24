import type { NextRouter } from 'next/router';

import type UserRepository from '../modules/user/userRepository';
import { PROVIDERS, ROLES } from '../modules/user/userType';

export const registerWithEmail =
  (userRepository: UserRepository) =>
  async (
    signUpEmail: (
      email: string,
      password: string
    ) => Promise<string | void | null>,
    router: NextRouter,
    { email, password }: RegisterInfo
  ): Promise<void> => {
    let uid = '';

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

type RegisterInfo = {
  email: string;
  password: string;
};
