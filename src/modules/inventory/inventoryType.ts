export enum InventoryAttributes {
  ID = 'id',
  NAME = 'name',
  IS_PUBLIC = 'isPublic',
  IS_DEFAULT_INVENTORY = 'isDefaultInventory',
  COLOR = 'color',
  COMPANY_ID = 'companyId',
}

export interface Inventory {
  [InventoryAttributes.ID]?: string;
  [InventoryAttributes.NAME]?: string;
  [InventoryAttributes.IS_PUBLIC]?: boolean;
  [InventoryAttributes.IS_DEFAULT_INVENTORY]?: boolean;
  [InventoryAttributes.COLOR]?: InventoryColor;
  [InventoryAttributes.COMPANY_ID]?: string;
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

export const hoverBorderColors = {
  'primary-600': 'hover:border-primary-600',
  'green-500': 'hover:border-green-500',
  'yellow-500': 'hover:border-yellow-500',
  'red-500': 'hover:border-red-500',
  'blue-400': 'hover:border-blue-400',
  'orange-500': 'hover:border-orange-500',
  'gray-500': 'hover:border-gray-500',
  black: 'hover:border-black',
} as const;

export const borderColors = {
  'primary-600': 'border border-primary-600',
  'green-500': 'border border-green-500',
  'yellow-500': 'border border-yellow-500',
  'red-500': 'border border-red-500',
  'blue-400': 'border border-blue-400',
  'orange-500': 'border border-orange-500',
  'gray-500': 'border border-gray-500',
  black: 'border border-black',
} as const;
