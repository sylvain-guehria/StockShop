'use client';

import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productServiceDi } from 'di';
import type { FC } from 'react';

import LinkButton from '@/components/04-lib/LinkButton/LinkButton';
import { useAuth } from '@/hooks/useAuth';
import type { CreateProductParams } from '@/modules/product/productService';

type Props = {
  currentInventoryUid: string;
};

const CreateProductButton: FC<Props> = ({ currentInventoryUid }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const mutation = useMutation({
    mutationFn: ({ userUid, companyUid, inventoryUid }: CreateProductParams) =>
      productServiceDi.createProductByUserUidCompanyUidAndInventoryUid({
        userUid,
        companyUid,
        inventoryUid,
      }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['get-products'] });
    },
  });

  const handleClickCreateInventory = () => {
    const userId = user.getUid();
    const companyId = user.getCompanyUid();

    if (!userId || !companyId || !currentInventoryUid) return;
    mutation.mutate({
      userUid: userId,
      companyUid: companyId,
      inventoryUid: currentInventoryUid,
    });
  };

  return (
    <LinkButton onClick={handleClickCreateInventory} style="secondary">
      <div className="flex">
        Ajouter un produit
        <PlusCircleIcon className="ml-3 h-6 w-6 shrink-0 text-primary-100" />
      </div>
    </LinkButton>
  );
};

export default CreateProductButton;
