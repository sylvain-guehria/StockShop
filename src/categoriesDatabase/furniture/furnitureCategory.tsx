import type { Category } from '@/modules/category/categoryType';

import { CategoryId, CategoryLabel } from '../categoriesEnums';
import {
  subcategorieAccessoriesBed,
  subcategorieBed,
  subcategorieChairAndStool,
  subcategorieDesk,
  subcategorieSofaAndArmchair,
  subcategorieTable,
} from './furnitureSubcategories';

export const furnitureCategory: Category = {
  uid: CategoryId.FURNITURE,
  label: CategoryLabel.FURNITURE,
  subCatgories: [
    subcategorieTable,
    subcategorieChairAndStool,
    subcategorieBed,
    subcategorieAccessoriesBed,
    subcategorieDesk,
    subcategorieSofaAndArmchair,
  ],
};
