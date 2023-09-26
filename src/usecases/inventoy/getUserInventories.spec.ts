import CompanyEntity from '@/modules/company/CompanyEntity';
import UserEntity from '@/modules/user/UserEntity';

import { getUserInventories } from './getUserInventories';

const inventoryRepository = {
  getInventoriesByCompanyId: jest.fn(),
};
const companyService = {
  createCompany: jest.fn(),
};
const inventoryService = {
  createInventoryWithCompanyId: jest.fn(),
  getInventoriesByUserIdAndCompanyId: jest.fn(),
};

const userRepository = {
  getCompanyByUserId: jest.fn(),
  update: jest.fn(),
};

describe('getUserInventories', () => {
  it('Do not get the user inventories if the userId is not provided', async () => {
    const user = UserEntity.new({ id: '' });

    const inventories = await getUserInventories(
      userRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any,
    )(user);

    expect(
      inventoryService.getInventoriesByUserIdAndCompanyId,
    ).toHaveBeenCalledTimes(0);
    expect(inventories).toEqual([]);
  });

  it('Create a company if the user does have one', async () => {
    const user = UserEntity.new({ id: 'userId' });

    await getUserInventories(
      inventoryRepository as any,
      companyService as any,
      inventoryService as any,
      userRepository as any,
    )(user);

    expect(companyService.createCompany).toHaveBeenCalledTimes(1);
  });
  it('Do not create a company if the user has one', async () => {
    const user = UserEntity.new({ id: 'userId', companyId: 'companyId' });

    await getUserInventories(
      inventoryRepository as any,
      companyService as any,
      inventoryService as any,
      userRepository as any,
    )(user);

    expect(companyService.createCompany).toHaveBeenCalledTimes(0);
  });
  it('Get the inventories of the user company', async () => {
    const user = UserEntity.new({ id: 'userId', companyId: 'companyId' });

    await getUserInventories(
      inventoryRepository as any,
      companyService as any,
      inventoryService as any,
      userRepository as any,
    )(user);

    expect(inventoryRepository.getInventoriesByCompanyId).toHaveBeenCalledTimes(
      1,
    );
    expect(inventoryRepository.getInventoriesByCompanyId).toBeCalledWith(
      'companyId',
    );
  });
  it('Create his first inventory when creating a company for the user', async () => {
    const user = UserEntity.new({ id: 'userId' });
    const company = CompanyEntity.new({ id: 'newCompanyId' });

    companyService.createCompany.mockResolvedValue(company);
    inventoryRepository.getInventoriesByCompanyId.mockResolvedValue(null);

    await getUserInventories(
      inventoryRepository as any,
      companyService as any,
      inventoryService as any,
      userRepository as any,
    )(user);

    expect(userRepository.update).toHaveBeenCalledTimes(1);
    expect(userRepository.update).toBeCalledWith(
      user.setCompanyId('newCompanyId'),
    );
    expect(inventoryService.createInventoryWithCompanyId).toHaveBeenCalledTimes(
      1,
    );
    expect(inventoryService.createInventoryWithCompanyId).toBeCalledWith({
      companyId: 'newCompanyId',
      isFirstInventory: true,
    });
  });
  it('Do not get create an inventory if the user have one', async () => {
    const user = UserEntity.new({ id: 'userId', companyId: 'companyId' });
    const inventories = [{ id: 'inventoryId' }];

    inventoryRepository.getInventoriesByCompanyId.mockResolvedValue(
      inventories,
    );

    await getUserInventories(
      inventoryRepository as any,
      companyService as any,
      inventoryService as any,
      userRepository as any,
    )(user);

    expect(inventoryService.createInventoryWithCompanyId).toHaveBeenCalledTimes(
      0,
    );
  });

  it('Should return inventories', async () => {
    const user = UserEntity.new({ id: 'userId' });
    const inventoryId = 'inventoryId';

    const inventory = {
      id: inventoryId,
    };

    inventoryRepository.getInventoriesByCompanyId.mockResolvedValue([
      inventory,
    ]);
    inventoryService.createInventoryWithCompanyId.mockResolvedValue(inventory);

    const inventories = await getUserInventories(
      inventoryRepository as any,
      companyService as any,
      inventoryService as any,
      userRepository as any,
    )(user);
    expect(inventories).toEqual([inventory]);
  });
});
