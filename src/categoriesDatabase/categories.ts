import type { Category } from '@/modules/category/categoryType';

import { booksCategory } from './books/booksCategory';
import { clothingCategory } from './clothing/clothingCategory';
import { electronicsCategory } from './electronics/electronicsCategory';
import { jewleryAndWatchesCategory } from './jewleryAndWatches/jewleryAndWatchesCategory';
import { sportCategory } from './sport/sportCategory';

export const categories: Category[] = [
  clothingCategory,
  sportCategory,
  jewleryAndWatchesCategory,
  booksCategory,
  electronicsCategory,
];
