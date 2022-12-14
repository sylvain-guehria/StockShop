import type UserEntity from '@/modules/user/UserEntity';
import type { UserRepository } from '@/modules/user/userRepository';

export const updateUser =
  (userRepository: UserRepository) =>
  async (user: UserEntity): Promise<void> => {
    if (!user) throw new Error('User is required to update user');
    if (!user.getUid()) throw new Error('User uid is required');

    await userRepository.update(user);
  };
