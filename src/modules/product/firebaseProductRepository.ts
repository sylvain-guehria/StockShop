/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import ProductEntity from './ProductEntity';
import { ProductRepository } from './productRepository';

class FirebaseProductRepository extends ProductRepository {
  async getById(uid: string): Promise<ProductEntity> {
    console.info('get product in db with uid: ', uid);
    const response = await axios.get(`/api/product/${uid}`);
    const {
      label,
      quantityInInventory,
      optimumQuantity,
      buyingPrice,
      sellingPrice,
      description,
      toBuy,
      toSell,
      isPublic,
      tva,
      categoryUid,
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
      toSell,
      isPublic,
      tva,
      categoryUid,
    });
  }

  async add(product: ProductEntity): Promise<string> {
    console.info('adding product in db...');
    const res = await axios.post('/api/product/add', {
      uid: product.getUid(),
      label: product.getLabel(),
      quantityInInventory: product.getQuantityInInventory(),
      optimumQuantity: product.getOptimumQuantity(),
      buyingPrice: product.getBuyingPrice(),
      sellingPrice: product.getSellingPrice(),
      description: product.getDescription(),
      toBuy: product.getToBuy(),
      toSell: product.getToSell(),
      isPublic: product.getIsPublic(),
      tva: product.getTva(),
      categoryUid: product.getCategoryUid(),
    });
    console.info('Product added in DB, uid: ', product.getUid());
    return res.data;
  }

  async delete(uid: string): Promise<void> {
    console.info(`Deleting product with uid ${uid} in db...`);
    return axios.post('/api/product/delete', { uid });
  }

  async getAll(): Promise<ProductEntity[]> {
    console.info('get all  in db');
    const response = await axios.get('/api/product/getAll');
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
          toSell: product.toSell,
          isPublic: product.isPublic,
          tva: product.tva,
          categoryUid: product.categoryUid,
        })
    );
  }

  async update(product: ProductEntity): Promise<void> {
    console.info('update product uid: ', product.getUid());
    await axios.put(`/api/product/${product.getUid()}`, {
      uid: product.getUid(),
      label: product.getLabel(),
      quantityInInventory: product.getQuantityInInventory(),
      optimumQuantity: product.getOptimumQuantity(),
      buyingPrice: product.getBuyingPrice(),
      sellingPrice: product.getSellingPrice(),
      description: product.getDescription(),
      toBuy: product.getToBuy(),
      toSell: product.getToSell(),
      isPublic: product.getIsPublic(),
      tva: product.getTva(),
      categoryUid: product.getCategoryUid(),
    });
  }
}

export default FirebaseProductRepository;
