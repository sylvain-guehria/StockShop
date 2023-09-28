import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logException } from 'logger';
import type { FC } from 'react';

import DeleteModal from '@/components/lib/modal/DeleteModal';
import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import { useToast } from '@/hooks/useToast';
import type ProductEntity from '@/modules/product/ProductEntity';
import type UserEntity from '@/modules/user/UserEntity';
import { deleteProductUseCase } from '@/usecases/usecases';

type Props = {
  open: boolean;
  handleCloseModal: () => void;
  product: ProductEntity;
  user: UserEntity;
};

const DeleteProductModal: FC<Props> = ({
  product,
  open,
  handleCloseModal,
  user,
}) => {
  const queryClient = useQueryClient();
  const toast = useToast(10000);

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      deleteProductUseCase({ product, companyId: user.getCompanyId() }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ApiRequestEnums.GetProducts],
      });
      handleCloseModal();
    },
    onError: (error) => {
      logException(error, { when: 'DeleteProductModal' });
      toast(
        ToasterTypeEnum.ERROR,
        'Une erreur est survenue lors de la suppression du produit, veuillez réessayer.',
      );
    },
  });

  return (
    <DeleteModal
      open={open}
      handleCloseModal={handleCloseModal}
      cancelLabel="Annuler"
      confirmLabel="Supprimer"
      title="Supprimer le produit"
      description={`Êtes-vous sûr de vouloir supprimer le produit : ${product?.getLabel()} ?`}
      isLoading={isLoading}
      onConfirm={mutate}
    />
  );
};
export default DeleteProductModal;
