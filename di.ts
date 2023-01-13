import StorageService from 'superbase/storage';
import { storageFunctions } from 'superbase/storageFunctions';

import CompanyService from '@/modules/company/companyService';
import SuperbaseCompanyRepository from '@/modules/company/superbaseCompanyRepository';
import InventoryService from '@/modules/inventory/inventoryService';
import SuperbaseInventoryRepository from '@/modules/inventory/superbaseInventoryRepository';
import ProductService from '@/modules/product/productService';
import SuperbaseProductRepository from '@/modules/product/superbaseProductRepository';
import SuperbaseUserRepository from '@/modules/user/superbaseUserRepository';
import UserService from '@/modules/user/userService';

export const userRepository = new SuperbaseUserRepository();
export const userServiceDi = new UserService(userRepository);
export const companyRepository = new SuperbaseCompanyRepository();
export const companyServiceDi = new CompanyService(companyRepository);
export const inventoryRepository = new SuperbaseInventoryRepository();
export const inventoryServiceDi = new InventoryService(inventoryRepository);
export const productRepository = new SuperbaseProductRepository();
export const productServiceDi = new ProductService(productRepository);

export const storageServiceDi = new StorageService(storageFunctions);
