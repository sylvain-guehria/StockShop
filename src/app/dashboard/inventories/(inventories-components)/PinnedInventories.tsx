'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import { useState } from 'react';

import Spinner from '@/components/lib/spinner/Spinner';
import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import type InventoryEntity from '@/modules/inventory/InventoryEntity';
import type { Inventory } from '@/modules/inventory/inventoryType';
import { setInventoryAsDefaultUseCase } from '@/usecases/usecases';

import CardInventory from './CardInventory';

const DynamicModal = dynamic(
  () => import('../../../../components/lib/modal/Modal'),
  {
    suspense: true,
  },
);

const DynamicEditInventoryForm = dynamic(
  () => import('./(editInventoryForm)/EditInventoryForm'),
  {
    suspense: true,
  },
);

const DynamicDeleteInventoryForm = dynamic(
  () => import('./(deleteInventoryForm)/DeleteInventoryForm'),
  {
    suspense: true,
  },
);

type Props = {
  currentInventoryId: string;
  inventories: InventoryEntity[];
  isLoadingInventory: boolean;
  onSelectInventory: (inventoryId: string) => void;
};

const PinnedInventories: FC<Props> = ({
  currentInventoryId,
  inventories,
  isLoadingInventory,
  onSelectInventory,
}) => {
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState<Inventory>();

  const {
    mutate: mutateSetDefaultInventory,
    isLoading: isLoadingSetDefaultInventory,
  } = useMutation({
    mutationFn: (inventory: Inventory) =>
      setInventoryAsDefaultUseCase(inventory),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ApiRequestEnums.GetInventories],
      });
    },
  });

  const handleClickEditInventory = (inventory: Inventory) => {
    setSelectedInventory(inventory);
    setIsEditModalOpen(true);
  };

  const handleClickDeleteInventory = (inventory: Inventory) => {
    setSelectedInventory(inventory);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedInventory(undefined);
  };

  const handleClickSetDefaultInventory = (inventory: Inventory) => {
    mutateSetDefaultInventory(inventory);
  };

  return (
    <>
      {isEditModalOpen && (
        <DynamicModal
          open={isEditModalOpen}
          handleCloseModal={handleCloseModal}
        >
          <DynamicEditInventoryForm
            inventory={selectedInventory as unknown as Inventory}
            setIsEditModalOpen={setIsEditModalOpen}
          />
        </DynamicModal>
      )}
      {isDeleteModalOpen && (
        <DynamicModal
          open={isDeleteModalOpen}
          handleCloseModal={handleCloseModal}
        >
          <DynamicDeleteInventoryForm
            inventory={selectedInventory as unknown as Inventory}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
        </DynamicModal>
      )}

      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4"
      >
        {isLoadingInventory ? (
          <Spinner />
        ) : (
          inventories.map((inventory) => (
            <CardInventory
              key={inventory.id}
              onSelectInventory={onSelectInventory}
              inventory={inventory}
              handleClickEditInventory={handleClickEditInventory}
              handleClickDeleteInventory={handleClickDeleteInventory}
              handleClickSetDefaultInventory={handleClickSetDefaultInventory}
              isCurrentInventory={currentInventoryId === inventory.id}
            />
          ))
        )}

        {isLoadingSetDefaultInventory && <Spinner />}
      </ul>
    </>
  );
};

export default PinnedInventories;
