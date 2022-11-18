'use client';

import { InformationCircleIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';
import { useState } from 'react';

import { inventoryManagementRoutes } from '@/routes/inventoryManagementRoutes';

import CreateInventoryButton from './CreateInventoryButton';
import CreateProductButton from './CreateProductButton';
import InventoryTable from './InventoryTable';
import PinnedInventories from './PinnedInventories';

const Inventories: FC = () => {
  const [currentInventoryUid] = useState(
    'd55d6fa6-b913-4ffe-af12-231a560fe471'
  );
  // getDefaultInventoryAndProdcut (add endpoint) and setCurrentInventoryUid
  return (
    <>
      <div className="min-h-full">
        <div className="flex flex-col px-8">
          <main className="flex-1">
            <div className="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="flex min-w-0 flex-1">
                <h1 className="flex text-lg font-medium leading-6 text-gray-900 sm:truncate">
                  {inventoryManagementRoutes.myInventory.label}
                </h1>
                <div
                  className="tooltip"
                  data-tip="Prennez un compte premium pro pour gérer jusquà 5 inventaires."
                >
                  <InformationCircleIcon className="ml-3 h-6 w-6 shrink-0 text-primary-400" />
                </div>
              </div>
              <div className="mt-4 flex sm:mt-0 sm:ml-4">
                <CreateInventoryButton />
              </div>
            </div>
            <div className="mt-6 px-4 sm:px-6 lg:px-8">
              <PinnedInventories currentInventoryUid={currentInventoryUid} />
            </div>
            <div className="mt-10 px-8 sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="flex text-lg font-medium leading-6 text-gray-900 sm:truncate">
                  Produits
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Les inventaires sont gérés séparément. Les produits de la
                  liste ci-dessous sont ceux de l&apos;inventaire selectionné.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <CreateProductButton />
              </div>
            </div>
            {/* <MobileInventoryTable /> */}
            <InventoryTable />
          </main>
        </div>
      </div>
    </>
  );
};

export default Inventories;
