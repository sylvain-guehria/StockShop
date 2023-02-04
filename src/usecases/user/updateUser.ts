import type UserEntity from '@/modules/user/UserEntity';
import type { UserRepository } from '@/modules/user/userRepository';

export const updateUser =
  (userRepository: UserRepository) =>
  async (user: UserEntity): Promise<boolean> => {
    if (!user) throw new Error('User is required to update user');
    if (!user.getId()) throw new Error('User id is required');

    return userRepository.update(user);
  };
