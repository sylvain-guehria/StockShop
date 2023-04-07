'use client';

import type { FC } from 'react';
import { useEffect } from 'react';
import type {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import Input from '@/components/lib/inputs/Input';
import InputSelect from '@/components/lib/inputs/InputSelect';
import type { CategoryInput } from '@/modules/category/categoryType';
import { AttributeInputTypes } from '@/modules/category/categoryType';
import {
  getCategoryInputFromDatabase,
  getSubCategoryInputsFromDatabase,
} from '@/modules/category/categoryUtils';
import type ProductEntity from '@/modules/product/ProductEntity';
import { ProductAttributes } from '@/modules/product/productType';

import type { EditProductFormType } from './EditProductForm';

type Props = {
  register: UseFormRegister<EditProductFormType>;
  watch: UseFormWatch<EditProductFormType>;
  product: ProductEntity;
  setValue: UseFormSetValue<EditProductFormType>;
  getValues: UseFormGetValues<EditProductFormType>;
};

const SubFormCategory: FC<Props> = ({
  register,
  watch,
  setValue,
  product,
  getValues,
}) => {
  const currentCategoryId = watch(ProductAttributes.CATEGORY_ID);
  const currentSubCategoryId = watch(ProductAttributes.SUB_CATEGORY_ID);

  const categoryInputs = getCategoryInputFromDatabase(
    currentCategoryId as string
  );
  const subCategoryInputs = getSubCategoryInputsFromDatabase(
    currentCategoryId as string,
    currentSubCategoryId as string
  );

  const allCategoryInputs = [...categoryInputs, ...subCategoryInputs];

  useEffect(() => {
    const fieldNames = Object.keys(
      getValues(ProductAttributes.CAT_SUBCAT_ATTRIBUTES) || {}
    );
    if (
      !product.isSameCategory(currentCategoryId || '') ||
      !product.isSameSubCategory(currentSubCategoryId || '')
    ) {
      fieldNames.forEach((fieldName) =>
        setValue(
          `${ProductAttributes.CAT_SUBCAT_ATTRIBUTES}.${fieldName}`,
          '' as never
        )
      );
    }
  }, [currentCategoryId, currentSubCategoryId]);

  return (
    <>
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Information spécifique à la catégorie
        </h3>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
        {allCategoryInputs.map((input: CategoryInput) => {
          const isNumber = input.inputType === AttributeInputTypes.NUMBER;
          const isText = input.inputType === AttributeInputTypes.TEXT;
          const isSelect = input.inputType === AttributeInputTypes.SELECT;

          const isInput = isNumber || isText;
          const isSelectInput = isSelect;

          return (
            <div className="sm:col-span-2" key={input.id}>
              {isInput && (
                <Input
                  type={input.inputType as 'text' | 'number'}
                  label={input.label}
                  name={input.id}
                  register={register(
                    `${ProductAttributes.CAT_SUBCAT_ATTRIBUTES}.${input.id}`
                  )}
                />
              )}
              {isSelectInput && (
                <InputSelect
                  label={input.label}
                  options={[{ label: '', value: '' }, ...(input.options || [])]}
                  name={input.id}
                  register={register(
                    `${ProductAttributes.CAT_SUBCAT_ATTRIBUTES}.${input.id}`
                  )}
                  inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default SubFormCategory;
