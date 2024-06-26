import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PhotoIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import type { FC, Reducer } from 'react';
import { useEffect, useReducer, useState } from 'react';

import Pagination from '@/components/lib/pagination/Pagination';
import Spinner from '@/components/lib/spinner/Spinner';
import Tag from '@/components/lib/tag/Tag';
import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import { CustomEvents } from '@/enums/eventEnums';
import {
  getCategoryById,
  getSubCategoryById,
} from '@/modules/category/categoryUtils';
import type ProductEntity from '@/modules/product/ProductEntity';
import type UserEntity from '@/modules/user/UserEntity';
import { getInventoryProductsUseCase } from '@/usecases/usecases';

import { ProductsFilters } from './(filters)/ProductsFilters';
import type {
  FiltersActionsType,
  FiltersStateType,
} from './(filters)/ProductsFiltersReducer';
import {
  initialFilterState,
  reducerFilters,
} from './(filters)/ProductsFiltersReducer';
import Column from './ColumnProduct';
import UpdateProductQuantity from './UpdateProductQuantity';

const DynamicModal = dynamic(
  () => import('../../../../components/lib/modal/Modal'),
  {
    suspense: true,
  },
);

const DynamicDeleteProductModal = dynamic(
  () => import('./DeleteProductModal'),
  {
    suspense: true,
  },
);

const DynamicEditProductForm = dynamic(
  () => import('./(editProductForm)/EditProductForm'),
  {
    suspense: true,
  },
);

const DynamicEditProductPhotoForm = dynamic(
  () => import('./(editPhotoForm)/EditProductPhotoForm'),
  {
    suspense: true,
  },
);

const DynamicProductView = dynamic(() => import('./ProductView'), {
  suspense: true,
});

type Props = {
  currentInventoryId: string;
  user: UserEntity;
};

const ProductTable: FC<Props> = ({ currentInventoryId, user }) => {
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);
  const [isEditPhotoModalOpen, setIsEditPhotoModalOpen] = useState(false);
  const [isViewProductModalOpen, setIsViewProductModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productToEdit, setProductToEdit] = useState<ProductEntity | null>(
    null,
  );

  const oneHourInMilliseconds = 1000 * 60 * 60;

  const [filtersState, dispatchFilterActions] = useReducer<
    Reducer<FiltersStateType, FiltersActionsType>
  >(reducerFilters, initialFilterState);

  useEffect(() => {
    window.addEventListener(CustomEvents.ProductEventCreation, (event: any) =>
      handleEditProductClick(event.detail as ProductEntity),
    );

    return () => {
      window.removeEventListener(
        CustomEvents.ProductEventCreation,
        (event: any) => handleEditProductClick(event.detail as ProductEntity),
      );
    };
  }, []);

  const {
    data = {
      count: 0,
      products: [],
    },
    isLoading: isLoadingProducts,
  } = useQuery({
    queryKey: [
      ApiRequestEnums.GetProducts,
      {
        inventoryId: currentInventoryId,
        currentPage,
        filters: filtersState.filters,
        sorterField: filtersState.sorter.field,
        sorterOrder: filtersState.sorter.order,
      },
    ],
    queryFn: () =>
      getInventoryProductsUseCase({
        inventoryId: currentInventoryId,
        currentPage,
        filters: filtersState.filters,
        sorter: {
          field: filtersState.sorter.field,
          order: filtersState.sorter.order,
        },
      }),
    enabled: !!(
      user.getId() &&
      currentInventoryId &&
      user.getCompanyId() &&
      currentPage
    ),
    staleTime: oneHourInMilliseconds,
  });

  const handleEditProductClick = (product: ProductEntity) => {
    if (!product) return;
    setProductToEdit(product);
    setIsEditProductModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditProductModalOpen(false);
    setIsDeleteProductModalOpen(false);
    setIsEditPhotoModalOpen(false);
    setIsViewProductModalOpen(false);
    setProductToEdit(null);
  };

  const handleDeleteProductClick = (product: ProductEntity) => {
    setProductToEdit(product);
    setIsDeleteProductModalOpen(true);
  };

  const handleImageProductClick = (product: ProductEntity) => {
    setProductToEdit(product);
    setIsEditPhotoModalOpen(true);
  };

  const handleViewProductClick = (product: ProductEntity) => {
    setProductToEdit(product);
    setIsViewProductModalOpen(true);
  };

  return (
    <>
      {isEditProductModalOpen && (
        <DynamicModal
          open={isEditProductModalOpen}
          handleCloseModal={handleCloseModal}
          mawWidth="sm:max-w-7xl"
          width="w-full"
        >
          <DynamicEditProductForm
            product={productToEdit as ProductEntity}
            handleCloseModal={handleCloseModal}
          />
        </DynamicModal>
      )}
      {isDeleteProductModalOpen && (
        <DynamicDeleteProductModal
          product={productToEdit as ProductEntity}
          open={isDeleteProductModalOpen}
          handleCloseModal={handleCloseModal}
          user={user}
        />
      )}
      {isEditPhotoModalOpen && (
        <DynamicModal
          open={isEditPhotoModalOpen}
          handleCloseModal={handleCloseModal}
          mawWidth="sm:max-w-xl"
          width="w-full"
        >
          {productToEdit && (
            <DynamicEditProductPhotoForm
              productId={productToEdit.getId()}
              user={user}
            />
          )}
        </DynamicModal>
      )}
      {isViewProductModalOpen && (
        <DynamicModal
          open={isViewProductModalOpen}
          handleCloseModal={handleCloseModal}
          mawWidth="sm:max-w-7xl"
          width="w-full"
        >
          {productToEdit && (
            <DynamicProductView productId={productToEdit.getId()} />
          )}
        </DynamicModal>
      )}
      <div className="mt-8 flex flex-col">
        <div className="rounded-lg bg-white shadow ring-1 ring-black/5">
          <ProductsFilters
            filtersState={filtersState}
            dispatchFilterActions={dispatchFilterActions}
          />
          <div className="overflow-x-auto overflow-y-hidden">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr className="border-t border-gray-200">
                  <Column label="Label" className="py-3.5 pl-4 pr-3 sm:pl-6" />
                  <Column label="Catégorie" className="px-3 py-3.5" />
                  <Column label="Prix achat HT" className="px-3 py-3.5" />
                  <Column label="Prix vente HT" className="px-3 py-3.5" />
                  <Column
                    label="TVA"
                    className="hidden px-3 py-3.5 sm:table-cell"
                  />
                  <Column
                    label="En stock"
                    className="px-3 py-3.5"
                    help="Quantité en stock"
                  />
                  <Column
                    label="Optimal"
                    help="Quantité Optimal"
                    className="hidden px-3 py-3.5 sm:table-cell"
                  />
                  <Column label="" className="px-3 py-1">
                    <Tag
                      label="Manquant"
                      bgColor="bg-red-200"
                      textColor="text-red-800"
                    />
                    <Tag
                      label="En trop"
                      bgColor="bg-green-200"
                      textColor="text-green-800"
                    />
                  </Column>
                  <Column
                    label="A acheter"
                    className="hidden px-3 py-3.5 sm:table-cell"
                  />
                  <Column label="Visibilité" className="px-3 py-3.5" />
                  <Column label="" className="px-3 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.products.map((product: ProductEntity) => {
                  const quantityMissing =
                    (product.getQuantityInInventory() || 0) -
                    (product.getOptimumQuantity() || 0);
                  const categroyLabel =
                    getCategoryById(product.getCategoryId())?.label || '';
                  const subCategoryLabel =
                    getSubCategoryById(
                      product.getCategoryId(),
                      product.getSubCategoryId(),
                    )?.label || '';
                  return (
                    <tr key={product.id}>
                      <td className="whitespace-nowrap px-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <div className="flex">
                          <div
                            className="tooltip tooltip-right mr-3 cursor-pointer"
                            data-tip="Voir le produit"
                            onClick={() => handleViewProductClick(product)}
                          >
                            <MagnifyingGlassIcon
                              className="h-5 w-5 shrink-0 text-primary-600"
                              aria-hidden="true"
                            />
                            <span className="sr-only">
                              Voir {product.label}
                            </span>
                          </div>
                          <div
                            className="tooltip tooltip-right"
                            data-tip={product.label}
                          >
                            <div className="w-28 overflow-hidden text-ellipsis text-left">
                              {product.label}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div
                          className="tooltip tooltip-right"
                          data-tip={`${categroyLabel} ${
                            subCategoryLabel ? ` - ${subCategoryLabel}` : ''
                          }`}
                        >
                          <div className="block w-28 truncate">
                            {categroyLabel}
                            {subCategoryLabel ? ` - ${subCategoryLabel}` : ''}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.buyingPrice} €
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.sellingPrice} €
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {product.tva} %
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.quantityInInventory}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {product.optimumQuantity}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Tag
                          label={`${quantityMissing}`}
                          bgColor={
                            quantityMissing < 0 ? 'bg-red-200' : 'bg-green-200'
                          }
                          textColor={
                            quantityMissing < 0
                              ? 'text-red-800'
                              : 'text-green-800'
                          }
                        />
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        <UpdateProductQuantity
                          product={product}
                          handleCloseModal={handleCloseModal}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.isPublic ? 'Public' : 'Privé'}
                      </td>
                      <td className="relative flex whitespace-nowrap py-4 pl-3 pr-1 text-right text-sm font-medium">
                        <div
                          className="tooltip tooltip-left cursor-pointer"
                          data-tip="Modifier le produit"
                          onClick={() => handleEditProductClick(product)}
                        >
                          <PencilSquareIcon
                            className="ml-3 h-5 w-5 shrink-0 text-primary-600"
                            aria-hidden="true"
                          />
                          <span className="sr-only">
                            Modifier {product.label}
                          </span>
                        </div>
                        <div
                          className="tooltip tooltip-left cursor-pointer"
                          data-tip="Supprimer le produit"
                          onClick={() => handleDeleteProductClick(product)}
                        >
                          <TrashIcon
                            className="ml-3 h-5 w-5 shrink-0 text-primary-600"
                            aria-hidden="true"
                          />
                          <span className="sr-only">
                            Supprimer {product.label}
                          </span>
                        </div>
                        <div
                          className="tooltip tooltip-left cursor-pointer"
                          data-tip="Voir ou changer la photo"
                        >
                          <PhotoIcon
                            className="ml-3 h-5 w-5 shrink-0 text-primary-600"
                            aria-hidden="true"
                            onClick={() => handleImageProductClick(product)}
                          />
                          <span className="sr-only">
                            Changer la photo {product.label}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {!isLoadingProducts && (
            <Pagination
              totalResults={data.count}
              numberOfResultsPerPage={10}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              currentInventoryId={currentInventoryId}
            />
          )}

          {isLoadingProducts && (
            <div className="my-5">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductTable;
