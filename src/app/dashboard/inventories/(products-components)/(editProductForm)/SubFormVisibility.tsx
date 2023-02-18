'use client';

import { InformationCircleIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';
import type {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';

import InputRadio from '@/components/lib/inputs/InputRadio';
import InputSelect from '@/components/lib/inputs/InputSelect';
import InputTextArea from '@/components/lib/inputs/InputTextArea';
import {
  ProductAttributes,
  ProductLabels,
  PublicDisponibilityEnum,
  PublicDisponibilityLabels,
} from '@/modules/product/productType';

import type { EditProductFormType } from './EditProductForm';

type Props = {
  register: UseFormRegister<EditProductFormType>;
  errors: FieldErrors<EditProductFormType>;
  getValues: UseFormGetValues<EditProductFormType>;
};

const SubFormVisibility: FC<Props> = ({ register, errors, getValues }) => {
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

      <div className="mt-6 flex">
        <InputRadio
          options={[
            { label: 'Public', value: true },
            { label: 'Privé', value: false },
          ]}
          label={ProductLabels[ProductAttributes.IS_PUBLIC]}
          register={register(ProductAttributes.IS_PUBLIC)}
          name={ProductAttributes.IS_PUBLIC}
          error={errors[ProductAttributes.IS_PUBLIC]?.message}
          defaultValue={getValues(ProductAttributes.IS_PUBLIC)}
        />
        <InputSelect
          options={[
            {
              value: PublicDisponibilityEnum.IN_STOCK,
              label:
                PublicDisponibilityLabels[PublicDisponibilityEnum.IN_STOCK],
            },
            {
              value: PublicDisponibilityEnum.OUT_OF_STOCK,
              label:
                PublicDisponibilityLabels[PublicDisponibilityEnum.OUT_OF_STOCK],
            },
            {
              value: PublicDisponibilityEnum.NOT_MUCH_LEFT,
              label:
                PublicDisponibilityLabels[
                  PublicDisponibilityEnum.NOT_MUCH_LEFT
                ],
            },
            {
              value: PublicDisponibilityEnum.AVAILABLE_SOON,
              label:
                PublicDisponibilityLabels[
                  PublicDisponibilityEnum.AVAILABLE_SOON
                ],
            },
            {
              value: PublicDisponibilityEnum.AVAILABLE_ON_ORDER,
              label:
                PublicDisponibilityLabels[
                  PublicDisponibilityEnum.AVAILABLE_ON_ORDER
                ],
            },
          ]}
          name={ProductAttributes.PUBLIC_DISPONIBILITY}
          label={ProductLabels[ProductAttributes.PUBLIC_DISPONIBILITY]}
          register={register(ProductAttributes.PUBLIC_DISPONIBILITY)}
          error={errors[ProductAttributes.PUBLIC_DISPONIBILITY]?.message}
          inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
