import type { Category } from './categoryType';
import { AttributeInputTypes } from './categoryType';
import {
  getCategoryInput,
  getSubCategoriesByCategoryUid,
  getSubCategoryInputs,
} from './categoryUtils';

const mockedCategory1: Category = {
  uid: 'categoryUid1',
  label: 'Category 1',
  inputs: [
    {
      uid: 'inputUid1',
      label: 'Input 1',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'inputUid2',
      label: 'Input 2',
      inputType: AttributeInputTypes.NUMBER,
    },
  ],
  subCatgories: [
    {
      uid: 'subCategoryUid1',
      label: 'SubCategory 1',
      inputs: [
        {
          uid: 'inputUid3',
          label: 'Input 3',
          inputType: AttributeInputTypes.TEXT,
        },
        {
          uid: 'inputUid4',
          label: 'Input 4',
          inputType: AttributeInputTypes.NUMBER,
        },
      ],
    },
    {
      uid: 'subCategoryUid2',
      label: 'SubCategory 2',
    },
  ],
};

const mockedCategory2: Category = {
  uid: 'categoryUid2',
  label: 'Category 2',
  inputs: [
    {
      uid: 'inputUid5',
      label: 'Input 5',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'inputUid6',
      label: 'Input 6',
      inputType: AttributeInputTypes.NUMBER,
    },
  ],
  subCatgories: [
    {
      uid: 'subCategoryUid3',
      label: 'SubCategory 3',
    },
    {
      uid: 'subCategoryUid4',
      label: 'SubCategory 4',
      inputs: [
        {
          uid: 'inputUid7',
          label: 'Input 7',
          inputType: AttributeInputTypes.TEXT,
        },
        {
          uid: 'inputUid8',
          label: 'Input 8',
          inputType: AttributeInputTypes.NUMBER,
        },
      ],
    },
  ],
};

const mockedCategories: Category[] = [mockedCategory1, mockedCategory2];

describe('categoryUtils', () => {
  describe('getSubCategoriesByCategoryUid', () => {
    it('Should return an empty array if categories are null of empty', () => {
      // @ts-ignore
      expect(getSubCategoriesByCategoryUid(null, 'uid')).toEqual([]);
      // @ts-ignore
      expect(getSubCategoriesByCategoryUid(undefined, 'uid')).toEqual([]);
    });
    it('Should return an empty array if categoryUid is null or undefined', () => {
      // @ts-ignore
      expect(getSubCategoriesByCategoryUid(mockedCategories, null)).toEqual([]);
      expect(
        // @ts-ignore
        getSubCategoriesByCategoryUid(mockedCategories, undefined)
      ).toEqual([]);
    });
    it('Should return the subCategories of the categoryUid', () => {
      expect(
        getSubCategoriesByCategoryUid(mockedCategories, 'categoryUid2')
      ).toEqual([
        { uid: 'subCategoryUid3', label: 'SubCategory 3' },
        {
          uid: 'subCategoryUid4',
          label: 'SubCategory 4',
          inputs: [
            {
              uid: 'inputUid7',
              label: 'Input 7',
              inputType: AttributeInputTypes.TEXT,
            },
            {
              uid: 'inputUid8',
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
  it('Should return an empty array if categoryUid is null or undefined', () => {
    // @ts-ignore
    expect(getCategoryInput(mockedCategories, null)).toEqual([]);
    // @ts-ignore
    expect(getCategoryInput(mockedCategories)).toEqual([]);
  });
  it('Should return an empty array if the categories are missing', () => {
    // @ts-ignore
    expect(getCategoryInput(null, 'categoryUid2')).toEqual([]);
    // @ts-ignore
    expect(getCategoryInput([], 'categoryUid2')).toEqual([]);
  });
  it('Should return the inputs of the categoryUid', () => {
    expect(getCategoryInput(mockedCategories, 'categoryUid2')).toEqual([
      {
        uid: 'inputUid5',
        label: 'Input 5',
        inputType: AttributeInputTypes.TEXT,
      },
      {
        uid: 'inputUid6',
        label: 'Input 6',
        inputType: AttributeInputTypes.NUMBER,
      },
    ]);
  });
});

describe('getSubCategoryInputs', () => {
  it('Should return an empty array if categoryUid is null or undefined', () => {
    // @ts-ignore
    expect(getSubCategoryInputs(mockedCategories, null)).toEqual([]);
    // @ts-ignore
    expect(getSubCategoryInputs(mockedCategories)).toEqual([]);
  });
  it('Should return an empty array if subCategoryUid is null or undefined', () => {
    expect(
      // @ts-ignore
      getSubCategoryInputs(mockedCategories, 'categoryUid2', null)
    ).toEqual([]);
    // @ts-ignore
    expect(getSubCategoryInputs(mockedCategories, 'categoryUid2')).toEqual([]);
  });
  it('Should return an empty array if the categories are missing', () => {
    // @ts-ignore
    expect(getSubCategoryInputs(null, 'categoryUid2')).toEqual([]);
    // @ts-ignore
    expect(getSubCategoryInputs([], 'categoryUid2')).toEqual([]);
  });
  it('Should return the inputs of the subCategory', () => {
    expect(
      getSubCategoryInputs(mockedCategories, 'categoryUid2', 'subCategoryUid4')
    ).toEqual([
      {
        uid: 'inputUid7',
        label: 'Input 7',
        inputType: AttributeInputTypes.TEXT,
      },
      {
        uid: 'inputUid8',
        label: 'Input 8',
        inputType: AttributeInputTypes.NUMBER,
      },
    ]);
  });
});
