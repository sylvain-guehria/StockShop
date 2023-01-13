import type UserEntity from '@/modules/user/UserEntity';
import type { UserRepository } from '@/modules/user/userRepository';

export type LoginWithGoogleParamsType = {};

export const loginWithGoogle =
  (userRepository: UserRepository) =>
  async ({}: LoginWithGoogleParamsType): Promise<UserEntity> => {
    return null;
  };
