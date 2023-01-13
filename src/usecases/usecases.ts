import {
  companyRepository,
  companyServiceDi,
  inventoryRepository,
  inventoryServiceDi,
  productRepository,
  productServiceDi,
  storageServiceDi,
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
import { deleteProduct } from './product/deleteProduct';
import { getInventoryProducts } from './product/getInventoryProducts';
import { updatePhotoProduct } from './product/updatePhotoProduct';
import { updateUser } from './user/updateUser';

// AUTH
export const registerWithEmailUseCase = registerWithEmail(userRepository);
export const loginWithEmailUseCase = loginWithEmail(userRepository);
export const logoutUseCase = logout();
export const loginWithGoogleUseCase = loginWithGoogle(userRepository);
export const chooseSubRoleOnFirstConnectionUseCase =
  chooseSubRoleOnFirstConnection(userRepository);

// INVENTORY
export const getUserInventoriesUseCase = getUserInventories(
  companyRepository,
  inventoryRepository,
  companyServiceDi,
  inventoryServiceDi
);
export const deleteInventoryUseCase = deleteInventory(inventoryRepository);
export const setInventoryAsDefaultUseCase =
  setInventoryAsDefault(inventoryRepository);

// PRODUCT
export const getInventoryProductsUseCase =
  getInventoryProducts(productRepository);
export const deleteProductUseCase = deleteProduct(productRepository);
export const updatePhotoProductUseCase = updatePhotoProduct(
  productServiceDi,
  storageServiceDi
);

// USER
export const updateUserUseCase = updateUser(userRepository);
