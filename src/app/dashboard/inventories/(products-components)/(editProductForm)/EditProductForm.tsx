'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productServiceDi } from 'di';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import LinkButton from '@/components/lib/LinkButton/LinkButton';
import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import { useToast } from '@/hooks/useToast';
import type ProductEntity from '@/modules/product/ProductEntity';
import type {
  ConditionTypeEnum,
  Product,
  PublicDisponibilityEnum,
} from '@/modules/product/productType';
import { ProductAttributes } from '@/modules/product/productType';

import { validationSchema } from './EditProductFormValidation';
import SubFormCategory from './SubFormCategory';
import SubFormGeneral from './SubFormGeneral';
import SubFormVisibility from './SubFormVisibility';

export interface EditProductFormType {
  [ProductAttributes.LABEL]: string;
  [ProductAttributes.QUANTITY_IN_INVENTORY]?: number;
  [ProductAttributes.OPTIMUM_QUANTITY]?: number;
  [ProductAttributes.BUYING_PRICE]?: number;
  [ProductAttributes.SELLING_PRICE]?: number;
  [ProductAttributes.DESCRIPTION]?: string;
  [ProductAttributes.CATEGORY_ID]?: string;
  [ProductAttributes.SUB_CATEGORY_ID]?: string;
  [ProductAttributes.IS_PUBLIC]?: boolean;
  [ProductAttributes.TVA]?: number;
  [ProductAttributes.PUBLIC_DISPONIBILITY]?: PublicDisponibilityEnum;
  [ProductAttributes.CAT_SUBCAT_ATTRIBUTES]?: Record<string, any>;
  [ProductAttributes.CONDITION]?: ConditionTypeEnum;
}

type Props = {
  product: ProductEntity;
  handleCloseModal: () => void;
};

const EditProductForm: FC<Props> = ({ product, handleCloseModal }) => {
  const toast = useToast(10000);
  const queryClient = useQueryClient();

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      [ProductAttributes.LABEL]: product.label,
      [ProductAttributes.QUANTITY_IN_INVENTORY]: product.quantityInInventory,
      [ProductAttributes.OPTIMUM_QUANTITY]: product.optimumQuantity,
      [ProductAttributes.BUYING_PRICE]: product.buyingPrice,
      [ProductAttributes.SELLING_PRICE]: product.sellingPrice,
      [ProductAttributes.TVA]: product.tva,
      [ProductAttributes.CATEGORY_ID]: product.categoryId,
      [ProductAttributes.SUB_CATEGORY_ID]: product.subCategoryId,
      [ProductAttributes.IS_PUBLIC]: product.isPublic,
      [ProductAttributes.DESCRIPTION]: product.description,
      [ProductAttributes.PUBLIC_DISPONIBILITY]: product.publicDisponibility,
      [ProductAttributes.CAT_SUBCAT_ATTRIBUTES]: product.catSubcatAttributes,
      [ProductAttributes.CONDITION]: product.condition,
    },
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (params: Product) => productServiceDi.updateProduct(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ApiRequestEnums.GetProducts],
      });
      queryClient.invalidateQueries({ queryKey: [ApiRequestEnums.GetProduct] });
      handleCloseModal();
    },
    onError: (error: any) => {
      toast(ToasterTypeEnum.ERROR, error.message);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<EditProductFormType>(formOptions);

  const onSubmitEditProductForm: SubmitHandler<EditProductFormType> = async (
    data: EditProductFormType
  ) => {
    mutate({
      ...product,
      ...data,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitEditProductForm)}>
      <div className="lg:flex">
        <div className="lg:w-1/3 lg:pr-4">
          <SubFormGeneral
            register={register}
            errors={errors}
            control={control}
          />
        </div>

        <div className="mt-5 lg:mt-0 lg:w-1/3 lg:px-4">
          <SubFormCategory
            register={register}
            watch={watch}
            product={product}
            setValue={setValue}
            getValues={getValues}
          />
        </div>

        <div className="mt-5 lg:mt-0 lg:w-1/3 ">
          <SubFormVisibility
            register={register}
            errors={errors}
            getValues={getValues}
          />
        </div>
      </div>

      <div className="pt-6">
        <div className="flex justify-end">
          <LinkButton
            onClick={handleCloseModal}
            type="button"
            style="primary"
            className="flex justify-center"
          >
            Retour
          </LinkButton>
          <LinkButton
            type="submit"
            style="secondary"
            className="ml-2 flex justify-center"
            isLoading={isLoading}
          >
            Valider
          </LinkButton>
        </div>
      </div>
    </form>
  );
};
export default EditProductForm;
