import type UserEntity from '@/modules/user/UserEntity';
import type { UserRepository } from '@/modules/user/userRepository';
import { SUBROLES } from '@/modules/user/userType';

export const chooseSubRoleOnFirstConnection =
  (userRepository: UserRepository) =>
  async (
    user: UserEntity,
    subrole: SUBROLES.BUYER | SUBROLES.SELLER,
  ): Promise<UserEntity> => {
    if (subrole === SUBROLES.SELLER) {
      user.activateSockManagement();
    }
    if (subrole === SUBROLES.BUYER) {
      user.desActivateSockManagement();
    }

    user.markFirstConnectionModalAsSeen();

    const updatedUser = await userRepository.update(user);

    if (!updatedUser) {
      throw new Error(
        "Une erreur est survenue lors de l'enregistrement de votre choix, veuillez réessayer.",
      );
    }

    return updatedUser;
  };
