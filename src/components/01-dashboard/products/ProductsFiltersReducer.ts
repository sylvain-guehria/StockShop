import type { ConditionTypeEnum } from '@/modules/product/productType';
import { ProductAttributes } from '@/modules/product/productType';

export interface FiltersStateInterface {
  [ProductAttributes.LABEL]?: string;
  [ProductAttributes.CATEGORY_UID]?: string;
  [ProductAttributes.SUB_CATEGORY_UID]: string;
  [ProductAttributes.TVA]?: number;
  [ProductAttributes.TO_BUY]?: boolean;
  [ProductAttributes.IS_PUBLIC]?: boolean;
  [ProductAttributes.CONDITION]?: ConditionTypeEnum;
}

enum ActionNamesEnum {
  SET_FILTER = 'SET_FILTER',
  RESET_FILTERS = 'RESET_FILTERS',
}

interface FiltersActions {
  type: ActionNamesEnum;
  payload: {
    attribute: ProductAttributes;
    value: string | number | boolean;
  };
}

export const initialFilterState: FiltersStateInterface = {
  [ProductAttributes.LABEL]: '',
  [ProductAttributes.CATEGORY_UID]: '',
  [ProductAttributes.SUB_CATEGORY_UID]: '',
  [ProductAttributes.TVA]: undefined,
  [ProductAttributes.TO_BUY]: undefined,
  [ProductAttributes.IS_PUBLIC]: undefined,
  [ProductAttributes.CONDITION]: undefined,
};

export const reducerFilters = (
  filtersState: FiltersStateInterface,
  action: FiltersActions
) => {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...filtersState,
        [action.payload.attribute]: action.payload.value,
      };
    case 'RESET_FILTERS':
      return { ...initialFilterState };
    default:
      throw new Error('Unknown action type');
  }
};
