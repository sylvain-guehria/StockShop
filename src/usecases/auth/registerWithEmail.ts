import type { AxiosStatic } from 'axios';

import type UserEntity from '@/modules/user/UserEntity';
import type { UserRepository } from '@/modules/user/userRepository';

type RegisterWithEmailParams = {
  email: string;
  password: string;
  axios: AxiosStatic;
};

export const registerWithEmail =
  (userRepository: UserRepository) =>
  async ({
    email,
    password,
    axios,
  }: RegisterWithEmailParams): Promise<UserEntity> => {
    return email;
  };
