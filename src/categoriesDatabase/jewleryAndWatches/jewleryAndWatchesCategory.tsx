import { CategoryId, CategoryLabel } from '../categoriesTypes';
import {
  subcategorieBracelet,
  subcategorieEaring,
  subcategorieNeckless,
  subcategorieRing,
  subcategorieWatches,
} from './jewleryAndWatchesSubcategories';

export const jewleryAndWatchesCategory = [
  {
    id: CategoryId.JEWELRY_AND_WATCHES,
    label: CategoryLabel.JEWELRY_AND_WATCHES,
    subCatgories: [
      subcategorieNeckless,
      subcategorieBracelet,
      subcategorieEaring,
      subcategorieRing,
      subcategorieWatches,
    ],
  },
];
