import {
  companyRepository,
  companyServiceDi,
  inventoryRepository,
  inventoryServiceDi,
  productRepository,
  userRepository,
} from 'di';

import { chooseSubRoleOnFirstConnection } from './auth/chooseSubRoleOnFirstConnection';
import { loginWithEmail } from './auth/loginWithEmail';
import { loginWithGoogle } from './auth/loginWithGoogle';
import { logout } from './auth/logout';
import { registerWithEmail } from './auth/registerWithEmail';
import { deleteInventory } from './inventoy/deleteInventory';
import { getUserInventories } from './inventoy/getUserInventories';
import { setInventoryAsDefault } from './inventoy/setInventoryAsDefault';
import { getInventoryProducts } from './product/getInventoryProducts';
import { updateUser } from './user/updateUser';

export const registerWithEmailUseCase = registerWithEmail(userRepository);
export const loginWithEmailUseCase = loginWithEmail();
export const logoutUseCase = logout();
export const loginWithGoogleUseCase = loginWithGoogle(userRepository);
export const chooseSubRoleOnFirstConnectionUseCase =
  chooseSubRoleOnFirstConnection(userRepository);

export const getUserInventoriesUseCase = getUserInventories(
  companyRepository,
  inventoryRepository,
  companyServiceDi,
  inventoryServiceDi
);

export const getInventoryProductsUseCase = getInventoryProducts(
  companyRepository,
  companyServiceDi,
  productRepository
);

export const deleteInventoryUseCase = deleteInventory(inventoryRepository);
export const setInventoryAsDefaultUseCase =
  setInventoryAsDefault(inventoryRepository);

export const updateUserUseCase = updateUser(userRepository);
