import type { CompanyRepository } from '@/modules/company/companyRepository';
import type { InventoryRepository } from '@/modules/inventory/inventoryRepository';

type GetUserInventoriesParamsType = {
  userUid: string;
};

export const getUserInventories =
  (
    companyRepository: CompanyRepository,
    inventoryRepository: InventoryRepository
  ) =>
  async ({ userUid }: GetUserInventoriesParamsType) => {
    try {
      let company = await getCompanyByUserId(userUid);
      if (!company) {
        company = await createCompanyByUserId(userUid);
      }
      let inventories = await getInventoriesByUserIdAndCompanyId(
        userUid,
        company.uid
      );
      if (!inventories) {
        const inventory = await createInventoryByUserIdAndCompanyId(
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
