'use client';

import type { FC } from 'react';
import type { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';

import Input from '@/components/04-lib/inputs/Input';
import InputSelect from '@/components/04-lib/inputs/InputSelect';
import type { CategoryInput } from '@/modules/category/categoryType';
import { AttributeInputTypes } from '@/modules/category/categoryType';
import {
  getCategoryInputFromDatabase,
  getSubCategoryInputsFromDatabase,
} from '@/modules/category/categoryUtils';
import { ProductAttributes } from '@/modules/product/productType';

import type { EditProductFormType } from './EditProductForm';

type Props = {
  register: UseFormRegister<EditProductFormType>;
  errors?: Partial<FieldErrorsImpl<EditProductFormType>>;
  currentCategoryUid: string;
  currentSubCategoryUid: string;
};

const SubFormCategory: FC<Props> = ({
  register,
  currentCategoryUid,
  currentSubCategoryUid,
}) => {
  const categoryInputs = getCategoryInputFromDatabase(
    currentCategoryUid as string
  );
  const subCategoryInputs = getSubCategoryInputsFromDatabase(
    currentCategoryUid as string,
    currentSubCategoryUid as string
  );

  const allCategoryInputs = [...categoryInputs, ...subCategoryInputs];

  return (
    <>
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Information spécifique à la catégorie
        </h3>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        {allCategoryInputs.map((input: CategoryInput) => {
          const isNumber = input.inputType === AttributeInputTypes.NUMBER;
          const isText = input.inputType === AttributeInputTypes.TEXT;
          const isSelect = input.inputType === AttributeInputTypes.SELECT;

          const isInput = isNumber || isText;
          const isSelectInput = isSelect;

          return (
            <div className="sm:col-span-2" key={input.uid}>
              {isInput && (
                <Input
                  type={input.inputType as 'text' | 'number'}
                  label={input.label}
                  name={input.uid}
                  register={register(
                    `${ProductAttributes.CAT_SUBCAT_ATTRIBUTES}.${input.uid}`
                  )}
                />
              )}
              {isSelectInput && (
                <InputSelect
                  label={input.label}
                  options={[{ label: '', value: '' }, ...(input.options || [])]}
                  name={input.uid}
                  register={register(
                    `${ProductAttributes.CAT_SUBCAT_ATTRIBUTES}.${input.uid}`
                  )}
                  inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
