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
  handleCloseModal: () => void;
};

const EditProductForm: FC<Props> = ({ product, handleCloseModal }) => {
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
      // eslint-disable-next-line no-console
      console.log('data onSubmitEditProductForm', data);
    } catch (e: any) {
      toast(ToasterTypeEnum.ERROR, e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitEditProductForm)}>
      <div className="lg:flex">
        {/* PARTIE 1 */}
        <div className="lg:w-1/2">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Informations générales
            </h3>
          </div>

          <div className="mt-3 sm:col-span-6">
            <Input
              type="text"
              label="label"
              name={ProductAttributes.LABEL}
              register={register(ProductAttributes.LABEL)}
              error={errors[ProductAttributes.LABEL]?.message}
            />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                type="number"
                label="Quantité en stock"
                name={ProductAttributes.QUANTITY_IN_INVENTORY}
                register={register(ProductAttributes.QUANTITY_IN_INVENTORY)}
                error={errors[ProductAttributes.QUANTITY_IN_INVENTORY]?.message}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                type="number"
                label="Quantité optimal en stock"
                name={ProductAttributes.OPTIMUM_QUANTITY}
                register={register(ProductAttributes.OPTIMUM_QUANTITY)}
                error={errors[ProductAttributes.OPTIMUM_QUANTITY]?.message}
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                type="number"
                label="Prix d'achat HT"
                name={ProductAttributes.BUYING_PRICE}
                register={register(ProductAttributes.BUYING_PRICE)}
                placeholder="€"
                error={errors[ProductAttributes.BUYING_PRICE]?.message}
                inputClassName="placeholder:text-right"
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                type="number"
                label="Prix de vente HT"
                name={ProductAttributes.SELLING_PRICE}
                register={register(ProductAttributes.SELLING_PRICE)}
                placeholder="€"
                error={errors[ProductAttributes.SELLING_PRICE]?.message}
                inputClassName="placeholder:text-right"
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                type="number"
                label="TVA"
                name={ProductAttributes.TVA}
                register={register(ProductAttributes.TVA)}
                placeholder="%"
                error={errors[ProductAttributes.TVA]?.message}
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
                name={ProductAttributes.CATEGORY_UID}
                register={register(ProductAttributes.CATEGORY_UID)}
                error={errors[ProductAttributes.CATEGORY_UID]?.message}
                inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* PARTIE 2 */}
        <div className="mt-5 lg:mt-0 lg:w-1/2">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Information spécifique à la catégorie
            </h3>
          </div>
        </div>

        {/* PARTIE 3 */}

        {/* <div className="mt-5 lg:mt-0 lg:w-1/3">
          <SubFormVisibility
            product={product}
            register={register}
            errors={errors}
          />{' '}
        </div> */}
      </div>

      <div className="pt-6">
        <div className="flex justify-end">
          <LinkButton
            onClick={handleCloseModal}
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
