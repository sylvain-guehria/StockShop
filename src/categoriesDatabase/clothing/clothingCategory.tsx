import type { Category } from '@/modules/category/categoryType';
import { AttributeInputTypes } from '@/modules/category/categoryType';

import { CategoryId, CategoryLabel } from '../categoriesEnums';
import { colorOptions, sexOptions } from '../reusableOptions';
import {
  subcategorieAccessories,
  subcategorieClothes,
  subcategorieShoes,
} from './clothingSubcategories';

export const clothingCategory: Category = {
  id: CategoryId.CLOTHING,
  label: CategoryLabel.CLOTHING,
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
  ],
  subCatgories: [
    subcategorieClothes,
    subcategorieShoes,
    subcategorieAccessories,
  ],
};
