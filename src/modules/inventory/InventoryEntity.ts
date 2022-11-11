import type { Inventory } from './inventoryType';

class InventoryEntity implements Inventory {
  uid: string;

  name: string;

  isPublic: boolean;

  isDefaultInventory: boolean;

  static new(inventory?: Inventory): InventoryEntity {
    return new InventoryEntity(inventory || {});
  }

  constructor(inventory: Inventory) {
    this.uid = inventory.uid || '';
    this.name = inventory.name || '';
    this.isPublic = inventory.isPublic || false;
    this.isDefaultInventory = inventory.isDefaultInventory || false;
  }

  getUid(): string {
    return this.uid;
  }

  setUid(uid: string): InventoryEntity {
    this.uid = uid;
    return this;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): InventoryEntity {
    this.name = name;
    return this;
  }

  getIsPublic(): boolean {
    return this.isPublic;
  }

  setIsPublic(isPublic: boolean): InventoryEntity {
    this.isPublic = isPublic;
    return this;
  }

  getIsDefaultInventory(): boolean {
    return this.isDefaultInventory;
  }

  setIsDefaultInventory(isDefaultInventory: boolean): InventoryEntity {
    this.isDefaultInventory = isDefaultInventory;
    return this;
  }
}

export default InventoryEntity;