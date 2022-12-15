import type UserEntity from '@/modules/user/UserEntity';
import type { UserRepository } from '@/modules/user/userRepository';
import type { User } from '@/modules/user/userType';
import { SUBROLES } from '@/modules/user/userType';

export const chooseSubRoleOnFirstConnection =
  (userRepository: UserRepository) =>
  async (
    user: UserEntity,
    subrole: SUBROLES.BUYER | SUBROLES.SELLER
  ): Promise<User> => {
    //
    if (subrole === SUBROLES.SELLER) {
      user.activateSockManagement();
    }
    if (subrole === SUBROLES.BUYER) {
      user.desActivateSockManagement();
    }

    user.markFirstConnectionModalAsSeen();

    return userRepository.update(user);
  };
