'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryServiceDi } from 'di';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import { useState } from 'react';

import Spinner from '@/components/04-lib/spinner/Spinner';
import { ToasterTypeEnum } from '@/components/08-toaster/toasterEnum';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import type InventoryEntity from '@/modules/inventory/InventoryEntity';
import type { DeleteInventoryParams } from '@/modules/inventory/inventoryRepository';
import type { UpdateInventoryParams } from '@/modules/inventory/inventoryService';
import type { Inventory } from '@/modules/inventory/inventoryType';
import type { SetInventoryAsDefaultParams } from '@/usecases/inventoy/setInventoryAsDefault';
import {
  deleteInventoryUseCase,
  setInventoryAsDefaultUseCase,
} from '@/usecases/usecases';

import CardInventory from './CardInventory';
import DeleteInventoryForm from './deleteInventoryForm/DeleteInventoryForm';

const DynamicModal = dynamic(() => import('../../04-lib/modal/Modal'), {
  suspense: true,
});

const DynamicEditInventoryForm = dynamic(
  () => import('./editInventoryForm/EditInventoryForm'),
  {
    suspense: true,
  }
);

type Props = {
  currentInventoryUid: string;
  inventories: InventoryEntity[];
  isLoadingInventory: boolean;
  onSelectInventory: (inventoryUid: string) => void;
};

const PinnedInventories: FC<Props> = ({
  currentInventoryUid,
  inventories,
  isLoadingInventory,
  onSelectInventory,
}) => {
  const queryClient = useQueryClient();
  const toast = useToast(4000);
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState<Inventory>();

  const updateInventoryMutation = useMutation({
    mutationFn: (params: UpdateInventoryParams) =>
      inventoryServiceDi.updateInventory(params),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['get-inventories'] });
      setIsEditModalOpen(false);
    },
  });

  const deleteInventoryMutation = useMutation({
    mutationFn: (params: DeleteInventoryParams) =>
      deleteInventoryUseCase(params),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['get-inventories'] });
    },
  });

  const setDaufltInventoryMutation = useMutation({
    mutationFn: (params: SetInventoryAsDefaultParams) =>
      setInventoryAsDefaultUseCase(params),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['get-inventories'] });
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
    setDaufltInventoryMutation.mutate({
      inventory,
      userUid: user.uid,
    });
  };

  const deleteInventory = (inventory: Inventory) => {
    try {
      deleteInventoryMutation.mutate({
        inventoryUid: inventory.uid as string,
        userUid: user.uid as string,
        companyUid: inventories[0]?.companyUid as string,
      });
      handleCloseModal();
    } catch (error: any) {
      toast(ToasterTypeEnum.ERROR, error.message);
    }
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
            onSubmit={updateInventoryMutation.mutate}
          />
        </DynamicModal>
      )}
      {isDeleteModalOpen && (
        <DynamicModal
          open={isDeleteModalOpen}
          handleCloseModal={handleCloseModal}
        >
          <DeleteInventoryForm
            inventory={selectedInventory as unknown as Inventory}
            deleteInventory={(inventory) => deleteInventory(inventory)}
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
              key={inventory.uid}
              onSelectInventory={onSelectInventory}
              inventory={inventory}
              handleClickEditInventory={handleClickEditInventory}
              handleClickDeleteInventory={handleClickDeleteInventory}
              handleClickSetDefaultInventory={handleClickSetDefaultInventory}
              isCurrentInventory={currentInventoryUid === inventory.uid}
            />
          ))
        )}
      </ul>
    </>
  );
};

export default PinnedInventories;
