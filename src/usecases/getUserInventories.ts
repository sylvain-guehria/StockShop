import type { CompanyRepository } from '@/modules/company/companyRepository';
import type { InventoryRepository } from '@/modules/inventory/inventoryRepository';
import type { Inventory } from '@/modules/inventory/inventoryType';

type GetUserInventoriesParamsType = {
  userUid: string;
};

export const getUserInventories =
  (
    companyRepository: CompanyRepository,
    inventoryRepository: InventoryRepository
  ) =>
  async ({ userUid }: GetUserInventoriesParamsType): Promise<Inventory[]> => {
    try {
      let company = await companyRepository.getCompanyByUserUid(userUid);
      if (!company) {
        company = await companyRepository.createCompanyByUserId(userUid);
      }
      let inventories =
        await inventoryRepository.getInventoriesByUserUidAndCompanyUid(
          userUid,
          company.uid
        );
      if (!inventories || inventories.length === 0) {
        const inventory =
          await inventoryRepository.createInventoryByUserIdAndCompanyId(
            userUid,
            company.uid
          );
        inventories = [inventory];
      }
      return inventories;
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error------------', error);
      return [];
    }
  };
