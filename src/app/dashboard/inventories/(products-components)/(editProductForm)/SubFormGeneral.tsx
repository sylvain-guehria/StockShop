'use client';

import type { FC } from 'react';
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import { categories } from '@/categoriesDatabase/categories';
import Input from '@/components/lib/inputs/Input';
import InputSelect from '@/components/lib/inputs/InputSelect';
import { getSubCategoriesByCategoryIdFromDatabase } from '@/modules/category/categoryUtils';
import {
  ConditionTypeEnum,
  ProductAttributes,
  ProductLabels,
} from '@/modules/product/productType';

import type { EditProductFormType } from './EditProductForm';

type Props = {
  register: UseFormRegister<EditProductFormType>;
  errors: FieldErrors<EditProductFormType>;
  control: Control<EditProductFormType, any>;
};

const SubFormGeneral: FC<Props> = ({ register, errors, control }) => {
  const watchCategoryId = useWatch({
    control,
    name: ProductAttributes.CATEGORY_ID,
  });

  return (
    <>
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Informations générales
        </h3>
      </div>

      <div className="mt-6 sm:col-span-6">
        <Input
          type="text"
          name={ProductAttributes.LABEL}
          label={ProductLabels[ProductAttributes.LABEL]}
          register={register(ProductAttributes.LABEL)}
          error={errors[ProductAttributes.LABEL]?.message}
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Input
            type="number"
            name={ProductAttributes.QUANTITY_IN_INVENTORY}
            label={ProductLabels[ProductAttributes.QUANTITY_IN_INVENTORY]}
            register={register(ProductAttributes.QUANTITY_IN_INVENTORY)}
            error={errors[ProductAttributes.QUANTITY_IN_INVENTORY]?.message}
          />
        </div>

        <div className="sm:col-span-3">
          <Input
            type="number"
            name={ProductAttributes.OPTIMUM_QUANTITY}
            label={ProductLabels[ProductAttributes.OPTIMUM_QUANTITY]}
            register={register(ProductAttributes.OPTIMUM_QUANTITY)}
            error={errors[ProductAttributes.OPTIMUM_QUANTITY]?.message}
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            type="number"
            step="0.01"
            name={ProductAttributes.BUYING_PRICE}
            label={ProductLabels[ProductAttributes.BUYING_PRICE]}
            register={register(ProductAttributes.BUYING_PRICE)}
            placeholder="€"
            error={errors[ProductAttributes.BUYING_PRICE]?.message}
            inputClassName="placeholder:text-right"
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            type="number"
            step="0.01"
            name={ProductAttributes.SELLING_PRICE}
            label={ProductLabels[ProductAttributes.SELLING_PRICE]}
            register={register(ProductAttributes.SELLING_PRICE)}
            placeholder="€"
            error={errors[ProductAttributes.SELLING_PRICE]?.message}
            inputClassName="placeholder:text-right"
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            type="number"
            step="0.1"
            name={ProductAttributes.TVA}
            label={ProductLabels[ProductAttributes.TVA]}
            register={register(ProductAttributes.TVA)}
            placeholder="%"
            error={errors[ProductAttributes.TVA]?.message}
            inputClassName="placeholder:text-right"
          />
        </div>
      </div>
      <div className="mt-6 grid gap-x-4 gap-y-6 sm:grid-cols-3">
        <div>
          <div className="mt-1">
            <InputSelect
              options={[
                { value: ConditionTypeEnum.NEW, label: 'Neuf' },
                { value: ConditionTypeEnum.USED, label: 'Occasion' },
                {
                  value: ConditionTypeEnum.REFURBISHED,
                  label: 'Reconditionné',
                },
              ]}
              name={ProductAttributes.CONDITION}
              label={ProductLabels[ProductAttributes.CONDITION]}
              register={register(ProductAttributes.CONDITION)}
              error={errors[ProductAttributes.CONDITION]?.message}
              inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <div className="mt-1">
            <InputSelect
              options={[
                { label: '', value: '' },
                ...categories.map((category) => ({
                  label: category.label,
                  value: category.id,
                })),
              ]}
              name={ProductAttributes.CATEGORY_ID}
              label={ProductLabels[ProductAttributes.CATEGORY_ID]}
              register={register(ProductAttributes.CATEGORY_ID)}
              error={errors[ProductAttributes.CATEGORY_ID]?.message}
              inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <div className="mt-1">
            <InputSelect
              options={[
                { label: '', value: '' },
                ...getSubCategoriesByCategoryIdFromDatabase(
                  watchCategoryId as string
                ).map((subcategory) => ({
                  label: subcategory.label,
                  value: subcategory.id,
                })),
              ]}
              disabled={!watchCategoryId}
              name={ProductAttributes.SUB_CATEGORY_ID}
              label={ProductLabels[ProductAttributes.SUB_CATEGORY_ID]}
              register={register(ProductAttributes.SUB_CATEGORY_ID)}
              error={errors[ProductAttributes.SUB_CATEGORY_ID]?.message}
              inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default SubFormGeneral;
