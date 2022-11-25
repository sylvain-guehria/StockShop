import type { Category } from '@/modules/category/categoryType';

import { booksCategory } from './books/booksCategory';
import { clothingCategory } from './clothing/clothingCategory';
import { jewleryAndWatchesCategory } from './jewleryAndWatches/jewleryAndWatchesCategory';
import { sportCategory } from './sport/sportCategory';

export const categories: Category[] = [
  clothingCategory,
  sportCategory,
  jewleryAndWatchesCategory,
  booksCategory,
];

export const getSubCategoriesByCategoryUid = (categoryUid: string) => {
  const category = categories.find((cat) => cat.uid === categoryUid);
  return category?.subCatgories;
};
