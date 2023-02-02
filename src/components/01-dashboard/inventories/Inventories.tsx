'use client';

import { InformationCircleIcon } from '@heroicons/react/20/solid';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { useState } from 'react';

import Dropdown from '@/components/04-lib/dropdown/Dropdown';
import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import { useAuth } from '@/hooks/useAuth';
import { inventoryManagementRoutes } from '@/routes/inventoryManagementRoutes';
import { getUserInventoriesUseCase } from '@/usecases/usecases';

import ProductTable from '../products/ProductTable';
import CreateInventoryButton from './CreateInventoryButton';
import CreateProductButton from './CreateProductButton';
import PinnedInventories from './PinnedInventories';

const Inventories: FC = () => {
  const { user } = useAuth();
  const oneHourInMilliseconds = 1000 * 60 * 60;

  const [currentInventoryId, setCurrentInventoryId] = useState('');
  const [isInventoriesDropdownOpen, setIsInventoriesDropdownOpen] =
    useState(true);

  const { data: inventories = [], isLoading: isLoadingInventory } = useQuery({
    queryKey: [ApiRequestEnums.GetInventories],
    queryFn: () => getUserInventoriesUseCase(user),
    enabled: !!user.id,
    onSuccess: (data) => {
      if (!currentInventoryId && data.length > 0) {
        const defaultInventoryId =
          data.find((inventory) => inventory.isDefault())?.id || '';
        const firstInventoryId = data[0]?.getId() || '';
        setCurrentInventoryId(defaultInventoryId || firstInventoryId);
      }
    },
    staleTime: oneHourInMilliseconds,
  });

  const onSelectInventory = (inventoryId: string) => {
    setCurrentInventoryId(inventoryId);
  };

  return (
    <>
      <div className="min-h-full">
        <div className="mb-6 flex flex-col px-8">
          <main className="flex-1">
            <div className="relative border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="flex min-w-0 flex-1">
                <h1 className="flex text-lg font-medium leading-6 text-gray-900 sm:truncate">
                  {inventoryManagementRoutes.myInventory.label}
                </h1>
                {isInventoriesDropdownOpen && (
                  <div className="tooltip" data-tip="Cacher les inventaires">
                    <ChevronDownIcon
                      className="ml-3 h-6 w-6 shrink-0 "
                      onClick={() => setIsInventoriesDropdownOpen(false)}
                    />
                  </div>
                )}
                {!isInventoriesDropdownOpen && (
                  <div className="tooltip" data-tip="Afficher les inventaires">
                    <ChevronRightIcon
                      className="ml-3 h-6 w-6 shrink-0 "
                      onClick={() => setIsInventoriesDropdownOpen(true)}
                    />
                  </div>
                )}
                {/* <div
                  className="tooltip"
                  data-tip="Prennez un compte premium pro pour gérer jusquà 5 inventaires."
                >
                  <InformationCircleIcon className="ml-3 h-6 w-6 shrink-0 text-primary-400" />
                </div> */}
              </div>
              <div className="mt-4 flex sm:mt-0 sm:ml-4">
                <Dropdown
                  label="Ajouter nouveau"
                  Icon={PlusCircleIcon}
                  childrens={[
                    {
                      key: 'create-inventory',
                      render: <CreateInventoryButton />,
                    },
                    {
                      key: 'create-product',
                      render: (
                        <CreateProductButton
                          currentInventoryId={currentInventoryId}
                        />
                      ),
                    },
                  ]}
                />
              </div>
            </div>
            <div className="mt-6 px-4 sm:px-6 lg:px-8">
              {isInventoriesDropdownOpen && (
                <PinnedInventories
                  currentInventoryId={currentInventoryId}
                  onSelectInventory={onSelectInventory}
                  inventories={inventories}
                  isLoadingInventory={isLoadingInventory}
                />
              )}
            </div>
            <div className="mt-10 px-8 sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <div className="flex">
                  <h1 className="flex text-lg font-medium leading-6 text-gray-900 sm:truncate">
                    Produits
                  </h1>
                  <div
                    className="tooltip"
                    data-tip="Les inventaires sont gérés séparément. Les produits de la
                  liste ci-dessous sont ceux de l'inventaire selectionné."
                  >
                    <InformationCircleIcon className="ml-3 h-6 w-6 shrink-0 text-primary-400" />
                  </div>
                </div>
              </div>
            </div>
            {/* <MobileProductTable /> */}
            <ProductTable currentInventoryId={currentInventoryId} />
          </main>
        </div>
      </div>
    </>
  );
};

export default Inventories;
