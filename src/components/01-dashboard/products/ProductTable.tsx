import type { FC } from 'react';

import Spinner from '@/components/04-lib/spinner/Spinner';
import type ProductEntity from '@/modules/product/ProductEntity';
import type { Product } from '@/modules/product/productType';

type Props = {
  isLoadingProducts: boolean;
  products: ProductEntity[];
};

const ProductTable: FC<Props> = ({ products, isLoadingProducts }) => {
  return (
    <div className="mt-8 hidden sm:block">
      <div className="inline-block min-w-full border border-gray-200 align-middle">
        <table className="min-w-full">
          <thead>
            <tr className="border-t border-gray-200">
              <th
                className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                <span className="lg:pl-2">Label</span>
              </th>
              <th
                className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Catégorie
              </th>
              <th
                className="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                scope="col"
              >
                Prix d&apos;achat HT
              </th>
              <th
                className="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                scope="col"
              >
                Prix de vente HT
              </th>
              <th
                className="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                scope="col"
              >
                TVA
              </th>
              <th
                className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Quantité en stock
              </th>
              <th
                className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                scope="col"
              >
                Quantité optimal
              </th>
              <th
                className="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                scope="col"
              >
                Manquant / En trop
              </th>
              <th
                className="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                scope="col"
              >
                A acheter
              </th>
              <th
                className="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                scope="col"
              >
                Visibilité
              </th>
              <th
                className="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                scope="col"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {products.map((product: Product) => (
              <tr key={product.uid}>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">
                  <div className="flex items-center space-x-2">
                    <div className="truncate hover:text-gray-600">
                      {product.label}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-2">
                    <span className="shrink-0 text-xs font-medium leading-5">
                      + 5
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                  {product.buyingPrice} €
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                  {product.sellingPrice} €
                </td>
                <td className="px-6 py-3 text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-2">
                    {product.buyingPrice}
                  </div>
                </td>
                <td className="px-6 py-3 text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-2">
                    {product.quantityInInventory}
                  </div>
                </td>
                <td className="px-6 py-3 text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-2">
                    {product.optimumQuantity}
                  </div>
                </td>
                <td className="px-6 py-3 text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-2">
                    {(product.optimumQuantity || 0) -
                      (product.quantityInInventory || 0)}
                  </div>
                </td>
                <td className="px-6 py-3 text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-2">
                    {product.toBuy || 0}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                  <div className="text-primary-600 hover:text-primary-900">
                    Editer
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoadingProducts && (
          <div className="my-5">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
