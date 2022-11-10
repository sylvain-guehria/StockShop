/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import CategoryEntity from './CategoryEntity';
import { CategoryRepository } from './categoryRepository';

class FirebaseCategoryRepository extends CategoryRepository {
  async getById(uid: string): Promise<CategoryEntity> {
    console.info('get category in db with uid: ', uid);
    const response = await axios.get(`/api/category/${uid}`);
    const { label, attributs } = response.data;

    return CategoryEntity.new({
      uid,
      label,
      attributs,
    });
  }

  async add(category: CategoryEntity): Promise<string> {
    console.info('adding category in db...');
    const res = await axios.post('/api/category/add', {
      uid: category.getUid(),
      label: category.getLabel(),
      attributs: category.getAttributs(),
    });
    console.info('Category added in DB, uid: ', category.getUid());
    return res.data;
  }

  async delete(uid: string): Promise<void> {
    console.info(`Deleting category with uid ${uid} in db...`);
    return axios.post('/api/category/delete', { uid });
  }

  async getAll(): Promise<CategoryEntity[]> {
    console.info('get all categorys in db');
    const response = await axios.get('/api/category/getAll');
    return response.data.map(
      (category: CategoryEntity) =>
        new CategoryEntity({
          uid: category.uid,
          label: category.label,
          attributs: category.attributs,
        })
    );
  }

  async update(category: CategoryEntity): Promise<void> {
    console.info('update category uid: ', category.getUid());
    await axios.put(`/api/category/${category.getUid()}`, {
      uid: category.getUid(),
      label: category.getLabel(),
      attributs: category.getAttributs(),
    });
  }
}

export default FirebaseCategoryRepository;
