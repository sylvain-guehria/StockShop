import type { Product } from './productType';

class ProductEntity implements Product {
  uid: string;

  label: string;

  quantityInInventory: number;

  optimumQuantity: number;

  buyingPrice: number;

  sellingPrice: number;

  description: string;

  toBuy: number;

  toSell: number;

  isPublic: boolean;

  tva: number;

  categoryUid: string;

  publicDisponibility: string;

  static new(product?: Product): ProductEntity {
    return new ProductEntity(product || {});
  }

  constructor(product: Product) {
    this.uid = product.uid || '';
    this.label = product.label || '';
    this.quantityInInventory = product.quantityInInventory || 0;
    this.optimumQuantity = product.optimumQuantity || 0;
    this.buyingPrice = product.buyingPrice || 0;
    this.sellingPrice = product.sellingPrice || 0;
    this.description = product.description || '';
    this.toBuy = product.toBuy || 0;
    this.toSell = product.toSell || 0;
    this.isPublic = product.isPublic || false;
    this.tva = product.tva || 0;
    this.categoryUid = product.categoryUid || '';
    this.publicDisponibility = product.publicDisponibility || '';
  }

  getUid(): string {
    return this.uid;
  }

  setUid(uid: string): ProductEntity {
    this.uid = uid;
    return this;
  }

  getLabel(): string {
    return this.label;
  }

  setLabel(label: string): ProductEntity {
    this.label = label;
    return this;
  }

  getQuantityInInventory(): number {
    return this.quantityInInventory;
  }

  setQuantityInInventory(quantityInInventory: number): ProductEntity {
    this.quantityInInventory = quantityInInventory;
    return this;
  }

  getOptimumQuantity(): number {
    return this.optimumQuantity;
  }

  setOptimumQuantity(optimumQuantity: number): ProductEntity {
    this.optimumQuantity = optimumQuantity;
    return this;
  }

  getBuyingPrice(): number {
    return this.buyingPrice;
  }

  setBuyingPrice(buyingPrice: number): ProductEntity {
    this.buyingPrice = buyingPrice;
    return this;
  }

  getSellingPrice(): number {
    return this.sellingPrice;
  }

  setSellingPrice(sellingPrice: number): ProductEntity {
    this.sellingPrice = sellingPrice;
    return this;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): ProductEntity {
    this.description = description;
    return this;
  }

  getToBuy(): number {
    return this.toBuy;
  }

  setToBuy(toBuy: number): ProductEntity {
    this.toBuy = toBuy;
    return this;
  }

  getToSell(): number {
    return this.toSell;
  }

  setToSell(toSell: number): ProductEntity {
    this.toSell = toSell;
    return this;
  }

  getIsPublic(): boolean {
    return this.isPublic;
  }

  setIsPublic(isPublic: boolean): ProductEntity {
    this.isPublic = isPublic;
    return this;
  }

  getTva(): number {
    return this.tva;
  }

  setTva(tva: number): ProductEntity {
    this.tva = tva;
    return this;
  }

  getCategoryUid(): string {
    return this.categoryUid;
  }

  setCategoryUid(categoryUid: string): ProductEntity {
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
    return this.getBuyingPriceWithTva() * this.quantityInInventory;
  }

  getSellingPriceWithTvaAndQuantity(): number {
    return this.getSellingPriceWithTva() * this.quantityInInventory;
  }

  getPublicDisponibility(): string {
    return this.publicDisponibility;
  }

  setPublicDisponibility(publicDisponibility: string): ProductEntity {
    this.publicDisponibility = publicDisponibility;
    return this;
  }
}

export default ProductEntity;
