'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryServiceDi } from 'di';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import { useState } from 'react';

import Spinner from '@/components/04-lib/spinner/Spinner';
import { ToasterTypeEnum } from '@/components/08-toaster/toasterEnum';
import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import type InventoryEntity from '@/modules/inventory/InventoryEntity';
import type { UpdateInventoryParams } from '@/modules/inventory/inventoryService';
import type { Inventory } from '@/modules/inventory/inventoryType';
import type { DeleteInventoryParams } from '@/usecases/inventoy/deleteInventory';
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
      queryClient.invalidateQueries({
        queryKey: [ApiRequestEnums.GetInventories],
      });
      setIsEditModalOpen(false);
    },
  });

  const deleteInventoryMutation = useMutation({
    mutationFn: (params: DeleteInventoryParams) =>
      deleteInventoryUseCase(params),
    onSuccess: () => {
      handleCloseModal();
      queryClient.refetchQueries({
        queryKey: [ApiRequestEnums.GetProducts],
      });
      queryClient.invalidateQueries({
        queryKey: [ApiRequestEnums.GetInventories],
      });
    },
    onError: (error: any) => {
      handleCloseModal();
      toast(ToasterTypeEnum.ERROR, error.message);
    },
  });

  const setDaufltInventoryMutation = useMutation({
    mutationFn: (params: SetInventoryAsDefaultParams) =>
      setInventoryAsDefaultUseCase(params),
    onSuccess: () => {
      // Invalidate and refetch
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
    setDaufltInventoryMutation.mutate({
      inventory,
      userId: user.id,
    });
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
            deleteInventory={(inventory) =>
              deleteInventoryMutation.mutate({
                inventoryId: inventory.id as string,
                companyId: user.getCompanyId(),
              })
            }
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
      </ul>
    </>
  );
};

export default PinnedInventories;
