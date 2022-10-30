import UserEntity from '@/modules/user/UserEntity';
import type { UserRepository } from '@/modules/user/userRepository';
import type { LocaleType } from '@/modules/user/userType';
import { PROVIDERS } from '@/modules/user/userType';

export const loginWithGoogle =
  (userRepository: UserRepository) =>
  async (loginGoogle: () => Promise<AuthResponse>): Promise<any> => {
    const response = await loginGoogle();
    const { isNewUser, uid, email, firstName, lastName, locale } = response;

    if (isNewUser) {
      await userRepository.add(
        UserEntity.new({
          uid,
          email,
          firstName,
          lastName,
          locale,
          provider: PROVIDERS.GOOGLE,
        })
      );
    }
    return Promise.resolve(response);
  };

type AuthResponse = {
  uid: string;
  email: string;
  isNewUser: boolean;
  firstName: string;
  lastName: string;
  locale: LocaleType;
};
