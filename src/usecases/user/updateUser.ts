import type UserEntity from '@/modules/user/UserEntity';
import type { UserRepository } from '@/modules/user/userRepository';
import type { User } from '@/modules/user/userType';

export const updateUser =
  (userRepository: UserRepository) =>
  async (user: UserEntity): Promise<User> => {
    if (!user) throw new Error('User is required to update user');
    if (!user.getId()) throw new Error('User id is required');

    return userRepository.update(user);
  };
