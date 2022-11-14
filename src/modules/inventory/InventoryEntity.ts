import type { Inventory, InventoryColor } from './inventoryType';
import { arrayInventoryColors } from './inventoryType';

class InventoryEntity implements Inventory {
  uid: string;

  name: string;

  isPublic: boolean;

  isDefaultInventory: boolean;

  color: InventoryColor;

  companyUid: string;

  static new(inventory?: Inventory): InventoryEntity {
    return new InventoryEntity(inventory || {});
  }

  constructor(inventory: Inventory) {
    this.uid = inventory.uid || '';
    this.name = inventory.name || '';
    this.isPublic = inventory.isPublic || false;
    this.isDefaultInventory = inventory.isDefaultInventory || false;
    this.color = inventory.color || (arrayInventoryColors[0] as InventoryColor);
    this.companyUid = inventory.companyUid || '';
  }

  getUid(): string {
    return this.uid;
  }

  setUid(uid: string): InventoryEntity {
    this.uid = uid;
    return this;
  }

  getColor(): InventoryColor {
    return this.color;
  }

  setColor(color: InventoryColor): InventoryEntity {
    this.color = color;
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

  getCompanyUid(): string {
    return this.companyUid;
  }

  setCompanyUid(companyUid: string): InventoryEntity {
    this.companyUid = companyUid;
    return this;
  }

  setAsDefaultInventory(): InventoryEntity {
    this.isDefaultInventory = true;
    return this;
  }

  setAsNotDefaultInventory(): InventoryEntity {
    this.isDefaultInventory = false;
    return this;
  }
}

export default InventoryEntity;
