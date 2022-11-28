export enum ProductAttributes {
  UID = 'uid',
  LABEL = 'label',
  QUANTITY_IN_INVENTORY = 'quantityInInventory',
  OPTIMUM_QUANTITY = 'optimumQuantity',
  BUYING_PRICE = 'buyingPrice',
  SELLING_PRICE = 'sellingPrice',
  DESCRIPTION = 'description',
  TO_BUY = 'toBuy',
  IS_PUBLIC = 'isPublic',
  TVA = 'tva',
  CATEGORY_UID = 'categoryUid',
  SUB_CATEGORY_UID = 'subCategoryUid',
  PUBLIC_DISPONIBILITY = 'publicDisponibility',
  INVENTORY_UID = 'inventoryUid',
  CAT_SUBCAT_ATTRIBUTES = 'catSubcatAttributes',
}

export interface Product {
  [ProductAttributes.UID]?: string;
  [ProductAttributes.LABEL]?: string;
  [ProductAttributes.QUANTITY_IN_INVENTORY]?: number;
  [ProductAttributes.OPTIMUM_QUANTITY]?: number;
  [ProductAttributes.BUYING_PRICE]?: number;
  [ProductAttributes.SELLING_PRICE]?: number;
  [ProductAttributes.DESCRIPTION]?: string;
  [ProductAttributes.TO_BUY]?: number;
  [ProductAttributes.IS_PUBLIC]?: boolean;
  [ProductAttributes.TVA]?: number;
  [ProductAttributes.CATEGORY_UID]?: string;
  [ProductAttributes.SUB_CATEGORY_UID]?: string;
  [ProductAttributes.PUBLIC_DISPONIBILITY]?: string;
  [ProductAttributes.INVENTORY_UID]?: string;
  [ProductAttributes.CAT_SUBCAT_ATTRIBUTES]?: Record<string, any>;
}
