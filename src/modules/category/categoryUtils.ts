import { categories as categorieFromDB } from '@/categoriesDatabase/categories';

import type { Category, CategoryInput, SubCategory } from './categoryType';

export const getSubCategoriesByCategoryId = (
  categories: Category[],
  categoryId: string,
): SubCategory[] => {
  if (!categoryId) return [];
  if (!categories || !categories.length) return [];
  const category = categories.find((cat) => cat.id === categoryId);
  return category?.subCatgories || [];
};

export const getSubCategoriesByCategoryIdFromDatabase = (
  categoryId: string,
): SubCategory[] => {
  if (!categoryId) return [];
  return getSubCategoriesByCategoryId(categorieFromDB, categoryId);
};

export const getCategoryInput = (
  categories: Category[],
  categoryId: string,
): CategoryInput[] => {
  if (!categories || !categories.length) return [];
  if (!categoryId) return [];
  return (
    categories.find((category) => category.id === categoryId)?.inputs || []
  );
};

export const getSubCategoryInputs = (
  categories: Category[],
  categoryId: string,
  subCategoryId: string,
) => {
  if (!categories || !categories.length) return [];
  if (!categoryId || !subCategoryId) return [];
  const category: Category = categories.find(
    (cat) => cat.id === categoryId,
  ) as Category;

  if (!category) return [];

  const subCategory = category.subCatgories?.find(
    (subCat) => subCat.id === subCategoryId,
  );

  return subCategory?.inputs || [];
};

export const getCategoryInputFromDatabase = (
  categoryId: string,
): CategoryInput[] => {
  if (!categoryId) return [];
  return getCategoryInput(categorieFromDB, categoryId);
};

export const getSubCategoryInputsFromDatabase = (
  categoryId: string,
  subCategoryId: string,
) => {
  if (!categoryId || !subCategoryId) return [];
  return getSubCategoryInputs(categorieFromDB, categoryId, subCategoryId);
};

export const getCategoryById = (categoryId: string): Category => {
  if (!categoryId || !categorieFromDB || !categorieFromDB.length)
    return {} as Category;
  return (
    categorieFromDB.find((category) => category.id === categoryId) ||
    ({} as Category)
  );
};

export const getSubCategoryById = (
  categoryId: string,
  subCategoryId: string,
) => {
  if (!categoryId || !subCategoryId) return {} as SubCategory;
  const category = getCategoryById(categoryId);
  return (
    category.subCatgories?.find((subCat) => subCat.id === subCategoryId) ||
    ({} as SubCategory)
  );
};
