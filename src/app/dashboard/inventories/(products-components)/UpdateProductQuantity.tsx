import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productServiceDi } from 'di';
import { logException } from 'logger';
import type { FC } from 'react';

import Spinner from '@/components/lib/spinner/Spinner';
import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import { useToast } from '@/hooks/useToast';
import type ProductEntity from '@/modules/product/ProductEntity';
import type { Product } from '@/modules/product/productType';

type Props = {
  product: ProductEntity;
  handleCloseModal: () => void;
};

const UpdateProductQuantity: FC<Props> = ({ product, handleCloseModal }) => {
  const queryClient = useQueryClient();
  const toast = useToast(10000);

  const { mutate, isLoading } = useMutation({
    mutationFn: (params: Product) => productServiceDi.updateProduct(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ApiRequestEnums.GetProducts],
      });
      queryClient.invalidateQueries({ queryKey: [ApiRequestEnums.GetProduct] });
      handleCloseModal();
    },
    onError: (error) => {
      logException(error, { when: 'UpdateProductQuantity' });
      toast(
        ToasterTypeEnum.ERROR,
        'Erreur lors de la création du produit, veuillez réessayer.',
      );
    },
  });

  return (
    <div className="flex">
      <MinusCircleIcon
        className="mr-3 h-5 w-5 shrink-0 cursor-pointer text-primary-600"
        aria-hidden="true"
        onClick={() =>
          mutate({
            ...product,
            toBuy: product.toBuy > 0 ? product.toBuy - 1 : 0,
          })
        }
      />

      <div className="h-2 w-2">{isLoading ? <Spinner /> : product.toBuy}</div>

      <PlusCircleIcon
        className="ml-3 h-5 w-5 shrink-0 cursor-pointer text-primary-600"
        aria-hidden="true"
        onClick={() =>
          mutate({
            ...product,
            toBuy: product.toBuy + 1,
          })
        }
      />
    </div>
  );
};

export default UpdateProductQuantity;
