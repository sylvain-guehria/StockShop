import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productServiceDi } from 'di';
import type { FC } from 'react';

import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import type ProductEntity from '@/modules/product/ProductEntity';
import type { Product } from '@/modules/product/productType';

type Props = {
  product: ProductEntity;
  handleCloseModal: () => void;
};

const UpdateProductQuantity: FC<Props> = ({ product, handleCloseModal }) => {
  const queryClient = useQueryClient();

  const updateProductMutation = useMutation({
    mutationFn: (params: Product) => productServiceDi.updateProduct(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ApiRequestEnums.GetProducts],
      });
      queryClient.invalidateQueries({ queryKey: [ApiRequestEnums.GetProduct] });
      handleCloseModal();
    },
  });

  return (
    <div className="flex">
      <MinusCircleIcon
        className="mr-3 h-5 w-5 shrink-0 cursor-pointer text-primary-600"
        aria-hidden="true"
        onClick={() =>
          updateProductMutation.mutate({
            ...product,
            toBuy: product.toBuy > 0 ? product.toBuy - 1 : 0,
          })
        }
      />

      {product.toBuy}

      <PlusCircleIcon
        className="ml-3 h-5 w-5 shrink-0 cursor-pointer text-primary-600"
        aria-hidden="true"
        onClick={() =>
          updateProductMutation.mutate({
            ...product,
            toBuy: product.toBuy + 1,
          })
        }
      />
    </div>
  );
};

export default UpdateProductQuantity;
