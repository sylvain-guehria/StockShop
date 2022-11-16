import InventoryEntity from '@/modules/inventory/InventoryEntity';
import type { Inventory } from '@/modules/inventory/inventoryType';

import { setInventoryAsDefault } from './setInventoryAsDefault';

const inventoryRepository = {
  getInventoriesByUserUidAndCompanyUid: jest.fn(),
  update: jest.fn(),
};

describe('deleteInventory', () => {
  it('Do not set the inventory as default if the userUid is not provided', async () => {
    const userUid = '';
    const inventory = { companyUid: 'companyUid', uid: 'inventoryUid' };

    try {
      await setInventoryAsDefault(inventoryRepository as any)({
        userUid,
        inventory,
      });
    } catch (error: any) {
      expect(inventoryRepository.update).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'userUid is required to set inventory as default'
      );
    }
  });
  it('Do not set the inventory as default if the inventory is not provided', async () => {
    const userUid = 'userUid';
    const inventory = null as unknown as Inventory;

    try {
      await setInventoryAsDefault(inventoryRepository as any)({
        userUid,
        inventory,
      });
    } catch (error: any) {
      expect(inventoryRepository.update).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'inventory is required to set inventory as default'
      );
    }
  });
  it('Do not set the inventory as default if the inventory companyUid is not provided', async () => {
    const userUid = 'userUid';
    const inventory = { companyUid: '', uid: 'inventoryUid' };

    try {
      await setInventoryAsDefault(inventoryRepository as any)({
        userUid,
        inventory,
      });
    } catch (error: any) {
      expect(inventoryRepository.update).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'companyUid is required in the inventory to set inventory as default'
      );
    }
  });
  it('Do not set the inventory as default if the inventory is already the default one', async () => {
    const userUid = 'userUid';
    const inventory = {
      companyUid: 'companyUid',
      uid: 'inventoryUid',
      isDefaultInventory: true,
    };

    await setInventoryAsDefault(inventoryRepository as any)({
      userUid,
      inventory,
    });

    expect(inventoryRepository.update).toHaveBeenCalledTimes(0);
  });
  it('Do not get the inventories if the inventory is already the default one', async () => {
    const userUid = 'userUid';
    const inventory = {
      companyUid: 'companyUid',
      uid: 'inventoryUid',
      isDefaultInventory: true,
    };

    await setInventoryAsDefault(inventoryRepository as any)({
      userUid,
      inventory,
    });

    expect(
      inventoryRepository.getInventoriesByUserUidAndCompanyUid
    ).toHaveBeenCalledTimes(0);
  });

  it('Should get the user inventories', async () => {
    const userUid = 'userUid';
    const inventory = {
      companyUid: 'companyUid-2',
      uid: 'inventory',
      isDefaultInventory: false,
    };

    inventoryRepository.getInventoriesByUserUidAndCompanyUid.mockResolvedValueOnce(
      [
        InventoryEntity.new({
          companyUid: 'companyUid-1',
          uid: 'inventory',
          isDefaultInventory: true,
        }),
      ]
    );

    await setInventoryAsDefault(inventoryRepository as any)({
      userUid,
      inventory,
    });

    expect(
      inventoryRepository.getInventoriesByUserUidAndCompanyUid
    ).toHaveBeenCalledTimes(1);
    expect(
      inventoryRepository.getInventoriesByUserUidAndCompanyUid
    ).toHaveBeenCalledWith(userUid, inventory.companyUid);
  });

  it('Should unset the default inventory as default and set the new inventory as default', async () => {
    const userUid = 'userUid';
    const companyUid = 'companyUid';
    const inventoryToSetAsDefault = {
      companyUid,
      uid: 'inventory-1',
      isDefaultInventory: false,
    } as Inventory;

    const defaultInventory = InventoryEntity.new({
      companyUid,
      uid: 'inventory-2',
      isDefaultInventory: true,
    });

    const entityInventoryToSetAsDefault = InventoryEntity.new(
      inventoryToSetAsDefault
    );

    inventoryRepository.getInventoriesByUserUidAndCompanyUid.mockResolvedValueOnce(
      [defaultInventory]
    );

    await setInventoryAsDefault(inventoryRepository as any)({
      userUid,
      inventory: inventoryToSetAsDefault,
    });

    defaultInventory.setAsNotDefaultInventory();
    entityInventoryToSetAsDefault.setAsDefaultInventory();

    expect(inventoryRepository.update).toHaveBeenCalledTimes(2);
    expect(inventoryRepository.update).toHaveBeenCalledWith(
      entityInventoryToSetAsDefault,
      userUid,
      companyUid
    );
    expect(inventoryRepository.update).toHaveBeenCalledWith(
      defaultInventory,
      userUid,
      companyUid
    );
  });
});
