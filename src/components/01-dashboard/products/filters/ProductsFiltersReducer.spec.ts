import { ProductAttributes } from '@/modules/product/productType';

import type {
  FiltersActionsType,
  FiltersStateType,
} from './ProductsFiltersReducer';
import {
  ActionNamesEnum,
  initialFilterState,
  ORDER,
  reducerFilters,
} from './ProductsFiltersReducer';

const initialFiltersState: FiltersStateType = {
  sorter: {
    field: ProductAttributes.CREATION_DATE,
    order: ORDER.DESC,
  },
  filters: {
    [ProductAttributes.CATEGORY_UID]: 'cat_uid',
    [ProductAttributes.SUB_CATEGORY_UID]: '67890',
    [ProductAttributes.TO_BUY]: true,
    [ProductAttributes.IS_PUBLIC]: false,
  },
};

describe('reducerFilters', () => {
  it('should handle SET_FILTER action', () => {
    const action: FiltersActionsType = {
      type: ActionNamesEnum.SET_FILTER,
      payload: {
        filter: {
          attribute: ProductAttributes.CATEGORY_UID,
          value: 'updated_cat_uid',
        },
      },
    };
    const expectedState = {
      ...initialFiltersState,
      filters: {
        ...initialFiltersState.filters,
        [ProductAttributes.CATEGORY_UID]: 'updated_cat_uid',
      },
    };
    expect(reducerFilters(initialFiltersState, action)).toEqual(expectedState);
  });

  it('should handle SET_FILTERS action', () => {
    const action: FiltersActionsType = {
      type: ActionNamesEnum.SET_FILTERS,
      payload: {
        filters: {
          [ProductAttributes.CATEGORY_UID]: 'azertyui',
          [ProductAttributes.SUB_CATEGORY_UID]: 'qsdfghj',
          [ProductAttributes.TO_BUY]: false,
          [ProductAttributes.IS_PUBLIC]: true,
        },
      },
    };
    const expectedState = {
      ...initialFiltersState,
      filters: {
        [ProductAttributes.LABEL]: 'Test SET_FILTERS 2',
        [ProductAttributes.CATEGORY_UID]: 'azertyui',
        [ProductAttributes.SUB_CATEGORY_UID]: 'qsdfghj',
        [ProductAttributes.TVA]: 25,
        [ProductAttributes.TO_BUY]: false,
        [ProductAttributes.IS_PUBLIC]: true,
      },
    };
    expect(reducerFilters(initialFiltersState, action)).toEqual(expectedState);
  });

  it('should handle RESET_FILTERS action', () => {
    const action: FiltersActionsType = {
      type: ActionNamesEnum.RESET_FILTERS,
    };
    expect(reducerFilters(initialFiltersState, action)).toEqual(
      initialFilterState
    );
  });

  it('should handle SET_SORTER_FIELD action', () => {
    const action: FiltersActionsType = {
      type: ActionNamesEnum.SET_SORTER_FIELD,
      payload: {
        sorterField: ProductAttributes.LABEL,
      },
    };
    const expectedState = {
      ...initialFiltersState,
      sorter: {
        ...initialFiltersState.sorter,
        field: ProductAttributes.LABEL,
      },
    };
    expect(reducerFilters(initialFiltersState, action)).toEqual(expectedState);
  });

  it('should handle CHANGE_SORTER_ORDER action', () => {
    const action: FiltersActionsType = {
      type: ActionNamesEnum.CHANGE_SORTER_ORDER,
    };
    const expectedState = {
      ...initialFiltersState,
      sorter: {
        ...initialFiltersState.sorter,
        order: ORDER.ASC,
      },
    };
    expect(reducerFilters(initialFiltersState, action)).toEqual(expectedState);
  });

  it('should throw an error for unknown action type', () => {
    const action: FiltersActionsType = {
      // @ts-expect-error
      type: 'UNKNOWN_TYPE',
    };
    expect(() => reducerFilters(initialFiltersState, action)).toThrow();
  });
});
