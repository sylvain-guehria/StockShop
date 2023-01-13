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

  const [currentInventoryUid, setCurrentInventoryUid] = useState('');
  const [isInventoriesDropdownOpen, setIsInventoriesDropdownOpen] =
    useState(true);

  const { data: inventories = [], isLoading: isLoadingInventory } = useQuery({
    queryKey: [ApiRequestEnums.GetInventories],
    queryFn: () => getUserInventoriesUseCase(user),
    enabled: !!user.uid,
    onSuccess: (data) => {
      if (!currentInventoryUid && data.length > 0) {
        const defaultInventoryUid =
          data.find((inventory) => inventory.getIsDefaultInventory())?.uid ||
          '';
        const firstInventoryUid = data[0]?.getUid() || '';
        setCurrentInventoryUid(defaultInventoryUid || firstInventoryUid);
      }
    },
    staleTime: oneHourInMilliseconds,
  });

  const onSelectInventory = (inventoryUid: string) => {
    setCurrentInventoryUid(inventoryUid);
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
                          currentInventoryUid={currentInventoryUid}
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
                  currentInventoryUid={currentInventoryUid}
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
            <ProductTable currentInventoryUid={currentInventoryUid} />
          </main>
        </div>
      </div>
    </>
  );
};

export default Inventories;
