import { useQuery } from '@tanstack/react-query';
import { productRepository } from 'di';
import type { FC } from 'react';

import Input from '@/components/04-lib/inputs/Input';
import InputSelect from '@/components/04-lib/inputs/InputSelect';
import InputTextArea from '@/components/04-lib/inputs/InputTextArea';
import NextImage from '@/components/04-lib/nextImage/NextImage';
import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import { useAuth } from '@/hooks/useAuth';
import type { CategoryInput } from '@/modules/category/categoryType';
import {
  getCategoryByUid,
  getCategoryInputFromDatabase,
  getSubCategoryByUid,
  getSubCategoryInputsFromDatabase,
} from '@/modules/category/categoryUtils';
import {
  ConditionLabels,
  ProductAttributes,
} from '@/modules/product/productType';

type Props = {
  productUid: string;
  inventoryUid: string;
};

const ProductView: FC<Props> = ({ productUid, inventoryUid }) => {
  const { user } = useAuth();

  const { data: product } = useQuery({
    queryKey: [ApiRequestEnums.GetProduct, { productUid }],
    queryFn: () =>
      productRepository.getById({
        productUid,
        userUid: user.getUid(),
        companyUid: user.getCompanyUid(),
        inventoryUid,
      }),
    enabled: !!productUid,
  });

  if (!product) return null;

  const categoryInputs = getCategoryInputFromDatabase(
    product.getCategoryUid() as string
  );
  const subCategoryInputs = getSubCategoryInputsFromDatabase(
    product.getCategoryUid() as string,
    product.getSubCategoryUid() as string
  );

  const allCategoryInputs = [...categoryInputs, ...subCategoryInputs];
  return (
    <>
      <div className="lg:flex">
        <div className="lg:w-1/3 lg:pr-4">
          <>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Informations générales
              </h3>
            </div>

            <div className="mt-3 sm:col-span-6">
              <Input
                type="text"
                label="label"
                disabled={true}
                name={ProductAttributes.LABEL}
                value={product.getLabel()}
              />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Input
                  type="number"
                  label="Quantité en stock"
                  name={ProductAttributes.QUANTITY_IN_INVENTORY}
                  value={product.getQuantityInInventory()}
                  disabled={true}
                />
              </div>

              <div className="sm:col-span-3">
                <Input
                  type="number"
                  label="Quantité optimal en stock"
                  name={ProductAttributes.OPTIMUM_QUANTITY}
                  value={product.getOptimumQuantity()}
                  disabled={true}
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  type="number"
                  label="Prix d'achat HT"
                  name={ProductAttributes.BUYING_PRICE}
                  value={product.getOptimumQuantity()}
                  disabled={true}
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  type="number"
                  step="0.01"
                  label="Prix de vente HT"
                  name={ProductAttributes.SELLING_PRICE}
                  value={product.getBuyingPrice()}
                  disabled={true}
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  type="number"
                  label="TVA"
                  step="0.1"
                  name={ProductAttributes.TVA}
                  value={product.getTva()}
                  disabled={true}
                />
              </div>
            </div>
            <div className="mt-6 grid gap-y-6 gap-x-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor={ProductAttributes.CONDITION}
                  className="block text-start text-sm font-medium text-gray-700"
                >
                  Etat
                </label>
                <div className="mt-1">
                  <Input
                    type="text"
                    value={ConditionLabels[product.getCondition()]}
                    disabled={true}
                    name={ProductAttributes.CONDITION}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor={ProductAttributes.CATEGORY_UID}
                  className="block text-start text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <div className="mt-1">
                  <Input
                    type="text"
                    name={ProductAttributes.CATEGORY_UID}
                    value={getCategoryByUid(product.getCategoryUid()).label}
                    disabled={true}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor={ProductAttributes.SUB_CATEGORY_UID}
                  className="block text-start text-sm font-medium text-gray-700"
                >
                  Sous catégorie
                </label>
                <div className="mt-1">
                  <Input
                    type="text"
                    name={ProductAttributes.SUB_CATEGORY_UID}
                    value={
                      getSubCategoryByUid(
                        product.getCategoryUid(),
                        product.getSubCategoryUid()
                      ).label
                    }
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </>
        </div>

        <div className="mt-10 lg:mt-0 lg:w-1/3 lg:pl-4 ">
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
                    <div className="sm:col-span-2" key={input.uid}>
                      <InputSelect
                        label={input.label}
                        name={input.uid}
                        options={input.options || []}
                        disabled={true}
                        value={product.getCatSubcatAttributes()[input.uid]}
                      />
                    </div>
                  );
                }

                return (
                  <div className="sm:col-span-2" key={input.uid}>
                    <Input
                      type="text"
                      label={input.label}
                      name={input.uid}
                      value={product.getCatSubcatAttributes()[input.uid]}
                      disabled={true}
                    />
                  </div>
                );
              })}
            </div>
          </>
        </div>

        <div className="mt-10 lg:mt-0 lg:w-1/3 lg:pl-4">
          <>
            <div className="flex justify-center">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Description
              </h3>
            </div>

            {/* <div className="mt-6">
              <InputRadio
                options={[
                  { label: 'Public', value: 'public' },
                  { label: 'Privé', value: 'private' },
                ]}
                register={register(ProductAttributes.IS_PUBLIC)}
                name={ProductAttributes.IS_PUBLIC}
                error={errors[ProductAttributes.IS_PUBLIC]?.message}
              />
            </div> */}
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
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  {product.getPhotoLink() ? (
                    <NextImage
                      src={product.getPhotoLink()}
                      alt="current product photo"
                      width={200}
                      height={200}
                    />
                  ) : (
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
                  )}
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};
export default ProductView;
