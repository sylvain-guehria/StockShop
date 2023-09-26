import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  companyServiceDi,
  inventoryRepository,
  inventoryServiceDi,
  productRepository,
  productServiceDi,
  userRepository,
} from 'di';

import type { Database } from '@/types/supabase';

import { chooseSubRoleOnFirstConnection } from './auth/chooseSubRoleOnFirstConnection';
import { deleteInventory } from './inventoy/deleteInventory';
import { getUserInventories } from './inventoy/getUserInventories';
import { setInventoryAsDefault } from './inventoy/setInventoryAsDefault';
import { deleteProduct } from './product/deleteProduct';
import { getInventoryProducts } from './product/getInventoryProducts';
import { updatePhotoProduct } from './product/updatePhotoProduct';
import { updateUser } from './user/updateUser';

// TODO : CHECK IF THIS IS WORKING OR IF IT HAS TO BE INJECTED IN THE COMPONENT
const supabase = createClientComponentClient<Database>();

// AUTH
export const chooseSubRoleOnFirstConnectionUseCase =
  chooseSubRoleOnFirstConnection(userRepository);

// INVENTORY
export const getUserInventoriesUseCase = getUserInventories(
  inventoryRepository,
  companyServiceDi,
  inventoryServiceDi,
  userRepository,
);
export const deleteInventoryUseCase = deleteInventory(
  inventoryRepository,
  supabase.storage,
);
export const setInventoryAsDefaultUseCase =
  setInventoryAsDefault(inventoryRepository);

// PRODUCT
export const getInventoryProductsUseCase =
  getInventoryProducts(productRepository);
export const deleteProductUseCase = deleteProduct(
  productRepository,
  supabase.storage,
);
export const updatePhotoProductUseCase = updatePhotoProduct(
  productServiceDi,
  supabase.storage,
);

// USER
export const updateUserUseCase = updateUser(userRepository);
