import type { UserRepository } from '@/modules/user/userRepository';

type GetUserInventoriesParamsType = {
  userUid: string;
};

export const getUserInventories =
  (userRepository: UserRepository, companyRepository, inventoryRepository) =>
  async ({ userUid }: GetUserInventoriesParamsType) => {
    try {
      let company = await getUserCompany(userUid);
      if (!company) {
        company = await createUserCompany(userUid);
      }
      let inventories = await getCompanyInventories(userUid, company.uid);
      if (!inventories) {
        const inventory = await createCompanyInventory(userUid, company.uid);
        inventories = [inventory];
      }
      return inventories;
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error------------', error);
      return [];
    }
  };
