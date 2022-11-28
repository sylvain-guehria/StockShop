import type { Category } from '@/modules/category/categoryType';

import { CategoryId, CategoryLabel } from '../categoriesEnums';
import {
  subcategorieBracelet,
  subcategorieEaring,
  subcategorieNeckless,
  subcategorieRing,
  subcategorieWatches,
} from './jewleryAndWatchesSubcategories';

export const jewleryAndWatchesCategory: Category = {
  uid: CategoryId.JEWELRY_AND_WATCHES,
  label: CategoryLabel.JEWELRY_AND_WATCHES,
  subCatgories: [
    subcategorieNeckless,
    subcategorieBracelet,
    subcategorieEaring,
    subcategorieRing,
    subcategorieWatches,
  ],
};
