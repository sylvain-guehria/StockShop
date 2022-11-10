/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import ItemEntity from './ItemEntity';
import { ItemRepository } from './itemRepository';

class FirebaseItemRepository extends ItemRepository {
  async getById(uid: string): Promise<ItemEntity> {
    console.info('get item in db with uid: ', uid);
    const response = await axios.get(`/api/item/${uid}`);
    const {
      label,
      quantityInStock,
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

    return ItemEntity.new({
      uid,
      label,
      quantityInStock,
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

  async add(item: ItemEntity): Promise<string> {
    console.info('adding item in db...');
    const res = await axios.post('/api/item/add', {
      uid: item.getUid(),
      label: item.getLabel(),
      quantityInStock: item.getQuantityInStock(),
      optimumQuantity: item.getOptimumQuantity(),
      buyingPrice: item.getBuyingPrice(),
      sellingPrice: item.getSellingPrice(),
      description: item.getDescription(),
      toBuy: item.getToBuy(),
      toSell: item.getToSell(),
      isPublic: item.getIsPublic(),
      tva: item.getTva(),
      categoryUid: item.getCategoryUid(),
    });
    console.info('Item added in DB, uid: ', item.getUid());
    return res.data;
  }

  async delete(uid: string): Promise<void> {
    console.info(`Deleting item with uid ${uid} in db...`);
    return axios.post('/api/item/delete', { uid });
  }

  async getAll(): Promise<ItemEntity[]> {
    console.info('get all items in db');
    const response = await axios.get('/api/item/getAll');
    return response.data.map(
      (item: ItemEntity) =>
        new ItemEntity({
          uid: item.uid,
          label: item.label,
          quantityInStock: item.quantityInStock,
          optimumQuantity: item.optimumQuantity,
          buyingPrice: item.buyingPrice,
          sellingPrice: item.sellingPrice,
          description: item.description,
          toBuy: item.toBuy,
          toSell: item.toSell,
          isPublic: item.isPublic,
          tva: item.tva,
          categoryUid: item.categoryUid,
        })
    );
  }

  async update(item: ItemEntity): Promise<void> {
    console.info('update item uid: ', item.getUid());
    await axios.put(`/api/item/${item.getUid()}`, {
      uid: item.getUid(),
      label: item.getLabel(),
      quantityInStock: item.getQuantityInStock(),
      optimumQuantity: item.getOptimumQuantity(),
      buyingPrice: item.getBuyingPrice(),
      sellingPrice: item.getSellingPrice(),
      description: item.getDescription(),
      toBuy: item.getToBuy(),
      toSell: item.getToSell(),
      isPublic: item.getIsPublic(),
      tva: item.getTva(),
      categoryUid: item.getCategoryUid(),
    });
  }
}

export default FirebaseItemRepository;
