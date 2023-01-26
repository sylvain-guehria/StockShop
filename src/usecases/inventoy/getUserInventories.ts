import type CompanyService from '@/modules/company/companyService';
import type InventoryEntity from '@/modules/inventory/InventoryEntity';
import type { InventoryRepository } from '@/modules/inventory/inventoryRepository';
import type InventoryService from '@/modules/inventory/inventoryService';
import type UserEntity from '@/modules/user/UserEntity';
import type { UserRepository } from '@/modules/user/userRepository';

export const getUserInventories =
  (
    inventoryRepository: InventoryRepository,
    companyServiceDi: CompanyService,
    inventoryServiceDi: InventoryService,
    userRepository: UserRepository
  ) =>
  async (user: UserEntity): Promise<InventoryEntity[]> => {
    try {
      if (!user.getId()) {
        throw new Error('userId is required to get user inventories');
      }
      const userCompanyId = user.getCompanyId();

      if (!userCompanyId) {
        const newCompany = await companyServiceDi.createCompany();
        user.setCompanyId(newCompany.getId());
        await userRepository.update(user);
        const newInventory =
          await inventoryServiceDi.createInventoryWithCompanyId({
            companyId: newCompany.getId(),
            isFirstInventory: true,
          });
        return [newInventory];
      }

      const inventories = await inventoryRepository.getInventoriesByCompanyId(
        userCompanyId
      );

      return inventories;
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error when getting user inventories', error);
      return [];
    }
  };
