import UserEntity from '@/modules/user/UserEntity';

import { getUserInventories } from './getUserInventories';

const companyRepository = {
  getCompanyByUserUid: jest.fn(),
};
const inventoryRepository = {
  getInventoriesByUserUidAndCompanyUid: jest.fn(),
};
const companyService = {
  createCompanyByUserId: jest.fn(),
};
const inventoryService = {
  createInventoryByUserIdAndCompanyId: jest.fn(),
  getInventoriesByUserUidAndCompanyUid: jest.fn(),
};

describe('getUserInventories', () => {
  it('Do not get the user inventories if the userUid is not provided', async () => {
    const user = UserEntity.new({ uid: '' });

    const inventories = await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(user);

    expect(
      inventoryService.getInventoriesByUserUidAndCompanyUid
    ).toHaveBeenCalledTimes(0);
    expect(inventories).toEqual([]);
  });

  it('Get the company of the current user', async () => {
    const user = UserEntity.new({ uid: 'userUid' });

    await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(user);

    expect(companyRepository.getCompanyByUserUid).toHaveBeenCalledTimes(1);
    expect(companyRepository.getCompanyByUserUid).toBeCalledWith(user.getUid());
  });
  it('Create a company if the user does have one', async () => {
    const user = UserEntity.new({ uid: 'userUid' });

    companyRepository.getCompanyByUserUid.mockResolvedValue(null);

    await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(user);

    expect(companyService.createCompanyByUserId).toHaveBeenCalledTimes(1);
    expect(companyService.createCompanyByUserId).toBeCalledWith(user.getUid());
  });
  it('Do not create a company if the user has one', async () => {
    const user = UserEntity.new({ uid: 'userUid' });
    const company = { uid: 'companyUid' };

    companyRepository.getCompanyByUserUid.mockResolvedValue(company);

    await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(user);

    expect(companyService.createCompanyByUserId).toHaveBeenCalledTimes(0);
  });
  it('Get the user inventories', async () => {
    const user = UserEntity.new({ uid: 'userUid' });
    const company = { uid: 'companyUid' };

    companyRepository.getCompanyByUserUid.mockResolvedValue(company);

    await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(user);

    expect(
      inventoryRepository.getInventoriesByUserUidAndCompanyUid
    ).toHaveBeenCalledTimes(1);
    expect(
      inventoryRepository.getInventoriesByUserUidAndCompanyUid
    ).toBeCalledWith(user.getUid(), company.uid);
  });
  it('Create his first inventory if the user does not have one', async () => {
    const user = UserEntity.new({ uid: 'userUid' });
    const company = { uid: 'companyUid' };

    companyRepository.getCompanyByUserUid.mockResolvedValue(company);
    inventoryRepository.getInventoriesByUserUidAndCompanyUid.mockResolvedValue(
      null
    );

    await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(user);

    expect(
      inventoryService.createInventoryByUserIdAndCompanyId
    ).toHaveBeenCalledTimes(1);
    expect(inventoryService.createInventoryByUserIdAndCompanyId).toBeCalledWith(
      {
        userUid: user.getUid(),
        companyUid: company.uid,
        isFirstInventory: true,
      }
    );
  });
  it('Do not get create an inventory if the user have one', async () => {
    const user = UserEntity.new({ uid: 'userUid' });
    const company = { uid: 'companyUid' };
    const inventories = [{ uid: 'inventoryUid' }];

    companyRepository.getCompanyByUserUid.mockResolvedValue(company);
    inventoryRepository.getInventoriesByUserUidAndCompanyUid.mockResolvedValue(
      inventories
    );

    await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(user);

    expect(
      inventoryService.createInventoryByUserIdAndCompanyId
    ).toHaveBeenCalledTimes(0);
  });

  it('Should return inventories', async () => {
    const user = UserEntity.new({ uid: 'userUid' });
    const companyUid = 'companyUid';
    const inventoryUid = 'inventoryUid';
    const company = {
      uid: companyUid,
    };
    const inventory = {
      uid: inventoryUid,
    };

    companyRepository.getCompanyByUserUid.mockResolvedValue(company);
    inventoryRepository.getInventoriesByUserUidAndCompanyUid.mockResolvedValue([
      inventory,
    ]);
    companyService.createCompanyByUserId.mockResolvedValue(company);
    inventoryService.createInventoryByUserIdAndCompanyId.mockResolvedValue(
      inventory
    );

    const inventories = await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(user);
    expect(inventories).toEqual([inventory]);
  });
});
