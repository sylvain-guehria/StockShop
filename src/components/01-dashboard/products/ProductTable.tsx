import { EyeIcon } from '@heroicons/react/20/solid';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import type { FC } from 'react';

import Spinner from '@/components/04-lib/spinner/Spinner';
import type ProductEntity from '@/modules/product/ProductEntity';
import type { Product } from '@/modules/product/productType';
import { classNames } from '@/utils/tailwindUtils';

type Props = {
  isLoadingProducts: boolean;
  products: ProductEntity[];
};

const Column = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => (
  <th
    className={classNames(
      className || '',
      'text-left text-sm font-semibold text-gray-900'
    )}
    scope="col"
  >
    {label}
  </th>
);

const ProductTable: FC<Props> = ({ products, isLoadingProducts }) => {
  return (
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
              <Column label="Manquant / En trop" className="px-3 py-3.5" />
              <Column
                label="A acheter"
                className="hidden px-3 py-3.5 sm:table-cell"
              />
              <Column label="Visibilité" className="px-3 py-3.5" />
              <Column label="" className="px-3 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {products.map((product: Product) => (
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
                  {product.tva}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {product.quantityInInventory}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {product.optimumQuantity}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {(product.optimumQuantity || 0) -
                    (product.quantityInInventory || 0)}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {product.toBuy || 0}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {product.isPublic ? 'Public' : 'Privé'}
                </td>
                <td className="relative flex whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <div className="cursor-pointer">
                    <PencilSquareIcon
                      className="ml-3 h-5 w-5 shrink-0 text-primary-600"
                      aria-hidden="true"
                    />
                    <span className="sr-only">, Modifier {product.label}</span>
                  </div>
                  <div className="cursor-pointer">
                    <EyeIcon
                      className="ml-3 h-5 w-5 shrink-0 text-primary-600"
                      aria-hidden="true"
                    />
                    <span className="sr-only">, Voir {product.label}</span>
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
