'use client';

import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { inventoryServiceDi } from 'di';
import type { FC } from 'react';

import LinkButton from '@/components/04-lib/LinkButton/LinkButton';
import { useAuth } from '@/hooks/useAuth';
import Providers from '@/layouts/Providers';
import type { CreateInventoryParams } from '@/modules/inventory/inventoryService';
import { getUserInventoriesUseCase } from '@/usecases/usecases';

const CreateInventoryButton: FC = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: inventories = [] } = useQuery({
    queryKey: ['get-inventories'],
    queryFn: () => getUserInventoriesUseCase(user.uid),
    enabled: !!user.uid,
  });

  const mutation = useMutation({
    mutationFn: ({ userUid, companyUid }: CreateInventoryParams) =>
      inventoryServiceDi.createInventoryByUserIdAndCompanyId({
        userUid,
        companyUid,
      }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['get-inventories'] });
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
    <LinkButton onClick={handleClickCreateInventory} style="secondary">
      <div className="flex">
        Créer un nouvel inventaire
        <PlusCircleIcon className="ml-3 h-6 w-6 shrink-0 text-primary-100" />
      </div>
    </LinkButton>
  );
};

const CreateInventoryButtonWithProviders: FC = () => {
  return (
    <Providers>
      <CreateInventoryButton />
    </Providers>
  );
};

export default CreateInventoryButtonWithProviders;
