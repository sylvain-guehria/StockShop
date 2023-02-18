export enum ProductAttributes {
  ID = 'id',
  LABEL = 'label',
  QUANTITY_IN_INVENTORY = 'quantityInInventory',
  OPTIMUM_QUANTITY = 'optimumQuantity',
  BUYING_PRICE = 'buyingPrice',
  SELLING_PRICE = 'sellingPrice',
  DESCRIPTION = 'description',
  TO_BUY = 'toBuy',
  IS_PUBLIC = 'isPublic',
  TVA = 'tva',
  CATEGORY_ID = 'categoryId',
  SUB_CATEGORY_ID = 'subCategoryId',
  PUBLIC_DISPONIBILITY = 'publicDisponibility',
  INVENTORY_ID = 'inventoryId',
  CAT_SUBCAT_ATTRIBUTES = 'catSubcatAttributes',
  CONDITION = 'condition',
  PHOTO_LINK = 'photoLink',
  MADE_IN = 'madeIn',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export const ProductLabels = {
  [ProductAttributes.ID]: 'Id',
  [ProductAttributes.LABEL]: 'Label',
  [ProductAttributes.QUANTITY_IN_INVENTORY]: 'Quantité en stock',
  [ProductAttributes.OPTIMUM_QUANTITY]: 'Quantité optimale en stock',
  [ProductAttributes.BUYING_PRICE]: "Prix d'achat HT",
  [ProductAttributes.SELLING_PRICE]: 'Prix de vente HT',
  [ProductAttributes.DESCRIPTION]: 'Description',
  [ProductAttributes.TO_BUY]: 'Quantité à acheter',
  [ProductAttributes.IS_PUBLIC]: 'Visibilité',
  [ProductAttributes.TVA]: 'TVA',
  [ProductAttributes.CATEGORY_ID]: 'Catégorie',
  [ProductAttributes.SUB_CATEGORY_ID]: 'Sous-catégorie',
  [ProductAttributes.PUBLIC_DISPONIBILITY]: 'Disponibilité publique',
  [ProductAttributes.INVENTORY_ID]: 'Inventaire',
  [ProductAttributes.CAT_SUBCAT_ATTRIBUTES]: 'Attributs',
  [ProductAttributes.CONDITION]: 'Etat',
  [ProductAttributes.PHOTO_LINK]: 'Photo',
  [ProductAttributes.UPDATED_AT]: 'Date de création',
  [ProductAttributes.CREATED_AT]: 'Date de modification',
} as const;

export enum ConditionTypeEnum {
  NEW = 'new',
  USED = 'used',
  REFURBISHED = 'refurbished',
}

export const ConditionLabels = {
  [ConditionTypeEnum.NEW]: 'Neuf',
  [ConditionTypeEnum.USED]: 'Occasion',
  [ConditionTypeEnum.REFURBISHED]: 'Reconditionné',
};

export interface Product {
  [ProductAttributes.ID]?: string;
  [ProductAttributes.LABEL]?: string;
  [ProductAttributes.QUANTITY_IN_INVENTORY]?: number;
  [ProductAttributes.OPTIMUM_QUANTITY]?: number;
  [ProductAttributes.BUYING_PRICE]?: number;
  [ProductAttributes.SELLING_PRICE]?: number;
  [ProductAttributes.DESCRIPTION]?: string;
  [ProductAttributes.TO_BUY]?: number;
  [ProductAttributes.IS_PUBLIC]?: boolean;
  [ProductAttributes.TVA]?: number;
  [ProductAttributes.CATEGORY_ID]?: string;
  [ProductAttributes.SUB_CATEGORY_ID]?: string;
  [ProductAttributes.PUBLIC_DISPONIBILITY]?: string;
  [ProductAttributes.INVENTORY_ID]?: string;
  [ProductAttributes.CAT_SUBCAT_ATTRIBUTES]?: Record<string, any>;
  [ProductAttributes.CONDITION]?: ConditionTypeEnum;
  [ProductAttributes.PHOTO_LINK]?: string;
  [ProductAttributes.UPDATED_AT]?: string;
  [ProductAttributes.CREATED_AT]?: string;
}
