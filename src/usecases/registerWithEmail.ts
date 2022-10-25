import UserEntity from '@/modules/user/UserEntity';

import type { UserRepository } from '../modules/user/userRepository';
import { PROVIDERS, ROLES } from '../modules/user/userType';

export const registerWithEmail =
  (userRepository: UserRepository) =>
  async (signUpEmail: SignUpEmailType, { email, password }: RegisterInfo) => {
    try {
      const response = await signUpEmail(email, password);

      if (response?.uid) {
        await userRepository.add(
          UserEntity.new({
            email,
            provider: PROVIDERS.PASSWORD,
            role: ROLES.USER,
            uid: response.uid,
          })
        );
      }
      return response;
    } catch (e) {
      return e;
    }
  };

type RegisterInfo = {
  email: string;
  password: string;
};

type SignUpEmailType = (email: string, password: string) => Promise<any>;
