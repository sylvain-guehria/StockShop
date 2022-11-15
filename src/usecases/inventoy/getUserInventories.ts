import type { CompanyRepository } from '@/modules/company/companyRepository';
import type CompanyService from '@/modules/company/companyService';
import type { InventoryRepository } from '@/modules/inventory/inventoryRepository';
import type InventoryService from '@/modules/inventory/inventoryService';
import type { Inventory } from '@/modules/inventory/inventoryType';

export const getUserInventories =
  (
    companyRepository: CompanyRepository,
    inventoryRepository: InventoryRepository,
    companyServiceDi: CompanyService,
    inventoryServiceDi: InventoryService
  ) =>
  async (userUid: string): Promise<Inventory[]> => {
    try {
      if (!userUid) {
        throw new Error('userUid is required to get user inventories');
      }

      let company = await companyRepository.getCompanyByUserUid(userUid);
      if (!company) {
        company = await companyServiceDi.createCompanyByUserId(userUid);
      }
      let inventories =
        await inventoryRepository.getInventoriesByUserUidAndCompanyUid(
          userUid,
          company.uid
        );
      if (!inventories || inventories.length === 0) {
        const inventory =
          await inventoryServiceDi.createInventoryByUserIdAndCompanyId({
            userUid,
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
