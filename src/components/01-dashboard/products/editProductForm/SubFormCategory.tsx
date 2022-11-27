'use client';

import type { FC } from 'react';
import type { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';

import InputRadio from '@/components/04-lib/inputs/InputRadio';
import InputTextArea from '@/components/04-lib/inputs/InputTextArea';
import {
  getCategoryInputFromDatabase,
  getSubCategoryInputsFromDatabase,
} from '@/modules/category/categoryUtils';
import type ProductEntity from '@/modules/product/ProductEntity';
import { ProductAttributes } from '@/modules/product/productType';

import type { EditProductFormType } from './EditProductForm';

type Props = {
  product: ProductEntity;
  register: UseFormRegister<EditProductFormType>;
  errors: Partial<FieldErrorsImpl<EditProductFormType>>;
};

const SubFormCategory: FC<Props> = ({ product, register, errors }) => {
  const categoryInputs = getCategoryInputFromDatabase(product.getCategoryUid());
  const subCategoryInputs = getSubCategoryInputsFromDatabase(
    product.getCategoryUid(),
    product.getSubCategoryUid()
  );

  // eslint-disable-next-line no-console
  console.log(
    'catesubCategory InputsgoryInputs',
    categoryInputs,
    subCategoryInputs
  );

  return (
    <>
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Information spécifique à la catégorie
        </h3>
      </div>

      <div className="mt-6">
        <InputRadio
          options={[
            { label: 'Public', value: 'public' },
            { label: 'Privé', value: 'private' },
          ]}
          register={register(ProductAttributes.IS_PUBLIC)}
          name={ProductAttributes.IS_PUBLIC}
          error={errors[ProductAttributes.IS_PUBLIC]?.message}
        />
      </div>
      <div className="mt-6 sm:col-span-6">
        <InputTextArea
          label="Description"
          register={register(ProductAttributes.DESCRIPTION)}
          name={ProductAttributes.DESCRIPTION}
          error={errors[ProductAttributes.DESCRIPTION]?.message}
          inputClassName="placeholder:text-right"
        />
      </div>
    </>
  );
};
export default SubFormCategory;
