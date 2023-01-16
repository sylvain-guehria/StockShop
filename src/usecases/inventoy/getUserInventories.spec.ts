import UserEntity from '@/modules/user/UserEntity';

import { getUserInventories } from './getUserInventories';

const companyRepository = {
  getCompanyByUserId: jest.fn(),
};
const inventoryRepository = {
  getInventoriesByUserIdAndCompanyId: jest.fn(),
};
const companyService = {
  createCompanyByUserId: jest.fn(),
};
const inventoryService = {
  createInventoryByUserIdAndCompanyId: jest.fn(),
  getInventoriesByUserIdAndCompanyId: jest.fn(),
};

describe('getUserInventories', () => {
  it('Do not get the user inventories if the userId is not provided', async () => {
    const user = UserEntity.new({ id: '' });

    const inventories = await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(user);

    expect(
      inventoryService.getInventoriesByUserIdAndCompanyId
    ).toHaveBeenCalledTimes(0);
    expect(inventories).toEqual([]);
  });

  it('Get the company of the current user', async () => {
    const user = UserEntity.new({ id: 'userId' });

    await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(user);

    expect(companyRepository.getCompanyByUserId).toHaveBeenCalledTimes(1);
    expect(companyRepository.getCompanyByUserId).toBeCalledWith(user.getId());
  });
  it('Create a company if the user does have one', async () => {
    const user = UserEntity.new({ id: 'userId' });

    companyRepository.getCompanyByUserId.mockResolvedValue(null);

    await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(user);

    expect(companyService.createCompanyByUserId).toHaveBeenCalledTimes(1);
    expect(companyService.createCompanyByUserId).toBeCalledWith(user.getId());
  });
  it('Do not create a company if the user has one', async () => {
    const user = UserEntity.new({ id: 'userId' });
    const company = { id: 'companyId' };

    companyRepository.getCompanyByUserId.mockResolvedValue(company);

    await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(user);

    expect(companyService.createCompanyByUserId).toHaveBeenCalledTimes(0);
  });
  it('Get the user inventories', async () => {
    const user = UserEntity.new({ id: 'userId' });
    const company = { id: 'companyId' };

    companyRepository.getCompanyByUserId.mockResolvedValue(company);

    await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(user);

    expect(
      inventoryRepository.getInventoriesByUserIdAndCompanyId
    ).toHaveBeenCalledTimes(1);
    expect(
      inventoryRepository.getInventoriesByUserIdAndCompanyId
    ).toBeCalledWith(user.getId(), company.id);
  });
  it('Create his first inventory if the user does not have one', async () => {
    const user = UserEntity.new({ id: 'userId' });
    const company = { id: 'companyId' };

    companyRepository.getCompanyByUserId.mockResolvedValue(company);
    inventoryRepository.getInventoriesByUserIdAndCompanyId.mockResolvedValue(
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
        userId: user.getId(),
        companyId: company.id,
        isFirstInventory: true,
      }
    );
  });
  it('Do not get create an inventory if the user have one', async () => {
    const user = UserEntity.new({ id: 'userId' });
    const company = { id: 'companyId' };
    const inventories = [{ id: 'inventoryId' }];

    companyRepository.getCompanyByUserId.mockResolvedValue(company);
    inventoryRepository.getInventoriesByUserIdAndCompanyId.mockResolvedValue(
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
    const user = UserEntity.new({ id: 'userId' });
    const companyId = 'companyId';
    const inventoryId = 'inventoryId';
    const company = {
      id: companyId,
    };
    const inventory = {
      id: inventoryId,
    };

    companyRepository.getCompanyByUserId.mockResolvedValue(company);
    inventoryRepository.getInventoriesByUserIdAndCompanyId.mockResolvedValue([
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
