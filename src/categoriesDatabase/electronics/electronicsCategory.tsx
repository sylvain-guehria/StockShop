import type { Category } from '@/modules/category/categoryType';
import { AttributeInputTypes } from '@/modules/category/categoryType';

import { CategoryId, CategoryLabel } from '../categoriesEnums';
import { colorOptions } from '../reusableOptions';
import {
  subcategorieComputer,
  subcategorieComputerComponants,
  subcategorieComputerDevices,
  subcategorieLaptop,
  subcategorieMobileAndTablets,
  subcategorieMonitor,
  subcategoriePhotoAndVideo,
  subcategoriePrinterAndScanner,
  subcategorieSound,
  subcategorieStorage,
  subcategorieTelevision,
} from './electronicsSubcategories';

export const electronicsCategory: Category = {
  id: CategoryId.ELECTRONICS,
  label: CategoryLabel.ELECTRONICS,
  inputs: [
    {
      id: 'color',
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
    subcategorieComputerComponants,
    subcategorieComputerDevices,
    subcategoriePhotoAndVideo,
  ],
};
