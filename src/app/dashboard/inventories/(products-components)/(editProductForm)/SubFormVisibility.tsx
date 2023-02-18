'use client';

import { InformationCircleIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import InputRadio from '@/components/lib/inputs/InputRadio';
import InputTextArea from '@/components/lib/inputs/InputTextArea';
import { ProductAttributes } from '@/modules/product/productType';

import type { EditProductFormType } from './EditProductForm';

type Props = {
  register: UseFormRegister<EditProductFormType>;
  errors: FieldErrors<EditProductFormType>;
};

const SubFormVisibility: FC<Props> = ({ register, errors }) => {
  return (
    <>
      <div className="flex justify-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Visibilité
        </h3>
        <div
          className="tooltip tooltip-bottom"
          data-tip="Si votre inventaire est privé, les produits (même public) ne seront pas
                  visible sur votre marketplace."
        >
          <InformationCircleIcon className="ml-3 h-6 w-6 shrink-0 text-primary-400" />
        </div>
      </div>

      <div className="mt-6">
        <InputRadio
          options={[
            { label: 'Public', value: true },
            { label: 'Privé', value: false },
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
export default SubFormVisibility;
