import type { Category } from '@/modules/category/categoryType';

import { CategoryId, CategoryLabel } from '../categoriesEnums';
import {
  subcategorieGameConsole,
  subcategorieGameConsoleAccessories,
} from './gamingSubcategories';

export const gamingCategory: Category = {
  id: CategoryId.VIDEO_GAMES,
  label: CategoryLabel.VIDEO_GAMES,
  inputs: [],
  subCatgories: [subcategorieGameConsole, subcategorieGameConsoleAccessories],
};
