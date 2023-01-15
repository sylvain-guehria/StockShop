import type { UserRepository } from '@/modules/user/userRepository';

type RegisterWithEmailParams = {
  email: string;
  password: string;
};

export const registerWithEmail =
  (_userRepository: UserRepository) =>
  async ({ email, password }: RegisterWithEmailParams): Promise<any> => {
    return { email, password };
  };
