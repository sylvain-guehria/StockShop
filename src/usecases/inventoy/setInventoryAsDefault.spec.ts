import InventoryEntity from '@/modules/inventory/InventoryEntity';
import type { Inventory } from '@/modules/inventory/inventoryType';

import { setInventoryAsDefault } from './setInventoryAsDefault';

const inventoryRepository = {
  getInventoriesByUserIdAndCompanyId: jest.fn(),
  update: jest.fn(),
};

describe('deleteInventory', () => {
  it('Do not set the inventory as default if the userId is not provided', async () => {
    const userId = '';
    const inventory = { companyId: 'companyId', id: 'inventoryId' };

    try {
      await setInventoryAsDefault(inventoryRepository as any)({
        userId,
        inventory,
      });
    } catch (error: any) {
      expect(inventoryRepository.update).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'userId is required to set inventory as default'
      );
    }
  });
  it('Do not set the inventory as default if the inventory is not provided', async () => {
    const userId = 'userId';
    const inventory = null as unknown as Inventory;

    try {
      await setInventoryAsDefault(inventoryRepository as any)({
        userId,
        inventory,
      });
    } catch (error: any) {
      expect(inventoryRepository.update).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'inventory is required to set inventory as default'
      );
    }
  });
  it('Do not set the inventory as default if the inventory companyId is not provided', async () => {
    const userId = 'userId';
    const inventory = { companyId: '', id: 'inventoryId' };

    try {
      await setInventoryAsDefault(inventoryRepository as any)({
        userId,
        inventory,
      });
    } catch (error: any) {
      expect(inventoryRepository.update).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'companyId is required in the inventory to set inventory as default'
      );
    }
  });
  it('Do not set the inventory as default if the inventory is already the default one', async () => {
    const userId = 'userId';
    const inventory = {
      companyId: 'companyId',
      id: 'inventoryId',
      isDefaultInventory: true,
    };

    await setInventoryAsDefault(inventoryRepository as any)({
      userId,
      inventory,
    });

    expect(inventoryRepository.update).toHaveBeenCalledTimes(0);
  });
  it('Do not get the inventories if the inventory is already the default one', async () => {
    const userId = 'userId';
    const inventory = {
      companyId: 'companyId',
      id: 'inventoryId',
      isDefaultInventory: true,
    };

    await setInventoryAsDefault(inventoryRepository as any)({
      userId,
      inventory,
    });

    expect(
      inventoryRepository.getInventoriesByUserIdAndCompanyId
    ).toHaveBeenCalledTimes(0);
  });

  it('Should get the user inventories', async () => {
    const userId = 'userId';
    const inventory = {
      companyId: 'companyId-2',
      id: 'inventory',
      isDefaultInventory: false,
    };

    inventoryRepository.getInventoriesByUserIdAndCompanyId.mockResolvedValueOnce(
      [
        InventoryEntity.new({
          companyId: 'companyId-1',
          id: 'inventory',
          isDefaultInventory: true,
        }),
      ]
    );

    await setInventoryAsDefault(inventoryRepository as any)({
      userId,
      inventory,
    });

    expect(
      inventoryRepository.getInventoriesByUserIdAndCompanyId
    ).toHaveBeenCalledTimes(1);
    expect(
      inventoryRepository.getInventoriesByUserIdAndCompanyId
    ).toHaveBeenCalledWith(userId, inventory.companyId);
  });

  it('Should unset the default inventory as default and set the new inventory as default', async () => {
    const userId = 'userId';
    const companyId = 'companyId';
    const inventoryToSetAsDefault = {
      companyId,
      id: 'inventory-1',
      isDefaultInventory: false,
    } as Inventory;

    const defaultInventory = InventoryEntity.new({
      companyId,
      id: 'inventory-2',
      isDefaultInventory: true,
    });

    const entityInventoryToSetAsDefault = InventoryEntity.new(
      inventoryToSetAsDefault
    );

    inventoryRepository.getInventoriesByUserIdAndCompanyId.mockResolvedValueOnce(
      [defaultInventory]
    );

    await setInventoryAsDefault(inventoryRepository as any)({
      userId,
      inventory: inventoryToSetAsDefault,
    });

    defaultInventory.setAsNotDefaultInventory();
    entityInventoryToSetAsDefault.setAsDefaultInventory();

    expect(inventoryRepository.update).toHaveBeenCalledTimes(2);
    expect(inventoryRepository.update).toHaveBeenCalledWith(
      entityInventoryToSetAsDefault,
      userId,
      companyId
    );
    expect(inventoryRepository.update).toHaveBeenCalledWith(
      defaultInventory,
      userId,
      companyId
    );
  });
});
