import CompanyService from '@/modules/company/companyService';
import FirebaseCompanyRepository from '@/modules/company/firebaseCompanyRepository';
import FirebaseInventoryRepository from '@/modules/inventory/firebaseInventoryRepository';
import InventoryService from '@/modules/inventory/inventoryService';
import FirebaseItemRepository from '@/modules/item/firebaseItemRepository';
import ItemService from '@/modules/item/itemService';
import FirebaseUserRepository from '@/modules/user/firebaseUserRepository';
import UserService from '@/modules/user/userService';

export const userRepository = new FirebaseUserRepository();
export const userServiceDi = new UserService(userRepository);
export const companyRepository = new FirebaseCompanyRepository();
export const companyServiceDi = new CompanyService(companyRepository);
export const inventoryRepository = new FirebaseInventoryRepository();
export const inventoryServiceDi = new InventoryService(inventoryRepository);
export const itemRepository = new FirebaseItemRepository();
export const itemServiceDi = new ItemService(itemRepository);
