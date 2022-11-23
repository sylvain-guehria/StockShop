'use client';

import { InformationCircleIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';

import InputRadio from '@/components/04-lib/inputs/InputRadio';
import InputTextArea from '@/components/04-lib/inputs/InputTextArea';
import type ProductEntity from '@/modules/product/ProductEntity';
import { ProductAttributes } from '@/modules/product/productType';

type Props = {
  product: ProductEntity;
  register: any;
  errors: any;
};

const SubFormVisibility: FC<Props> = ({ product, register, errors }) => {
  // eslint-disable-next-line no-console
  console.log('SubFormVisibility product', product);
  return (
    <div className="mt-5 lg:mt-0 lg:w-1/3">
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
          {...register(ProductAttributes.IS_PUBLIC)}
          error={errors.isPublic?.message}
        />
      </div>
      <div className="mt-6 sm:col-span-6">
        <InputTextArea
          label="Description"
          {...register(ProductAttributes.DESCRIPTION)}
          error={errors.description?.message}
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
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
    </div>
  );
};
export default SubFormVisibility;
