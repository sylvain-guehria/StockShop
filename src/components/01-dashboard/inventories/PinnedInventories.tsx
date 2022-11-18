'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { inventoryServiceDi } from 'di';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import { useState } from 'react';

import Spinner from '@/components/04-lib/spinner/Spinner';
import { ToasterTypeEnum } from '@/components/08-toaster/toasterEnum';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import type { DeleteInventoryParams } from '@/modules/inventory/inventoryRepository';
import type { UpdateInventoryParams } from '@/modules/inventory/inventoryService';
import type { Inventory } from '@/modules/inventory/inventoryType';
import type { SetInventoryAsDefaultParams } from '@/usecases/inventoy/setInventoryAsDefault';
import {
  deleteInventoryUseCase,
  getUserInventoriesUseCase,
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
};

const PinnedInventories: FC<Props> = ({ currentInventoryUid }) => {
  const queryClient = useQueryClient();
  const toast = useToast(4000);
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState<Inventory>();

  const { data: inventories = [], isLoading } = useQuery({
    queryKey: ['get-inventories'],
    queryFn: () => getUserInventoriesUseCase(user.uid),
    enabled: !!user.uid,
  });

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
        {isLoading ? (
          <Spinner />
        ) : (
          inventories.map((inventory) => (
            <CardInventory
              key={inventory.uid}
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
