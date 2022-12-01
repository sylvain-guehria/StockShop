import { categories as categorieFromDB } from '@/categoriesDatabase/categories';

import type { Category, CategoryInput, SubCategory } from './categoryType';

export const getSubCategoriesByCategoryUid = (
  categories: Category[],
  categoryUid: string
): SubCategory[] => {
  if (!categoryUid) return [];
  if (!categories || !categories.length) return [];
  const category = categories.find((cat) => cat.uid === categoryUid);
  return category?.subCatgories || [];
};

export const getSubCategoriesByCategoryUidFromDatabase = (
  categoryUid: string
): SubCategory[] => {
  if (!categoryUid) return [];
  return getSubCategoriesByCategoryUid(categorieFromDB, categoryUid);
};

export const getCategoryInput = (
  categories: Category[],
  categoryUid: string
): CategoryInput[] => {
  if (!categories || !categories.length) return [];
  if (!categoryUid) return [];
  return (
    categories.find((category) => category.uid === categoryUid)?.inputs || []
  );
};

export const getSubCategoryInputs = (
  categories: Category[],
  categoryUid: string,
  subCategoryUid: string
) => {
  if (!categories || !categories.length) return [];
  if (!categoryUid || !subCategoryUid) return [];
  const category: Category = categories.find(
    (cat) => cat.uid === categoryUid
  ) as Category;

  if (!category) return [];

  const subCategory = category.subCatgories?.find(
    (subCat) => subCat.uid === subCategoryUid
  );

  return subCategory?.inputs || [];
};

export const getCategoryInputFromDatabase = (
  categoryUid: string
): CategoryInput[] => {
  if (!categoryUid) return [];
  return getCategoryInput(categorieFromDB, categoryUid);
};

export const getSubCategoryInputsFromDatabase = (
  categoryUid: string,
  subCategoryUid: string
) => {
  if (!categoryUid || !subCategoryUid) return [];
  return getSubCategoryInputs(categorieFromDB, categoryUid, subCategoryUid);
};

export const getCategoryByUid = (categoryUid: string): Category => {
  if (!categoryUid || !categorieFromDB || !categorieFromDB.length)
    return {} as Category;
  return (
    categorieFromDB.find((category) => category.uid === categoryUid) ||
    ({} as Category)
  );
};

export const getSubCategoryByUid = (
  categoryUid: string,
  subCategoryUid: string
) => {
  if (!categoryUid || !subCategoryUid) return {} as SubCategory;
  const category = getCategoryByUid(categoryUid);
  return (
    category.subCatgories?.find((subCat) => subCat.uid === subCategoryUid) ||
    ({} as SubCategory)
  );
};
