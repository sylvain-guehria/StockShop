export interface Inventory {
  uid?: string;
  name?: string;
  isPublic?: boolean;
  isDefaultInventory?: boolean;
  color?: InventoryColor;
  companyUid?: string;
}

export const InventoryColors = {
  PRIMARY: 'primary-600',
  GREEN: 'green-500',
  YELLOW: 'yellow-500',
  RED: 'red-500',
  BLUE: 'blue-400',
  ORANGE: 'orange-500',
  GRAY: 'gray-500',
  BLACK: 'black',
} as const;

export const arrayInventoryColors = Object.values(InventoryColors);

export type InventoryColor =
  typeof InventoryColors[keyof typeof InventoryColors];
