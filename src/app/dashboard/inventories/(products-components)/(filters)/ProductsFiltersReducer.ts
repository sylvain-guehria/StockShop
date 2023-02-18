import { ProductAttributes } from '@/modules/product/productType';

export enum ORDER {
  ASC = 'asc',
  DESC = 'desc',
}

export type FilterPropertyType = {
  [ProductAttributes.CATEGORY_ID]?: string;
  [ProductAttributes.SUB_CATEGORY_ID]?: string;
  [ProductAttributes.TO_BUY]?: 'true' | 'false';
  [ProductAttributes.IS_PUBLIC]?: 'true' | 'false';
};

export type SorterType = {
  field?: AuthorizedOrderProperty;
  order: ORDER;
};

export type AuthorizedFilterProperty =
  | ProductAttributes.CATEGORY_ID
  | ProductAttributes.SUB_CATEGORY_ID
  | ProductAttributes.TO_BUY
  | ProductAttributes.IS_PUBLIC;

export type AuthorizedOrderProperty =
  | ProductAttributes.LABEL
  | ProductAttributes.CREATED_AT
  | ProductAttributes.UPDATED_AT
  | ProductAttributes.SELLING_PRICE
  | ProductAttributes.BUYING_PRICE
  | ProductAttributes.QUANTITY_IN_INVENTORY
  | ProductAttributes.OPTIMUM_QUANTITY
  | ProductAttributes.TO_BUY;

export type FiltersStateType = {
  sorter: SorterType;
  filters: FilterPropertyType;
};

export enum ActionNamesEnum {
  SET_FILTER = 'SET_FILTER',
  SET_FILTERS = 'SET_FILTERS',
  RESET_FILTERS = 'RESET_FILTERS',
  SET_SORTER_FIELD = 'SET_SORTER_FIELD',
  CHANGE_SORTER_ORDER = 'CHANGE_SORTER_ORDER',
}

export type FiltersActionsType = {
  type: ActionNamesEnum;
  payload?: {
    filter?: {
      attribute?: AuthorizedFilterProperty;
      value?: string | number | boolean;
    };
    filters?: FilterPropertyType;
    sorterField?: AuthorizedOrderProperty;
  };
};

export const initialFilters = {
  [ProductAttributes.CATEGORY_ID]: undefined,
  [ProductAttributes.SUB_CATEGORY_ID]: undefined,
  [ProductAttributes.TO_BUY]: undefined,
  [ProductAttributes.IS_PUBLIC]: undefined,
  [ProductAttributes.CONDITION]: undefined,
};

export const initialFilterState: FiltersStateType = {
  sorter: {
    field: ProductAttributes.UPDATED_AT,
    order: ORDER.DESC,
  },
  filters: initialFilters,
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
          [action.payload?.filter?.attribute as unknown as string]:
            action.payload?.filter?.value,
        },
      };
    case ActionNamesEnum.SET_FILTERS:
      return {
        ...filtersState,
        filters: {
          ...action.payload?.filters,
        },
      };
    case ActionNamesEnum.RESET_FILTERS:
      return { ...initialFilterState };
    case ActionNamesEnum.SET_SORTER_FIELD:
      return {
        ...filtersState,
        sorter: {
          order: filtersState.sorter.order,
          field: action.payload?.sorterField,
        },
      };
    case ActionNamesEnum.CHANGE_SORTER_ORDER:
      return {
        ...filtersState,
        sorter: {
          order:
            filtersState.sorter.order === ORDER.ASC ? ORDER.DESC : ORDER.ASC,
          field: filtersState.sorter.field,
        },
      };
    default:
      throw new Error('Unknown action type');
  }
};
