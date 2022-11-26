import { categories as categoryFromDB } from '@/categoriesDatabase/categories';

import type { Category, SubCategory } from './categoryType';

export const getSubCategoriesByCategoryUid = (
  categories: Category[],
  categoryUid: string
): SubCategory[] => {
  if (!categoryUid) return [];
  if (!categories || !categories.length) return [];
  const category = categories.find((cat) => cat.uid === categoryUid);
  return category?.subCatgories || [];
};

export const getSubCategoriesByCategoryUidFromDatabase = (
  categoryUid: string
): SubCategory[] => {
  return getSubCategoriesByCategoryUid(categoryFromDB, categoryUid);
};
