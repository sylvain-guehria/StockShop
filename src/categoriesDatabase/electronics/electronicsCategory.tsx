import type { Category } from '@/modules/category/categoryType';
import { AttributeInputTypes } from '@/modules/category/categoryType';

import { CategoryId, CategoryLabel } from '../categoriesEnums';
import { colorOptions } from '../reusableOptions';
import {
  subcategorieComputer,
  subcategorieLaptop,
  subcategorieMobileAndTablets,
  subcategorieMonitor,
  subcategoriePrinterAndScanner,
  subcategorieSound,
  subcategorieStorage,
  subcategorieTelevision,
} from './electronicsSubcategories';

export const jewleryAndWatchesCategory: Category = {
  uid: CategoryId.ELECTRONICS,
  label: CategoryLabel.ELECTRONICS,
  inputs: [
    {
      uid: 'color',
      label: 'Couleur',
      inputType: AttributeInputTypes.SELECT,
      options: colorOptions,
    },
  ],
  subCatgories: [
    subcategorieMobileAndTablets,
    subcategorieLaptop,
    subcategorieComputer,
    subcategorieStorage,
    subcategoriePrinterAndScanner,
    subcategorieMonitor,
    subcategorieTelevision,
    subcategorieSound,
  ],
};
