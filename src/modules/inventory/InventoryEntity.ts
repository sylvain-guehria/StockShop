import type { Inventory, InventoryColor } from './inventoryType';
import { arrayInventoryColors } from './inventoryType';

class InventoryEntity implements Inventory {
  id: string;

  name: string;

  isPublic: boolean;

  isDefaultInventory: boolean;

  color: InventoryColor;

  companyId: string;

  numberOfProducts: number;

  static new(inventory?: Inventory): InventoryEntity {
    return new InventoryEntity(inventory || {});
  }

  constructor(inventory: Inventory) {
    this.id = inventory.id || '';
    this.name = inventory.name || '';
    this.isPublic = inventory.isPublic || false;
    this.isDefaultInventory = inventory.isDefaultInventory || false;
    this.color = inventory.color || (arrayInventoryColors[0] as InventoryColor);
    this.companyId = inventory.companyId || '';
    this.numberOfProducts = inventory.numberOfProducts || 0;
  }

  getNumberOfProductsInInventory(): number {
    return this.numberOfProducts;
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): InventoryEntity {
    this.id = id;
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

  isDefault(): boolean {
    return this.isDefaultInventory;
  }

  getCompanyId(): string {
    return this.companyId;
  }

  setCompanyId(companyId: string): InventoryEntity {
    this.companyId = companyId;
    return this;
  }

  setAsDefaultInventory(): InventoryEntity {
    this.isDefaultInventory = true;
    return this;
  }

  unSetAsDefaultInventory(): InventoryEntity {
    this.isDefaultInventory = false;
    return this;
  }
}

export default InventoryEntity;
