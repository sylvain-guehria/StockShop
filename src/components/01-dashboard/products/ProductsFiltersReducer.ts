import type { ConditionTypeEnum } from '@/modules/product/productType';
import { ProductAttributes } from '@/modules/product/productType';

export enum ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type FiltersStateType = {
  sorter: {
    field: string;
    order: ORDER;
  };
  filters: {
    [ProductAttributes.LABEL]?: string;
    [ProductAttributes.CATEGORY_UID]?: string;
    [ProductAttributes.SUB_CATEGORY_UID]?: string;
    [ProductAttributes.TVA]?: number;
    [ProductAttributes.TO_BUY]?: boolean;
    [ProductAttributes.IS_PUBLIC]?: boolean;
    [ProductAttributes.CONDITION]?: ConditionTypeEnum;
  };
};

enum ActionNamesEnum {
  SET_FILTER = 'SET_FILTER',
  RESET_FILTERS = 'RESET_FILTERS',
  SET_SORTER_FIELD = 'SET_SORTER_FIELD',
  CHANGE_SORTER_ORDER = 'CHANGE_SORTER_ORDER',
}

export type FiltersActionsType = {
  type: ActionNamesEnum;
  payload: {
    attribute?: ProductAttributes;
    value?: string | number | boolean;
  };
};

export const initialFilterState: FiltersStateType = {
  sorter: {
    field: ProductAttributes.CREATION_DATE,
    order: ORDER.DESC,
  },
  filters: {
    [ProductAttributes.LABEL]: undefined,
    [ProductAttributes.CATEGORY_UID]: undefined,
    [ProductAttributes.SUB_CATEGORY_UID]: undefined,
    [ProductAttributes.TVA]: undefined,
    [ProductAttributes.TO_BUY]: undefined,
    [ProductAttributes.IS_PUBLIC]: undefined,
    [ProductAttributes.CONDITION]: undefined,
  },
};

export const reducerFilters = (
  filtersState: FiltersStateType,
  action: FiltersActionsType
) => {
  switch (action.type) {
    case ActionNamesEnum.SET_FILTER:
      return {
        ...filtersState,
        filters: {
          ...filtersState.filters,
          [action.payload.attribute || '']: action.payload.value,
        },
      };
    case ActionNamesEnum.RESET_FILTERS:
      return { ...initialFilterState };
    case ActionNamesEnum.SET_SORTER_FIELD:
      return {
        ...filtersState,
        sorter: {
          order: filtersState.sorter.order as ORDER,
          field: action.payload.attribute as string,
        },
      };
    case ActionNamesEnum.CHANGE_SORTER_ORDER:
      return {
        ...filtersState,
        sorter: {
          order:
            filtersState.sorter.order === ORDER.ASC ? ORDER.DESC : ORDER.ASC,
          field: filtersState.sorter.field as string,
        },
      };
    default:
      throw new Error('Unknown action type');
  }
};
