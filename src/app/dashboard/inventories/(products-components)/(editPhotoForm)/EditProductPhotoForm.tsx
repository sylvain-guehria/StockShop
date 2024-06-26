'use client';

import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { productRepository } from 'di';
import dynamic from 'next/dynamic';
import type { ChangeEvent, FC } from 'react';
import { createRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import LinkButton from '@/components/lib/LinkButton/LinkButton';
import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import { useToast } from '@/hooks/useToast';
import EmptyPictureSVG from '@/logo/EmptyPictureSVG';
import type UserEntity from '@/modules/user/UserEntity';
import { updatePhotoProductUseCase } from '@/usecases/usecases';

import { validationSchema } from './EditProductFormValidation';

const DynamicDeleteModal = dynamic(
  () => import('../../../../../components/lib/modal/DeleteModal'),
  {
    suspense: true,
  },
);

type Props = {
  user: UserEntity;
  productId: string;
};

interface PhotoAttributesType {
  size: number;
  type: string;
}

const EditProductPhotoForm: FC<Props> = ({ productId, user }) => {
  const queryClient = useQueryClient();
  const toast = useToast(10000);
  const [isDeletePhotoModalOpen, setIsDeletePhotoModalOpen] = useState(false);

  const { data: product, refetch } = useQuery({
    queryKey: [ApiRequestEnums.GetProduct, { productId }],
    queryFn: () => productRepository.getById(productId),
    enabled: !!productId,
    staleTime: 30000,
  });

  const fileInput: React.RefObject<HTMLInputElement> = createRef();

  const formOptions = {
    resolver: yupResolver(validationSchema),
  };

  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<PhotoAttributesType>(formOptions);

  register('size');
  register('type');

  const submitFile = async (file: File | null) => {
    if (!product) return;
    try {
      await updatePhotoProductUseCase({
        companyId: user.getCompanyId(),
        product,
        currentFile: file,
      });
      queryClient.invalidateQueries({ queryKey: [ApiRequestEnums.GetProduct] });
      refetch();
    } catch (error: any) {
      toast(ToasterTypeEnum.ERROR, error.message);
    }
  };

  const handleImageChange = (e: ChangeEvent): void => {
    e.preventDefault();
    const reader = new FileReader();
    const target = e.target as HTMLInputElement;
    const localFile: File = (target.files as FileList)[0] as File;
    if (!localFile) return;
    reader.onloadend = async () => {
      setValue('size', localFile.size);
      setValue('type', localFile.type);
      const isValid = await trigger(['size', 'type']);
      if (isValid) submitFile(localFile);
    };
    reader.readAsDataURL(localFile);
  };

  const handleClick = (): void => {
    fileInput?.current?.click();
  };

  const removePhoto = (): void => {
    setIsDeletePhotoModalOpen(false);
    if (fileInput != null && fileInput.current != null) {
      fileInput.current.value = '';
    }
    submitFile(null);
  };

  const handleDeletePhoto = (): void => {
    setIsDeletePhotoModalOpen(true);
  };

  // ADD a timestamp to the image src to force nextjs to reload the image without cache
  const timeStamp = new Date().getTime();

  return (
    <div>
      {isDeletePhotoModalOpen && (
        <DynamicDeleteModal
          open={isDeletePhotoModalOpen}
          cancelLabel="Annuler"
          confirmLabel="Supprimer"
          title="Supprimer la photo"
          description="Êtes-vous sûr de vouloir supprimer le produit cette photo"
          onConfirm={removePhoto}
          handleCloseModal={() => setIsDeletePhotoModalOpen(false)}
        />
      )}
      <div className="flex justify-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Visuel du produit
        </h3>
      </div>
      <form>
        <div className="mt-6 sm:col-span-6">
          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 py-4">
            <div className="space-y-1 text-center">
              <div className="relative mt-1 flex h-72 justify-center">
                {product?.getPhotoLink() ? (
                  <img
                    src={`${product?.getPhotoLink()}?${timeStamp}`}
                    alt="current product photo"
                    className="h-full object-cover"
                  />
                ) : (
                  <EmptyPictureSVG className="m-auto h-20 w-20 text-gray-400" />
                )}
              </div>

              <div className="w-full text-sm text-gray-600">
                <input
                  ref={fileInput}
                  accept={'.png, .jpg, .jpeg'}
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </div>
              {errors.type?.message && (
                <p className="text-sm text-red-600" id="inventoryName-error">
                  {errors.type?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          PNG, JPG, JPEG. Les photos de plus de 1MB seront compressées
        </p>
        <div className="mt-4 text-sm text-gray-600">
          {product?.getPhotoLink() ? (
            <LinkButton type="button" onClick={() => handleDeletePhoto()}>
              <div className="flex">
                <TrashIcon
                  className="mr-3 h-5 w-5 text-primary-600"
                  aria-hidden="true"
                />
                Supprimer la photo
              </div>
            </LinkButton>
          ) : (
            <LinkButton type="button" onClick={() => handleClick()}>
              <div className="flex">
                <PlusCircleIcon
                  className="mr-3 h-6 w-5 text-primary-600"
                  aria-hidden="true"
                />
                Ajouter une photo
              </div>
            </LinkButton>
          )}
        </div>
      </form>
    </div>
  );
};
export default EditProductPhotoForm;
