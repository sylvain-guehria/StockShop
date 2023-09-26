import type { Category } from './categoryType';
import { AttributeInputTypes } from './categoryType';
import {
  getCategoryInput,
  getSubCategoriesByCategoryId,
  getSubCategoryInputs,
} from './categoryUtils';

const mockedCategory1: Category = {
  id: 'categoryId1',
  label: 'Category 1',
  inputs: [
    {
      id: 'inputId1',
      label: 'Input 1',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'inputId2',
      label: 'Input 2',
      inputType: AttributeInputTypes.NUMBER,
    },
  ],
  subCatgories: [
    {
      id: 'subCategoryId1',
      label: 'SubCategory 1',
      inputs: [
        {
          id: 'inputId3',
          label: 'Input 3',
          inputType: AttributeInputTypes.TEXT,
        },
        {
          id: 'inputId4',
          label: 'Input 4',
          inputType: AttributeInputTypes.NUMBER,
        },
      ],
    },
    {
      id: 'subCategoryId2',
      label: 'SubCategory 2',
    },
  ],
};

const mockedCategory2: Category = {
  id: 'categoryId2',
  label: 'Category 2',
  inputs: [
    {
      id: 'inputId5',
      label: 'Input 5',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'inputId6',
      label: 'Input 6',
      inputType: AttributeInputTypes.NUMBER,
    },
  ],
  subCatgories: [
    {
      id: 'subCategoryId3',
      label: 'SubCategory 3',
    },
    {
      id: 'subCategoryId4',
      label: 'SubCategory 4',
      inputs: [
        {
          id: 'inputId7',
          label: 'Input 7',
          inputType: AttributeInputTypes.TEXT,
        },
        {
          id: 'inputId8',
          label: 'Input 8',
          inputType: AttributeInputTypes.NUMBER,
        },
      ],
    },
  ],
};

const mockedCategories: Category[] = [mockedCategory1, mockedCategory2];

describe('categoryUtils', () => {
  describe('getSubCategoriesByCategoryId', () => {
    it('Should return an empty array if categories are null of empty', () => {
      // @ts-ignore
      expect(getSubCategoriesByCategoryId(null, 'id')).toEqual([]);
      // @ts-ignore
      expect(getSubCategoriesByCategoryId(undefined, 'id')).toEqual([]);
    });
    it('Should return an empty array if categoryId is null or undefined', () => {
      // @ts-ignore
      expect(getSubCategoriesByCategoryId(mockedCategories, null)).toEqual([]);
      expect(
        // @ts-ignore
        getSubCategoriesByCategoryId(mockedCategories, undefined),
      ).toEqual([]);
    });
    it('Should return the subCategories of the categoryId', () => {
      expect(
        getSubCategoriesByCategoryId(mockedCategories, 'categoryId2'),
      ).toEqual([
        { id: 'subCategoryId3', label: 'SubCategory 3' },
        {
          id: 'subCategoryId4',
          label: 'SubCategory 4',
          inputs: [
            {
              id: 'inputId7',
              label: 'Input 7',
              inputType: AttributeInputTypes.TEXT,
            },
            {
              id: 'inputId8',
              label: 'Input 8',
              inputType: AttributeInputTypes.NUMBER,
            },
          ],
        },
      ]);
    });
  });
});

describe('getCategoryInput', () => {
  it('Should return an empty array if categoryId is null or undefined', () => {
    // @ts-ignore
    expect(getCategoryInput(mockedCategories, null)).toEqual([]);
    // @ts-ignore
    expect(getCategoryInput(mockedCategories)).toEqual([]);
  });
  it('Should return an empty array if the categories are missing', () => {
    // @ts-ignore
    expect(getCategoryInput(null, 'categoryId2')).toEqual([]);
    // @ts-ignore
    expect(getCategoryInput([], 'categoryId2')).toEqual([]);
  });
  it('Should return the inputs of the categoryId', () => {
    expect(getCategoryInput(mockedCategories, 'categoryId2')).toEqual([
      {
        id: 'inputId5',
        label: 'Input 5',
        inputType: AttributeInputTypes.TEXT,
      },
      {
        id: 'inputId6',
        label: 'Input 6',
        inputType: AttributeInputTypes.NUMBER,
      },
    ]);
  });
});

describe('getSubCategoryInputs', () => {
  it('Should return an empty array if categoryId is null or undefined', () => {
    // @ts-ignore
    expect(getSubCategoryInputs(mockedCategories, null)).toEqual([]);
    // @ts-ignore
    expect(getSubCategoryInputs(mockedCategories)).toEqual([]);
  });
  it('Should return an empty array if subCategoryId is null or undefined', () => {
    expect(
      // @ts-ignore
      getSubCategoryInputs(mockedCategories, 'categoryId2', null),
    ).toEqual([]);
    // @ts-ignore
    expect(getSubCategoryInputs(mockedCategories, 'categoryId2')).toEqual([]);
  });
  it('Should return an empty array if the categories are missing', () => {
    // @ts-ignore
    expect(getSubCategoryInputs(null, 'categoryId2')).toEqual([]);
    // @ts-ignore
    expect(getSubCategoryInputs([], 'categoryId2')).toEqual([]);
  });
  it('Should return the inputs of the subCategory', () => {
    expect(
      getSubCategoryInputs(mockedCategories, 'categoryId2', 'subCategoryId4'),
    ).toEqual([
      {
        id: 'inputId7',
        label: 'Input 7',
        inputType: AttributeInputTypes.TEXT,
      },
      {
        id: 'inputId8',
        label: 'Input 8',
        inputType: AttributeInputTypes.NUMBER,
      },
    ]);
  });
});
