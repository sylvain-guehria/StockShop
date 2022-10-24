import type { UserRepository } from '../modules/user/userRepository';
import { PROVIDERS, ROLES } from '../modules/user/userType';

export const registerWithEmail =
  (userRepository: UserRepository) =>
  async (
    signUpEmail: (
      email: string,
      password: string
    ) => Promise<string | void | null>,
    { email, password }: RegisterInfo
  ): Promise<string> => {
    let uid = '';

    try {
      uid = await userRepository.add({
        email,
        provider: PROVIDERS.EMAIL,
        role: ROLES.USER,
      });
    } catch (e) {
      throw new Error('Error userRepository.add');
    }

    if (uid) {
      const response = await signUpEmail(email, password);
      if (response === email) return email;
      await userRepository.delete(uid);
      return response || '';
    }
    return '';
  };

type RegisterInfo = {
  email: string;
  password: string;
};
