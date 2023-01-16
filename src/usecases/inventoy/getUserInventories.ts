import type { CompanyRepository } from '@/modules/company/companyRepository';
import type CompanyService from '@/modules/company/companyService';
import type InventoryEntity from '@/modules/inventory/InventoryEntity';
import type { InventoryRepository } from '@/modules/inventory/inventoryRepository';
import type InventoryService from '@/modules/inventory/inventoryService';
import type UserEntity from '@/modules/user/UserEntity';

export const getUserInventories =
  (
    companyRepository: CompanyRepository,
    inventoryRepository: InventoryRepository,
    companyServiceDi: CompanyService,
    inventoryServiceDi: InventoryService
  ) =>
  async (user: UserEntity): Promise<InventoryEntity[]> => {
    try {
      if (!user.getId()) {
        throw new Error('userId is required to get user inventories');
      }

      let company = await companyRepository.getCompanyByUserId(user.getId());
      if (!company) {
        company = await companyServiceDi.createCompanyByUserId(user.getId());
        user.setCompanyId(company.id);
      }
      let inventories =
        await inventoryRepository.getInventoriesByUserIdAndCompanyId(
          user.getId(),
          company.id
        );
      if (!inventories || inventories.length === 0) {
        const inventory =
          await inventoryServiceDi.createInventoryByUserIdAndCompanyId({
            userId: user.getId(),
            companyId: company.id,
            isFirstInventory: true,
          });
        inventories = [inventory];
      }
      return inventories;
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      return [];
    }
  };
