'use client';

import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import LinkButton from '@/components/04-lib/LinkButton/LinkButton';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import type ProductEntity from '@/modules/product/ProductEntity';

import { validationSchema } from './EditProductFormValidation';

interface EditProductFormType {
  label: string;
  quantityInStock: number;
  optimumQuantity: number;
  buyingPrice: number;
  sellingPrice: number;
  description: string;
  category: string;
  isPulic: boolean;
  tva: number;
  publicDisponibility: string;
}

type Props = {
  product: ProductEntity;
};

const EditProductForm: FC<Props> = ({ product }) => {
  const toast = useToast(4000);
  const { user } = useAuth();
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      label: product.label,
      quantityInInventory: product.quantityInInventory,
      optimumQuantity: product.optimumQuantity,
      buyingPrice: product.buyingPrice,
      sellingPrice: product.sellingPrice,
      description: product.description,
      category: product.categoryUid,
      isPublic: product.isPublic,
      tva: product.tva,
      publicDisponibility: product.publicDisponibility,
    },
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditProductFormType>(formOptions);

  const onSubmitForm: SubmitHandler<EditProductFormType> = async (
    data: EditProductFormType
  ) => {
    try {
    } catch (e) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="lg:flex ">
        {/* PARTIE 1 */}
        <div className="lg:w-1/3">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Informations générales
            </h3>
            <p className="mt-1 text-sm text-gray-500">...</p>
          </div>

          <div className="mt-3 sm:col-span-6">
            <label
              htmlFor="street-address"
              className="block text-start text-sm font-medium text-gray-700"
            >
              Label
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-start text-sm font-medium text-gray-700"
              >
                Quantité en stock
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-start text-sm font-medium text-gray-700"
              >
                Quantité optimal
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="city"
                className="block text-start text-sm font-medium text-gray-700"
              >
                Prix d&apos;achat HT
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="city"
                  placeholder="€"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-gray-300 shadow-sm placeholder:text-right focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-start text-sm font-medium text-gray-700"
              >
                Prix de vente HT
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="region"
                  id="region"
                  placeholder="€"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-gray-300 shadow-sm placeholder:text-right focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-start text-sm font-medium text-gray-700"
              >
                TVA
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  placeholder="%"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-gray-300 shadow-sm placeholder:text-right focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="mt-3 sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-start text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <div className="mt-1">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>Vetement</option>
                <option>Epicerie</option>
              </select>
            </div>
          </div>
        </div>

        {/* PARTIE 2 */}
        <div className="lg:w-1/3">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Information spécifique à la catégorie
            </h3>
            <p className="mt-1 text-sm text-gray-500">...</p>
          </div>
        </div>

        {/* PARTIE 3 */}
        <div className="lg:w-1/3">
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

          <div className="mt-3 lg:mt-0">
            <div className="mt-3 flex">
              <div className="mx-3 flex items-center">
                <input
                  id="push-everything"
                  name="push-notifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="push-everything"
                  className="ml-3 block text-start text-sm font-medium text-gray-700"
                >
                  Privé
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="push-email"
                  name="push-notifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="push-email"
                  className="ml-3 block text-start text-sm font-medium text-gray-700"
                >
                  Privé Public
                </label>
              </div>
            </div>
          </div>
          <div className="mt-3 sm:col-span-6">
            <label
              htmlFor="about"
              className="block text-start text-sm font-medium text-gray-700"
            >
              Déscription
            </label>
            <div className="mt-1">
              <textarea
                id="about"
                name="about"
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={''}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Cette description sera visible par les visteurs de votre
              marketplace.
            </p>
          </div>

          <div className="sm:col-span-6">
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
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <div className="flex justify-end">
          <LinkButton
            type="button"
            style="primary"
            className="flex justify-center"
          >
            Annuler
          </LinkButton>
          <LinkButton
            type="submit"
            style="secondary"
            className="ml-2 flex justify-center"
          >
            Valider
          </LinkButton>
        </div>
      </div>
    </form>
  );
};
export default EditProductForm;
