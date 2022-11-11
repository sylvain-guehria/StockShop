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
      let company = await companyRepository.getCompanyByUserId(userUid);
      if (!company) {
        company = await companyRepository.createCompanyByUserId(userUid);
      }
      // let inventories =
      //   await inventoryRepository.getInventoriesByUserIdAndCompanyId(
      //     userUid,
      //     company.uid
      //   );
      // if (!inventories) {
      //   const inventory =
      //     await inventoryRepository.createInventoryByUserIdAndCompanyId(
      //       userUid,
      //       company.uid
      //     );
      //   inventories = [inventory];
      // }
      // return inventories;
      return [];
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error------------', error);
      return [];
    }
  };
