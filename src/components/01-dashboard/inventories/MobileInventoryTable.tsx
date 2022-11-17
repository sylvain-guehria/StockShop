import { ChevronRightIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';

import type { Product } from '@/modules/product/productType';

type Props = {
  products: Product[];
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const MobileInventoryTable: FC<Props> = ({ products }) => {
  return (
    <div className="mt-10 sm:hidden">
      <div className="px-4 sm:px-6">
        <h2 className="text-sm font-medium text-gray-900">Projects</h2>
      </div>
      <ul
        role="list"
        className="mt-3 divide-y divide-gray-100 border-t border-gray-200"
      >
        {products.map((product) => (
          <li key={product.uid}>
            <a
              href="#"
              className="group flex items-center justify-between p-4 hover:bg-gray-50 sm:px-6"
            >
              <span className="flex items-center space-x-3 truncate">
                <span
                  className={classNames(
                    'w-2.5 h-2.5 flex-shrink-0 rounded-full'
                  )}
                  aria-hidden="true"
                />
                <span className="truncate text-sm font-medium leading-6">
                  {product.label}{' '}
                  <span className="truncate font-normal text-gray-500">
                    in {product.description}
                  </span>
                </span>
              </span>
              <ChevronRightIcon
                className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileInventoryTable;
