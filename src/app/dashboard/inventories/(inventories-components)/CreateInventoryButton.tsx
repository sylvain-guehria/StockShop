'use client';

import { FolderPlusIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryServiceDi } from 'di';
import type { FC } from 'react';

import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import type { CreateInventoryParams } from '@/modules/inventory/inventoryService';

const CreateInventoryButton: FC = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const toast = useToast(5000);

  const mutation = useMutation({
    mutationFn: ({ companyId }: CreateInventoryParams) =>
      inventoryServiceDi.createInventoryWithCompanyId({
        companyId,
      }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [ApiRequestEnums.GetInventories],
      });
    },
    onError: () => {
      toast(
        ToasterTypeEnum.ERROR,
        "Erreur lors de la création de l'inventaire, veuillez réessayer."
      );
    },
  });

  const handleClickCreateInventory = () => {
    const { companyId } = user;

    if (!companyId) return;
    mutation.mutate({
      companyId,
    });
  };

  return (
    <div
      onClick={handleClickCreateInventory}
      className="mr-1 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent py-2 px-4 text-base font-medium text-primary-500 "
    >
      <FolderPlusIcon className="mr-3 h-6 w-6 shrink-0 text-primary-500" />
      Ajouter inventaire
    </div>
  );
};

export default CreateInventoryButton;
