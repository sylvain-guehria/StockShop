'use client';

import { InformationCircleIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';
import type {
  FieldErrorsImpl,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

import InputRadio from '@/components/lib/inputs/InputRadio';
import InputTextArea from '@/components/lib/inputs/InputTextArea';
import VisibilitySVG from '@/logo/VisibilitySVG';
import { ProductAttributes } from '@/modules/product/productType';

import type { EditProductFormType } from './EditProductForm';

type Props = {
  register: UseFormRegister<EditProductFormType>;
  watch: UseFormWatch<EditProductFormType>;
  errors: Partial<FieldErrorsImpl<EditProductFormType>>;
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

      <div className="mt-6 sm:col-span-6">
        <label
          htmlFor="cover-photo"
          className="block text-start text-sm font-medium text-gray-700"
        >
          Photo
        </label>
        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
          <div className="space-y-1 text-center">
            <VisibilitySVG className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white text-start font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default SubFormVisibility;
