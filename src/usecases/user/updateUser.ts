import type UserEntity from '@/modules/user/UserEntity';
import type { UserRepository } from '@/modules/user/userRepository';

export const updateUser =
  (userRepository: UserRepository) =>
  async (user: UserEntity): Promise<void> => {
    if (!user) throw new Error('User is required to update user');
    if (!user.getUid()) throw new Error('User uid is required');
    if (!user.getUsername())
      throw new Error("Le nom d'utlisateur est obligatoire");

    // TODO: check if username exists

    await userRepository.update(user);
  };
