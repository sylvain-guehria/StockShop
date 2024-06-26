import type { Category } from '@/modules/category/categoryType';
import { AttributeInputTypes } from '@/modules/category/categoryType';

import { CategoryId, CategoryLabel } from '../categoriesEnums';
import { colorOptions, sexOptions } from '../reusableOptions';
import {
  subcategorieBracelet,
  subcategorieEaring,
  subcategorieNeckless,
  subcategorieRing,
  subcategorieWatches,
} from './jewleryAndWatchesSubcategories';
import { jewleryMaterial } from './reusableOptions';

export const jewleryAndWatchesCategory: Category = {
  id: CategoryId.JEWELRY_AND_WATCHES,
  label: CategoryLabel.JEWELRY_AND_WATCHES,
  inputs: [
    {
      id: 'sex',
      label: 'Sexe',
      inputType: AttributeInputTypes.SELECT,
      options: sexOptions,
    },
    {
      id: 'color',
      label: 'Couleur',
      inputType: AttributeInputTypes.SELECT,
      options: [...colorOptions],
    },
    {
      id: 'material',
      label: 'Matière principale',
      inputType: AttributeInputTypes.SELECT,
      options: jewleryMaterial,
    },
  ],
  subCatgories: [
    subcategorieNeckless,
    subcategorieBracelet,
    subcategorieEaring,
    subcategorieRing,
    subcategorieWatches,
  ],
};
