'use client';

import { TrashIcon } from '@heroicons/react/20/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logException } from 'logger';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

import Input from '@/components/lib/inputs/Input';
import LinkButton from '@/components/lib/LinkButton/LinkButton';
import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import type { Inventory } from '@/modules/inventory/inventoryType';
import type { DeleteInventoryParams } from '@/usecases/inventoy/deleteInventory';
import { deleteInventoryUseCase } from '@/usecases/usecases';

type Props = {
  inventory: Inventory;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
};

const DeleteInventoryForm: FC<Props> = ({
  inventory,
  setIsDeleteModalOpen,
}) => {
  const queryClient = useQueryClient();
  const toast = useToast(10000);
  const { user } = useAuth();

  const validationSchema = object().shape({
    inventoryName: string()
      .required("Vous devez écrire le nom de l'inventaire.")
      .equals([inventory.name], "Le nom de l'inventaire est incorrect."),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ inventoryName: string }>(formOptions);

  const { isLoading, mutate } = useMutation({
    mutationFn: (params: DeleteInventoryParams) =>
      deleteInventoryUseCase(params),
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      toast(ToasterTypeEnum.SUCCESS, 'Linventaire a été supprimé avec succès');
      queryClient.invalidateQueries({
        queryKey: [ApiRequestEnums.GetProducts],
      });
      queryClient.invalidateQueries({
        queryKey: [ApiRequestEnums.GetInventories],
      });
    },
    onError: (error) => {
      logException(error, { when: 'DeleteInventoryForm' });
      toast(
        ToasterTypeEnum.ERROR,
        "Une erreur est survenue lors de la suppression de l'inventaire"
      );
    },
  });

  const onSubmitDeleteInventory = () => {
    mutate({
      inventoryId: inventory.id as string,
      companyId: user.getCompanyId(),
    });
  };

  return (
    <>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <TrashIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg font-medium leading-6 text-gray-900"
              id="modal-headline"
            >
              Supprimer l&apos;inventaire : &quot;{inventory.name}&quot;
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Etes vous sûr de vouloir supprimer cette inventaire ? Cette
                action est définitive.
                <br /> <br /> Pour supprimer cet inventaire veuillez écrire son
                nom complet et valider.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-center px-4 py-3 sm:flex sm:px-6">
        <form onSubmit={handleSubmit(onSubmitDeleteInventory)}>
          <div className="relative mt-1 rounded-md shadow-sm sm:flex">
            <Input
              type="text"
              name="inventoryName"
              register={register('inventoryName')}
              placeholder={inventory.name}
              error={errors.inventoryName?.message}
              aria-describedby="inventoryName-error"
              aria-invalid="true"
              inputClassName="border-red-300 pr-10 text-red-900 placeholder:text-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 "
            />
            <LinkButton
              type="submit"
              isLoading={isLoading}
              className="mt-3 w-full rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Valider
            </LinkButton>
          </div>
        </form>
      </div>
    </>
  );
};
export default DeleteInventoryForm;
