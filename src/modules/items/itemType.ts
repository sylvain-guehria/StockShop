export interface Item {
  uid?: string;
  label?: string;
  quantityInInventory?: number;
  optimumQuantity?: number;
  buyingPrice?: number;
  sellingPrice?: number;
  description?: string;
  toBuy?: number;
  toSell?: number;
  isPublic?: boolean;
  tva?: number;
  categoryUid?: string;
}
