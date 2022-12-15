'use client';

import { FolderPlusIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { inventoryServiceDi } from 'di';
import type { FC } from 'react';

import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import { useAuth } from '@/hooks/useAuth';
import type { CreateInventoryParams } from '@/modules/inventory/inventoryService';
import { getUserInventoriesUseCase } from '@/usecases/usecases';

const CreateInventoryButton: FC = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: inventories = [] } = useQuery({
    queryKey: [ApiRequestEnums.GetInventories],
    queryFn: () => getUserInventoriesUseCase(user.uid),
    enabled: !!user.uid,
    staleTime: 30000,
  });

  const mutation = useMutation({
    mutationFn: ({ userUid, companyUid }: CreateInventoryParams) =>
      inventoryServiceDi.createInventoryByUserIdAndCompanyId({
        userUid,
        companyUid,
      }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [ApiRequestEnums.GetInventories],
      });
    },
  });

  const handleClickCreateInventory = () => {
    const userId = user.uid;
    const companyId = inventories[0]?.companyUid;

    if (!userId || !companyId) return;
    mutation.mutate({
      userUid: userId,
      companyUid: companyId,
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
