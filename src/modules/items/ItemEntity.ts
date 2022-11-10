import type { Item } from './itemType';

class ItemEntity implements Item {
  uid: string;

  label: string;

  quantityInStock: number;

  optimumQuantity: number;

  buyingPrice: number;

  sellingPrice: number;

  description: string;

  toBuy: number;

  toSell: number;

  isPublic: boolean;

  tva: number;

  categoryUid: string;

  static new(item?: Item): ItemEntity {
    return new ItemEntity(item || {});
  }

  constructor(item: Item) {
    this.uid = item.uid || '';
    this.label = item.label || '';
    this.quantityInStock = item.quantityInStock || 0;
    this.optimumQuantity = item.optimumQuantity || 0;
    this.buyingPrice = item.buyingPrice || 0;
    this.sellingPrice = item.sellingPrice || 0;
    this.description = item.description || '';
    this.toBuy = item.toBuy || 0;
    this.toSell = item.toSell || 0;
    this.isPublic = item.isPublic || false;
    this.tva = item.tva || 0;
    this.categoryUid = item.categoryUid || '';
  }

  getUid(): string {
    return this.uid;
  }

  setUid(uid: string): ItemEntity {
    this.uid = uid;
    return this;
  }

  getLabel(): string {
    return this.label;
  }

  setLabel(label: string): ItemEntity {
    this.label = label;
    return this;
  }

  getQuantityInStock(): number {
    return this.quantityInStock;
  }

  setQuantityInStock(quantityInStock: number): ItemEntity {
    this.quantityInStock = quantityInStock;
    return this;
  }

  getOptimumQuantity(): number {
    return this.optimumQuantity;
  }

  setOptimumQuantity(optimumQuantity: number): ItemEntity {
    this.optimumQuantity = optimumQuantity;
    return this;
  }

  getBuyingPrice(): number {
    return this.buyingPrice;
  }

  setBuyingPrice(buyingPrice: number): ItemEntity {
    this.buyingPrice = buyingPrice;
    return this;
  }

  getSellingPrice(): number {
    return this.sellingPrice;
  }

  setSellingPrice(sellingPrice: number): ItemEntity {
    this.sellingPrice = sellingPrice;
    return this;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): ItemEntity {
    this.description = description;
    return this;
  }

  getToBuy(): number {
    return this.toBuy;
  }

  setToBuy(toBuy: number): ItemEntity {
    this.toBuy = toBuy;
    return this;
  }

  getToSell(): number {
    return this.toSell;
  }

  setToSell(toSell: number): ItemEntity {
    this.toSell = toSell;
    return this;
  }

  getIsPublic(): boolean {
    return this.isPublic;
  }

  setIsPublic(isPublic: boolean): ItemEntity {
    this.isPublic = isPublic;
    return this;
  }

  getTva(): number {
    return this.tva;
  }

  setTva(tva: number): ItemEntity {
    this.tva = tva;
    return this;
  }

  getCategoryUid(): string {
    return this.categoryUid;
  }

  setCategoryUid(categoryUid: string): ItemEntity {
    this.categoryUid = categoryUid;
    return this;
  }

  getBuyingPriceWithTva(): number {
    return this.buyingPrice * (1 + this.tva / 100);
  }

  getSellingPriceWithTva(): number {
    return this.sellingPrice * (1 + this.tva / 100);
  }

  getBuyingPriceWithTvaAndQuantity(): number {
    return this.getBuyingPriceWithTva() * this.quantityInStock;
  }

  getSellingPriceWithTvaAndQuantity(): number {
    return this.getSellingPriceWithTva() * this.quantityInStock;
  }
}

export default ItemEntity;
