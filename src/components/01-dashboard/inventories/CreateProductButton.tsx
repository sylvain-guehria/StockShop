'use client';

import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productServiceDi } from 'di';
import type { FC } from 'react';

import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import { CustomEvents } from '@/enums/eventEnums';
import { useAuth } from '@/hooks/useAuth';
import type { CreateProductParams } from '@/modules/product/productService';

type Props = {
  currentInventoryUid: string;
};

const CreateProductButton: FC<Props> = ({ currentInventoryUid }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { mutate } = useMutation({
    mutationFn: ({ userUid, companyUid, inventoryUid }: CreateProductParams) =>
      productServiceDi.createProductByUserUidCompanyUidAndInventoryUid({
        userUid,
        companyUid,
        inventoryUid,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [ApiRequestEnums.GetProducts],
      });
      const event = new CustomEvent(CustomEvents.ProductEventCreation, {
        detail: data,
      });
      window.dispatchEvent(event);
    },
  });

  const handleClickCreateInventory = () => {
    const userId = user.getUid();
    const companyId = user.getCompanyUid();

    if (!userId || !companyId || !currentInventoryUid) return;
    mutate({
      userUid: userId,
      companyUid: companyId,
      inventoryUid: currentInventoryUid,
    });
  };

  return (
    <div
      onClick={handleClickCreateInventory}
      className="mr-1 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent py-2 px-4 text-base font-medium text-primary-500 "
    >
      <DocumentPlusIcon className="mr-3 h-6 w-6 shrink-0 text-primary-500" />
      Ajouter produit
    </div>
  );
};

export default CreateProductButton;
