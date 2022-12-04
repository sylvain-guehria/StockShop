'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import LinkButton from '@/components/04-lib/LinkButton/LinkButton';
import { ToasterTypeEnum } from '@/components/08-toaster/toasterEnum';
import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import type ProductEntity from '@/modules/product/ProductEntity';
import type { UpdateProductParams } from '@/modules/product/productService';
import type { ConditionTypeEnum } from '@/modules/product/productType';
import { ProductAttributes } from '@/modules/product/productType';

import { validationSchema } from './EditProductFormValidation';
import SubFormCategory from './SubFormCategory';
import SubFormGeneral from './SubFormGeneral';

export interface EditProductFormType {
  [ProductAttributes.LABEL]: string;
  [ProductAttributes.QUANTITY_IN_INVENTORY]?: number;
  [ProductAttributes.OPTIMUM_QUANTITY]?: number;
  [ProductAttributes.BUYING_PRICE]?: number;
  [ProductAttributes.SELLING_PRICE]?: number;
  [ProductAttributes.DESCRIPTION]?: string;
  [ProductAttributes.CATEGORY_UID]?: string;
  [ProductAttributes.SUB_CATEGORY_UID]?: string;
  [ProductAttributes.IS_PUBLIC]?: boolean;
  [ProductAttributes.TVA]?: number;
  [ProductAttributes.PUBLIC_DISPONIBILITY]?: string;
  [ProductAttributes.CAT_SUBCAT_ATTRIBUTES]?: Record<string, any>;
  [ProductAttributes.CONDITION]?: ConditionTypeEnum;
}

type Props = {
  product: ProductEntity;
  handleCloseModal: () => void;
  onSubmitEditForm: (params: UpdateProductParams) => void;
};

const EditProductForm: FC<Props> = ({
  product,
  handleCloseModal,
  onSubmitEditForm,
}) => {
  const toast = useToast(10000);
  const { user } = useAuth();
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
      [ProductAttributes.CATEGORY_UID]: product.categoryUid,
      [ProductAttributes.SUB_CATEGORY_UID]: product.subCategoryUid,
      [ProductAttributes.IS_PUBLIC]: product.isPublic,
      [ProductAttributes.DESCRIPTION]: product.description,
      [ProductAttributes.PUBLIC_DISPONIBILITY]: product.publicDisponibility,
      [ProductAttributes.CAT_SUBCAT_ATTRIBUTES]: product.catSubcatAttributes,
      [ProductAttributes.CONDITION]: product.condition,
    },
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<EditProductFormType>(formOptions);

  const onSubmitEditProductForm: SubmitHandler<EditProductFormType> = async (
    data: EditProductFormType
  ) => {
    try {
      await onSubmitEditForm({
        product: {
          ...product,
          ...data,
        },
        userUid: user.getUid(),
        companyUid: user.getCompanyUid(),
      });
      queryClient.invalidateQueries({ queryKey: [ApiRequestEnums.GetProduct] });
    } catch (e: any) {
      toast(ToasterTypeEnum.ERROR, e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitEditProductForm)}>
      <div className="lg:flex">
        <div className="lg:w-1/2 lg:pr-4">
          <SubFormGeneral register={register} errors={errors} watch={watch} />
        </div>

        <div className="mt-5 lg:mt-0 lg:w-1/2 lg:pl-4">
          <SubFormCategory
            register={register}
            watch={watch}
            product={product}
            setValue={setValue}
            getValues={getValues}
          />
        </div>

        {/* PARTIE 3 */}

        {/* <div className="mt-5 lg:mt-0 lg:w-1/3">
          <SubFormVisibility
            product={product}
            register={register}
            errors={errors}
          />
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
            Retour
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
