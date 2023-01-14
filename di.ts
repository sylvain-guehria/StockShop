import StorageService from 'supabase/storage';
import { storageFunctions } from 'supabase/storageFunctions';

import CompanyService from '@/modules/company/companyService';
import SupabaseCompanyRepository from '@/modules/company/supabaseCompanyRepository';
import InventoryService from '@/modules/inventory/inventoryService';
import SupabaseInventoryRepository from '@/modules/inventory/supabaseInventoryRepository';
import ProductService from '@/modules/product/productService';
import SupabaseProductRepository from '@/modules/product/supabaseProductRepository';
import SupabaseUserRepository from '@/modules/user/supabaseUserRepository';
import UserService from '@/modules/user/userService';

export const userRepository = new SupabaseUserRepository();
export const userServiceDi = new UserService(userRepository);
export const companyRepository = new SupabaseCompanyRepository();
export const companyServiceDi = new CompanyService(companyRepository);
export const inventoryRepository = new SupabaseInventoryRepository();
export const inventoryServiceDi = new InventoryService(inventoryRepository);
export const productRepository = new SupabaseProductRepository();
export const productServiceDi = new ProductService(productRepository);

export const storageServiceDi = new StorageService(storageFunctions);
