import type { Category } from './categoryType';
import { getSubCategoriesByCategoryUid } from './categoryUtils';

const mockedCategory1: Category = {
  uid: 'categoryUid1',
  label: 'Category 1',
  subCatgories: [
    {
      uid: 'subCategoryUid1',
      label: 'SubCategory 1',
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
  subCatgories: [
    {
      uid: 'subCategoryUid3',
      label: 'SubCategory 3',
    },
    {
      uid: 'subCategoryUid4',
      label: 'SubCategory 4',
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
        { uid: 'subCategoryUid4', label: 'SubCategory 4' },
      ]);
    });
  });
});
