'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Input from '@/components/04-lib/inputs/Input';
import InputSelect from '@/components/04-lib/inputs/InputSelect';
import LinkButton from '@/components/04-lib/LinkButton/LinkButton';
import { ToasterTypeEnum } from '@/components/08-toaster/toasterEnum';
import { useToast } from '@/hooks/useToast';
import type ProductEntity from '@/modules/product/ProductEntity';
import { ProductAttributes } from '@/modules/product/productType';

import { validationSchema } from './EditProductFormValidation';
import SubFormVisibility from './SubFormVisibility';

interface EditProductFormType {
  [ProductAttributes.LABEL]: string;
  [ProductAttributes.QUANTITY_IN_INVENTORY]?: number;
  [ProductAttributes.OPTIMUM_QUANTITY]?: number;
  [ProductAttributes.BUYING_PRICE]?: number;
  [ProductAttributes.SELLING_PRICE]?: number;
  [ProductAttributes.DESCRIPTION]?: string;
  [ProductAttributes.CATEGORY_UID]?: string;
  [ProductAttributes.IS_PUBLIC]?: boolean;
  [ProductAttributes.TVA]?: number;
  [ProductAttributes.PUBLIC_DISPONIBILITY]?: string;
}

type Props = {
  product: ProductEntity;
};

const EditProductForm: FC<Props> = ({ product }) => {
  const toast = useToast(10000);
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      [ProductAttributes.LABEL]: product.label,
      [ProductAttributes.QUANTITY_IN_INVENTORY]: product.quantityInInventory,
      [ProductAttributes.OPTIMUM_QUANTITY]: product.optimumQuantity,
      [ProductAttributes.BUYING_PRICE]: product.buyingPrice,
      [ProductAttributes.SELLING_PRICE]: product.sellingPrice,
      [ProductAttributes.DESCRIPTION]: product.description,
      [ProductAttributes.CATEGORY_UID]: product.categoryUid,
      [ProductAttributes.IS_PUBLIC]: product.isPublic,
      [ProductAttributes.TVA]: product.tva,
      [ProductAttributes.PUBLIC_DISPONIBILITY]: product.publicDisponibility,
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProductFormType>(formOptions);

  const onSubmitEditProductForm: SubmitHandler<EditProductFormType> = async (
    data: EditProductFormType
  ) => {
    try {
      console.log('data onSubmitEditProductForm', data);
    } catch (e: any) {
      toast(ToasterTypeEnum.ERROR, e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitEditProductForm)}>
      <div className="lg:flex">
        {/* PARTIE 1 */}
        <div className="lg:w-1/3">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Informations générales
            </h3>
          </div>

          <div className="mt-3 sm:col-span-6">
            <Input
              type="text"
              label="label"
              {...register(ProductAttributes.LABEL)}
              error={errors.label?.message}
            />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                type="number"
                label="Quantité en stock"
                {...register(ProductAttributes.QUANTITY_IN_INVENTORY)}
                error={errors.quantityInInventory?.message}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                type="number"
                label="Quantité optimal en stock"
                {...register(ProductAttributes.OPTIMUM_QUANTITY)}
                error={errors.optimumQuantity?.message}
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                type="number"
                label="Prix d'achat HT"
                {...register(ProductAttributes.BUYING_PRICE)}
                placeholder="€"
                error={errors.buyingPrice?.message}
                inputClassName="placeholder:text-right"
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                type="number"
                label="Prix de vente HT"
                {...register(ProductAttributes.SELLING_PRICE)}
                placeholder="€"
                error={errors.sellingPrice?.message}
                inputClassName="placeholder:text-right"
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                type="number"
                label="TVA"
                {...register(ProductAttributes.TVA)}
                placeholder="%"
                error={errors.tva?.message}
                inputClassName="placeholder:text-right"
              />
            </div>
          </div>
          <div className="mt-6 sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-start text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <div className="mt-1">
              <InputSelect
                options={[
                  { label: 'Vetement', value: 'vetement' },
                  { label: 'Epicerie', value: 'epicerie' },
                ]}
                {...register(ProductAttributes.CATEGORY_UID)}
                error={errors.tva?.message}
                inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* PARTIE 2 */}
        <div className="mt-5 lg:mt-0 lg:w-1/3">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Information spécifique à la catégorie
            </h3>
          </div>
        </div>

        {/* PARTIE 3 */}
        <SubFormVisibility
          product={product}
          register={register}
          errors={errors}
        />
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
