import { EyeIcon } from '@heroicons/react/20/solid';
import { PencilSquareIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productServiceDi } from 'di';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import { useState } from 'react';

import Spinner from '@/components/04-lib/spinner/Spinner';
import Tag from '@/components/04-lib/tag/Tag';
import { useAuth } from '@/hooks/useAuth';
import type ProductEntity from '@/modules/product/ProductEntity';
import type { UpdateProductParams } from '@/modules/product/productService';
import { getInventoryProductsUseCase } from '@/usecases/usecases';

import Column from './ColumnProduct';

const DynamicModal = dynamic(() => import('../../04-lib/modal/Modal'), {
  suspense: true,
});

const DynamicEditInventoryForm = dynamic(
  () => import('./editProductForm/EditProductForm'),
  {
    suspense: true,
  }
);

type Props = {
  currentInventoryUid: string;
};

const ProductTable: FC<Props> = ({ currentInventoryUid }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductEntity | null>(
    null
  );

  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['get-products', { inventoryUid: currentInventoryUid }],
    queryFn: () =>
      getInventoryProductsUseCase({
        userUid: user.uid,
        inventoryUid: currentInventoryUid,
        companyUid: user.companyUid,
      }),
    enabled: !!(user.uid && currentInventoryUid && user.companyUid),
  });

  const updateProductMutation = useMutation({
    mutationFn: (params: UpdateProductParams) =>
      productServiceDi.updateProduct(params),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['get-products'] });
      setIsEditProductModalOpen(false);
    },
  });

  const editProduct = (product: ProductEntity) => {
    setProductToEdit(product);
    setIsEditProductModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditProductModalOpen(false);
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
          <DynamicEditInventoryForm
            product={productToEdit as unknown as ProductEntity}
            handleCloseModal={handleCloseModal}
            onSubmitEditForm={updateProductMutation.mutate}
          />
        </DynamicModal>
      )}
      <div className="mt-8 flex flex-col">
        <div className="overflow-x-auto rounded-lg shadow ring-1 ring-black/5">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="border-t border-gray-200">
                <Column label="Label" className="py-3.5 pl-4 pr-3 sm:pl-6" />
                <Column label="Catégorie" className="px-3 py-3.5" />
                <Column label="Prix d'achat HT" className="px-3 py-3.5" />
                <Column label="Prix de vente HT" className="px-3 py-3.5" />
                <Column
                  label="TVA"
                  className="hidden px-3 py-3.5 sm:table-cell"
                />
                <Column label="Quantité en stock" className="px-3 py-3.5" />
                <Column
                  label="Quantité optimal"
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
              {products.map((product: ProductEntity) => {
                const quantityMissing =
                  (product.quantityInInventory || 0) -
                  (product.optimumQuantity || 0);
                return (
                  <tr key={product.uid}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {product.label}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product.categoryUid}
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
                      {product.toBuy || 0}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product.isPublic ? 'Public' : 'Privé'}
                    </td>
                    <td className="relative flex whitespace-nowrap py-4 pl-3 pr-1 text-right text-sm font-medium">
                      <div
                        className="tooltip tooltip-left cursor-pointer"
                        data-tip="Modifier le produit"
                        onClick={() => editProduct(product)}
                      >
                        <PencilSquareIcon
                          className="ml-3 h-5 w-5 shrink-0 text-primary-600"
                          aria-hidden="true"
                        />
                        <span className="sr-only">
                          , Modifier {product.label}
                        </span>
                      </div>
                      <div
                        className="tooltip tooltip-left cursor-pointer"
                        data-tip="Voir le produit"
                      >
                        <EyeIcon
                          className="ml-3 h-5 w-5 shrink-0 text-primary-600"
                          aria-hidden="true"
                        />
                        <span className="sr-only">, Voir {product.label}</span>
                      </div>
                      <div
                        className="tooltip tooltip-left cursor-pointer"
                        data-tip="Ajouter à la liste d'achat"
                      >
                        <ShoppingBagIcon
                          className="ml-3 h-5 w-5 shrink-0 text-primary-600"
                          aria-hidden="true"
                        />
                        <span className="sr-only">
                          Ajouter à la liste produit à acheter {product.label}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
