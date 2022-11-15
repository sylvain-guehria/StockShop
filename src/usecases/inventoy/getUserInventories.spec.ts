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
    const userUid = '';

    const inventories = await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(userUid);

    expect(
      inventoryService.getInventoriesByUserUidAndCompanyUid
    ).toHaveBeenCalledTimes(0);
    expect(inventories).toEqual([]);
  });

  it('Get the company of the current user', async () => {
    const userUid = 'userUid';

    await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(userUid);

    expect(companyRepository.getCompanyByUserUid).toHaveBeenCalledTimes(1);
    expect(companyRepository.getCompanyByUserUid).toBeCalledWith(userUid);
  });
  it('Create a company if the user does have one', async () => {
    const userUid = 'userUid';

    companyRepository.getCompanyByUserUid.mockResolvedValue(null);

    await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(userUid);

    expect(companyService.createCompanyByUserId).toHaveBeenCalledTimes(1);
    expect(companyService.createCompanyByUserId).toBeCalledWith(userUid);
  });
  it('Do not create a company if the user has one', async () => {
    const userUid = 'userUid';
    const company = { uid: 'companyUid' };

    companyRepository.getCompanyByUserUid.mockResolvedValue(company);

    await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(userUid);

    expect(companyService.createCompanyByUserId).toHaveBeenCalledTimes(0);
  });
  it('Get the user inventories', async () => {
    const userUid = 'userUid';
    const company = { uid: 'companyUid' };

    companyRepository.getCompanyByUserUid.mockResolvedValue(company);

    await getUserInventories(
      companyRepository as any,
      inventoryRepository as any,
      companyService as any,
      inventoryService as any
    )(userUid);

    expect(
      inventoryRepository.getInventoriesByUserUidAndCompanyUid
    ).toHaveBeenCalledTimes(1);
    expect(
      inventoryRepository.getInventoriesByUserUidAndCompanyUid
    ).toBeCalledWith(userUid, company.uid);
  });
  it('Create his first inventory if the user does not have one', async () => {
    const userUid = 'userUid';
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
    )(userUid);

    expect(
      inventoryService.createInventoryByUserIdAndCompanyId
    ).toHaveBeenCalledTimes(1);
    expect(inventoryService.createInventoryByUserIdAndCompanyId).toBeCalledWith(
      {
        userUid,
        companyUid: company.uid,
        isFirstInventory: true,
      }
    );
  });
  it('Do not get create an inventory if the user have one', async () => {
    const userUid = 'userUid';
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
    )(userUid);

    expect(
      inventoryService.createInventoryByUserIdAndCompanyId
    ).toHaveBeenCalledTimes(0);
  });

  it('Should return inventories', async () => {
    const userUid = 'userUid';
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
    )(userUid);
    expect(inventories).toEqual([inventory]);
  });
});
