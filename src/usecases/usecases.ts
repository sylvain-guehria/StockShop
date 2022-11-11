import { companyRepository, inventoryRepository, userRepository } from 'di';

import { chooseSubRoleOnFirstConnection } from './chooseSubRoleOnFirstConnection';
import { getUserInventories } from './getUserInventories';
import { loginWithEmail } from './loginWithEmail';
import { loginWithGoogle } from './loginWithGoogle';
import { logout } from './logout';
import { registerWithEmail } from './registerWithEmail';

export const registerWithEmailUseCase = registerWithEmail(userRepository);
export const loginWithEmailUseCase = loginWithEmail();
export const logoutUseCase = logout();
export const loginWithGoogleUseCase = loginWithGoogle(userRepository);
export const chooseSubRoleOnFirstConnectionUseCase =
  chooseSubRoleOnFirstConnection(userRepository);

export const getUserInventoriesUseCase = getUserInventories(
  companyRepository,
  inventoryRepository
);
