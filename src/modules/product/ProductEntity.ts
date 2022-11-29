import type { Product } from './productType';
import { ConditionTypeEnum } from './productType';

class ProductEntity implements Product {
  uid: string;

  label: string;

  quantityInInventory: number;

  optimumQuantity: number;

  buyingPrice: number;

  sellingPrice: number;

  description: string;

  toBuy: number;

  isPublic: boolean;

  tva: number;

  categoryUid: string;

  subCategoryUid: string;

  publicDisponibility: string;

  inventoryUid: string;

  catSubcatAttributes: Record<string, any>;

  condition: ConditionTypeEnum;

  photoLink: string;

  static new(product?: Product): ProductEntity {
    return new ProductEntity(product || ({} as Product));
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
    this.isPublic = product.isPublic || false;
    this.tva = product.tva || 0;
    this.categoryUid = product.categoryUid || '';
    this.subCategoryUid = product.subCategoryUid || '';
    this.publicDisponibility = product.publicDisponibility || '';
    this.inventoryUid = product.inventoryUid || '';
    this.catSubcatAttributes = product.catSubcatAttributes || {};
    this.condition = product.condition || ConditionTypeEnum.NEW;
    this.photoLink = product.photoLink || '';
  }

  getCatSubcatAttributes(): Record<string, any> {
    Object.keys(this.catSubcatAttributes).forEach((attribute) => {
      if (!this.catSubcatAttributes[attribute]) {
        this.catSubcatAttributes[attribute] = undefined;
      }
    });
    return this.catSubcatAttributes;
  }

  setCatSubcatAttributes(
    catSubcatAttributes: Record<string, any>
  ): ProductEntity {
    this.catSubcatAttributes = catSubcatAttributes;
    return this;
  }

  getInventoryUid(): string {
    return this.inventoryUid;
  }

  setInventoryUid(inventoryUid: string): ProductEntity {
    this.inventoryUid = inventoryUid;
    return this;
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

  getSubCategoryUid(): string {
    return this.subCategoryUid;
  }

  setSubCategoryUid(subCategoryUid: string): ProductEntity {
    this.subCategoryUid = subCategoryUid;
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

  isSameCategory(categoryUid: string): boolean {
    return this.categoryUid === categoryUid;
  }

  isSameSubCategory(subCategoryUid: string): boolean {
    return this.subCategoryUid === subCategoryUid;
  }

  getCondition(): ConditionTypeEnum {
    return this.condition;
  }

  setCondition(condition: ConditionTypeEnum): ProductEntity {
    this.condition = condition;
    return this;
  }

  getPhotoLink(): string {
    return this.photoLink;
  }

  setPhotoLink(photoLink: string): ProductEntity {
    this.photoLink = photoLink;
    return this;
  }
}

export default ProductEntity;
