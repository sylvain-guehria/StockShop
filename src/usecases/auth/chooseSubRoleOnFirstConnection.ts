import type UserEntity from '@/modules/user/UserEntity';
import type { UserRepository } from '@/modules/user/userRepository';
import { SUBROLES } from '@/modules/user/userType';

export const chooseSubRoleOnFirstConnection =
  (userRepository: UserRepository) =>
  async (
    user: UserEntity,
    subrole: SUBROLES.BUYER | SUBROLES.SELLER
  ): Promise<UserEntity> => {
    if (subrole === SUBROLES.SELLER) {
      user.activateSockManagement();
    }
    if (subrole === SUBROLES.BUYER) {
      user.desActivateSockManagement();
    }

    user.markFirstConnectionModalAsSeen();
    const success = userRepository.update(user);

    if (!success) {
      throw new Error(
        "Nous n'avons pas pu mettre à jour votre compte. Veuillez réessayer."
      );
    }

    return user;
  };
