'use client';

import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { inventoryManagementRoutes } from '@/routes/inventoryManagementRoutes';
import {
  getInventoryProductsUseCase,
  getUserInventoriesUseCase,
} from '@/usecases/usecases';

import CreateInventoryButton from './CreateInventoryButton';
import CreateProductButton from './CreateProductButton';
import InventoryTable from './InventoryTable';
import PinnedInventories from './PinnedInventories';

const Inventories: FC = () => {
  const { user } = useAuth();
  const [currentInventoryUid, setCurrentInventoryUid] = useState('');

  const { data: inventories = [], isLoading: isLoadingInventory } = useQuery({
    queryKey: ['get-inventories'],
    queryFn: () => getUserInventoriesUseCase(user.uid),
    enabled: !!user.uid,
    onSuccess: (data) => {
      if (!currentInventoryUid && data.length > 0) {
        const defaultInventoryUid = data.find((inventory) =>
          inventory.getIsDefaultInventory()
        )?.uid;
        setCurrentInventoryUid(defaultInventoryUid || '');
      }
    },
  });

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

  const onSelectInventory = (inventoryUid: string) => {
    setCurrentInventoryUid(inventoryUid);
  };

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
              <PinnedInventories
                currentInventoryUid={currentInventoryUid}
                onSelectInventory={onSelectInventory}
                inventories={inventories}
                isLoadingInventory={isLoadingInventory}
              />
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
                <CreateProductButton
                  currentInventoryUid={currentInventoryUid}
                />
              </div>
            </div>
            {/* <MobileInventoryTable /> */}
            <InventoryTable
              isLoadingProducts={isLoadingProducts}
              products={products}
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default Inventories;
