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
      if (!user.getUid()) {
        throw new Error('userUid is required to get user inventories');
      }

      let company = await companyRepository.getCompanyByUserUid(user.getUid());
      if (!company) {
        company = await companyServiceDi.createCompanyByUserId(user.getUid());
        user.setCompanyUid(company.uid);
      }
      let inventories =
        await inventoryRepository.getInventoriesByUserUidAndCompanyUid(
          user.getUid(),
          company.uid
        );
      if (!inventories || inventories.length === 0) {
        const inventory =
          await inventoryServiceDi.createInventoryByUserIdAndCompanyId({
            userUid: user.getUid(),
            companyUid: company.uid,
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
