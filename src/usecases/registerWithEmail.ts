import type { NextRouter } from 'next/router';

import type userRepository from '../modules/user/userRepository';
import { PROVIDERS } from '../modules/user/userType';

export const registerWithEmail =
  (userRepository: userRepository) =>
  async (
    signUpEmail,
    router: NextRouter,
    { email, password, confirmPassword, acceptTerms }: RegisterInfo
  ): Promise<void> => {
    const response = (await signUpEmail(email, password)) || {};
    const uid = response?.uid;
    if (uid) {
      await userRepository.add({
        uid,
        email,
        firstName,
        lastName,
        provider: PROVIDERS.EMAIL,
      });
      router.push('/');
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
  confirmPassword: string;
  acceptTerms: boolean;
};
