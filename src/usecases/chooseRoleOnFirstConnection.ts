import type UserEntity from '@/modules/user/UserEntity';
import type { UserRepository } from '@/modules/user/userRepository';
import { ROLES } from '@/modules/user/userType';

export const chooseRoleOnFirstConnection =
  (userRepository: UserRepository) =>
  async (user: UserEntity, role: ROLES.BUYER | ROLES.SELLER): Promise<void> => {
    //
    if (role === ROLES.SELLER) {
      user.activateSockManagement();
    }
    if (role === ROLES.BUYER) {
      user.desActivateSockManagement();
    }

    user.markFirstConnectionModalAsSeen();

    return userRepository.update(user);
  };
