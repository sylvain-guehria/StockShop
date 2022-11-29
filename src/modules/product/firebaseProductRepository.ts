/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import ProductEntity from './ProductEntity';
import type {
  AddProduct,
  DeleteProduct,
  UpdateProduct,
} from './productRepository';
import { ProductRepository } from './productRepository';

class FirebaseProductRepository extends ProductRepository {
  baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  async getById(uid: string): Promise<ProductEntity> {
    console.info('get product in db with uid: ', uid);
    const response = await axios.get(`${this.baseUrl}/api/product/${uid}`);
    const {
      label,
      quantityInInventory,
      optimumQuantity,
      buyingPrice,
      sellingPrice,
      description,
      toBuy,
      isPublic,
      tva,
      categoryUid,
      subCategoryUid,
      publicDisponibility,
      inventoryUid,
      catSubcatAttributes,
      condition,
      photoLink,
    } = response.data;

    return ProductEntity.new({
      uid,
      label,
      quantityInInventory,
      optimumQuantity,
      buyingPrice,
      sellingPrice,
      description,
      toBuy,
      isPublic,
      tva,
      categoryUid,
      subCategoryUid,
      publicDisponibility,
      inventoryUid,
      catSubcatAttributes,
      condition,
      photoLink,
    });
  }

  async add({
    product,
    userUid,
    companyUid,
  }: AddProduct): Promise<ProductEntity> {
    console.info('adding product in db...');
    const res = await axios.post(`${this.baseUrl}/api/product/add`, {
      userUid,
      companyUid,
      product: {
        uid: product.getUid(),
        label: product.getLabel(),
        inventoryUid: product.getInventoryUid(),
      },
    });
    console.info('Product added in DB, uid: ', product.getUid());
    const { uid, label, inventoryUid } = res.data;
    return ProductEntity.new({
      uid,
      label,
      inventoryUid,
    });
  }

  async delete({
    productUid,
    userUid,
    companyUid,
    inventoryUid,
  }: DeleteProduct): Promise<void> {
    console.info(`Deleting product with uid ${productUid} in db...`);
    return axios.delete(`${this.baseUrl}/api/product/delete`, {
      params: {
        productUid,
        userUid,
        companyUid,
        inventoryUid,
      },
    });
  }

  async update({
    product,
    userUid,
    companyUid,
  }: UpdateProduct): Promise<ProductEntity> {
    console.info('update product uid: ', product.getUid());
    const { data } = await axios.put(
      `${this.baseUrl}/api/product/${product.getUid()}`,
      {
        userUid,
        companyUid,
        inventoryUid: product.getInventoryUid(),
        product: {
          uid: product.getUid(),
          label: product.getLabel(),
          quantityInInventory: product.getQuantityInInventory(),
          optimumQuantity: product.getOptimumQuantity(),
          buyingPrice: product.getBuyingPrice(),
          sellingPrice: product.getSellingPrice(),
          description: product.getDescription(),
          toBuy: product.getToBuy(),
          isPublic: product.getIsPublic(),
          tva: product.getTva(),
          categoryUid: product.getCategoryUid(),
          subCategoryUid: product.getSubCategoryUid(),
          publicDisponibility: product.getPublicDisponibility(),
          catSubcatAttributes: product.getCatSubcatAttributes(),
          condition: product.getCondition(),
          photoLink: product.getPhotoLink(),
        },
      }
    );
    return ProductEntity.new({
      uid: data.uid,
      label: data.label,
      quantityInInventory: data.quantityInInventory,
      optimumQuantity: data.optimumQuantity,
      buyingPrice: data.buyingPrice,
      sellingPrice: data.sellingPrice,
      description: data.description,
      toBuy: data.toBuy,
      isPublic: data.isPublic,
      tva: data.tva,
      categoryUid: data.categoryUid,
      subCategoryUid: data.subCategoryUid,
      publicDisponibility: data.publicDisponibility,
      inventoryUid: data.inventoryUid,
      catSubcatAttributes: data.catSubcatAttributes,
      condition: data.condition,
      photoLink: data.photoLink,
    });
  }

  async getProductsByUserUidCompanyUidInventoryUid({
    userUid,
    inventoryUid,
    companyUid,
  }: {
    userUid: string;
    inventoryUid: string;
    companyUid: string;
  }): Promise<ProductEntity[]> {
    console.info(
      'get all products by userUid, companyUid and inventoryUid in db'
    );
    const response = await axios.get(
      `${this.baseUrl}/api/product/getProductsByUserUidCompanyUidInventoryUid`,
      {
        params: { userUid, companyUid, inventoryUid },
      }
    );
    return response.data.map(
      (product: ProductEntity) =>
        new ProductEntity({
          uid: product.uid,
          label: product.label,
          quantityInInventory: product.quantityInInventory,
          optimumQuantity: product.optimumQuantity,
          buyingPrice: product.buyingPrice,
          sellingPrice: product.sellingPrice,
          description: product.description,
          toBuy: product.toBuy,
          isPublic: product.isPublic,
          tva: product.tva,
          categoryUid: product.categoryUid,
          subCategoryUid: product.subCategoryUid,
          publicDisponibility: product.publicDisponibility,
          inventoryUid: product.inventoryUid,
          catSubcatAttributes: product.catSubcatAttributes,
          condition: product.condition,
          photoLink: product.photoLink,
        })
    );
  }
}

export default FirebaseProductRepository;
