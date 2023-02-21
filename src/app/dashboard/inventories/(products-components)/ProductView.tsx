import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { productRepository } from 'di';
import type { FC } from 'react';

import Input from '@/components/lib/inputs/Input';
import InputRadio from '@/components/lib/inputs/InputRadio';
import InputTextArea from '@/components/lib/inputs/InputTextArea';
import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import EmptyPictureSVG from '@/logo/EmptyPictureSVG';
import type { CategoryInput } from '@/modules/category/categoryType';
import {
  getCategoryById,
  getCategoryInputFromDatabase,
  getSubCategoryById,
  getSubCategoryInputsFromDatabase,
} from '@/modules/category/categoryUtils';
import type { PublicDisponibilityEnum } from '@/modules/product/productType';
import {
  ConditionLabels,
  ProductAttributes,
  ProductLabels,
  PublicDisponibilityLabels,
} from '@/modules/product/productType';

type Props = {
  productId: string;
};

const ProductView: FC<Props> = ({ productId }) => {
  const { data: product } = useQuery({
    queryKey: [ApiRequestEnums.GetProduct, { productId }],
    queryFn: () => productRepository.getById(productId),
    enabled: !!productId,
    staleTime: 30000,
  });

  if (!product) return null;

  const categoryInputs = getCategoryInputFromDatabase(
    product.getCategoryId() as string
  );
  const subCategoryInputs = getSubCategoryInputsFromDatabase(
    product.getCategoryId() as string,
    product.getSubCategoryId() as string
  );

  const allCategoryInputs = [...categoryInputs, ...subCategoryInputs];
  const hasCategoryInputs = allCategoryInputs.length > 0;

  // ADD a timestamp to the image src to force nextjs to reload the image without cache
  const timeStamp = new Date().getTime();
  return (
    <div className="lg:flex">
      <div
        className={clsx('lg:pr-4', hasCategoryInputs ? 'lg:w-1/3' : 'lg:w-1/2')}
      >
        <>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Informations générales
            </h3>
          </div>

          <div className="mt-6 sm:col-span-6">
            <Input
              type="text"
              label={ProductLabels[ProductAttributes.LABEL]}
              disabled={true}
              name={ProductAttributes.LABEL}
              value={product.getLabel()}
            />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                type="number"
                label={ProductLabels[ProductAttributes.QUANTITY_IN_INVENTORY]}
                name={ProductAttributes.QUANTITY_IN_INVENTORY}
                value={product.getQuantityInInventory()}
                disabled={true}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                type="number"
                label={ProductLabels[ProductAttributes.OPTIMUM_QUANTITY]}
                name={ProductAttributes.OPTIMUM_QUANTITY}
                value={product.getOptimumQuantity()}
                disabled={true}
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                type="number"
                name={ProductAttributes.BUYING_PRICE}
                label={ProductLabels[ProductAttributes.BUYING_PRICE]}
                value={product.getOptimumQuantity()}
                disabled={true}
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                type="number"
                step="0.01"
                name={ProductAttributes.SELLING_PRICE}
                label={ProductLabels[ProductAttributes.SELLING_PRICE]}
                value={product.getBuyingPrice()}
                disabled={true}
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                type="number"
                step="0.1"
                name={ProductAttributes.TVA}
                label={ProductLabels[ProductAttributes.TVA]}
                value={product.getTva()}
                disabled={true}
              />
            </div>
          </div>
          <div className="mt-6 grid gap-y-6 gap-x-4 sm:grid-cols-3">
            <div>
              <div className="mt-1">
                <Input
                  type="text"
                  value={ConditionLabels[product.getCondition()]}
                  disabled={true}
                  name={ProductAttributes.CONDITION}
                  label={ProductLabels[ProductAttributes.CONDITION]}
                />
              </div>
            </div>
            <div>
              <div className="mt-1">
                <Input
                  type="text"
                  name={ProductAttributes.CATEGORY_ID}
                  label={ProductLabels[ProductAttributes.CATEGORY_ID]}
                  value={getCategoryById(product.getCategoryId()).label}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <div className="mt-1">
                <Input
                  type="text"
                  name={ProductAttributes.SUB_CATEGORY_ID}
                  label={ProductLabels[ProductAttributes.SUB_CATEGORY_ID]}
                  value={
                    getSubCategoryById(
                      product.getCategoryId(),
                      product.getSubCategoryId()
                    ).label
                  }
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </>
      </div>

      {hasCategoryInputs && (
        <div className={clsx('mt-10 lg:mt-0 lg:w-1/3 lg:pl-4')}>
          <>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Information spécifique à la catégorie
              </h3>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {allCategoryInputs.map((input: CategoryInput) => {
                if (input.inputType === 'select') {
                  return (
                    <div className="sm:col-span-2" key={input.id}>
                      <Input
                        type="text"
                        label={input.label}
                        name={input.id}
                        disabled={true}
                        value={product.getCatSubcatAttributes()[input.id]}
                      />
                    </div>
                  );
                }

                return (
                  <div className="sm:col-span-2" key={input.id}>
                    <Input
                      type="text"
                      label={input.label}
                      name={input.id}
                      value={product.getCatSubcatAttributes()[input.id]}
                      disabled={true}
                    />
                  </div>
                );
              })}
            </div>
          </>
        </div>
      )}

      <div
        className={clsx(
          'mt-10 lg:mt-0 lg:pl-4',
          hasCategoryInputs ? 'lg:w-1/3' : 'lg:w-1/2'
        )}
      >
        <>
          <div className="flex justify-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Visibilité
            </h3>
          </div>

          <div className="mt-6 flex">
            <InputRadio
              options={[
                { label: 'Public', value: true },
                { label: 'Privé', value: false },
              ]}
              name={ProductAttributes.IS_PUBLIC}
              label={ProductLabels[ProductAttributes.IS_PUBLIC]}
              defaultValue={product.getIsPublic()}
              disabled={true}
            />
            <Input
              type="text"
              value={
                PublicDisponibilityLabels[
                  product.getPublicDisponibility() as PublicDisponibilityEnum
                ]
              }
              disabled={true}
              name={ProductAttributes.PUBLIC_DISPONIBILITY}
              label={ProductLabels[ProductAttributes.PUBLIC_DISPONIBILITY]}
            />
          </div>
          <div className="mt-6 sm:col-span-6">
            <InputTextArea
              label="Description"
              name={ProductAttributes.DESCRIPTION}
              value={product.getDescription()}
              disabled={true}
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
            <div className="relative mt-1 flex h-32 justify-center rounded-md border-2 border-dashed border-gray-300">
              {product.getPhotoLink() ? (
                <img
                  src={`${product?.getPhotoLink()}?${timeStamp}`}
                  alt="current product photo"
                  className="h-full"
                />
              ) : (
                <EmptyPictureSVG className="m-auto h-20 w-20 text-gray-400" />
              )}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};
export default ProductView;
