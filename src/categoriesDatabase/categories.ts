import type { Category } from '@/modules/category/categoryType';

import { booksCategory } from './books/booksCategory';
import { clothingCategory } from './clothing/clothingCategory';
import { electronicsCategory } from './electronics/electronicsCategory';
import { gamingCategory } from './gaming/gamingCategory';
import { jewleryAndWatchesCategory } from './jewleryAndWatches/jewleryAndWatchesCategory';
import { majorAppliancesCategory } from './majorAppliances/majorAppliancesCategory';
import { sportCategory } from './sport/sportCategory';

export const categories: Category[] = [
  clothingCategory,
  sportCategory,
  jewleryAndWatchesCategory,
  booksCategory,
  electronicsCategory,
  majorAppliancesCategory,
  gamingCategory,
];
