'use client';

import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import type { ChangeEvent, FC } from 'react';
import { createRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import LinkButton from '@/components/04-lib/LinkButton/LinkButton';
import NextImage from '@/components/04-lib/nextImage/NextImage';
import { ToasterTypeEnum } from '@/components/08-toaster/toasterEnum';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { updatePhotoProductUseCase } from '@/usecases/usecases';

import { productRepository } from '../../../../../di';
import { validationSchema } from './EditProductFormValidation';

const DynamicDeleteModal = dynamic(
  () => import('../../../04-lib/modal/DeleteModal'),
  {
    suspense: true,
  }
);

type Props = {
  productUid: string;
  inventoryUid: string;
};

interface PhotoAttributesType {
  size: number;
  type: string;
}

const EditProductPhotoForm: FC<Props> = ({ productUid, inventoryUid }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const toast = useToast(5000);
  const [isDeletePhotoModalOpen, setIsDeletePhotoModalOpen] = useState(false);

  const { data: product } = useQuery({
    queryKey: ['get-product', { productUid }],
    queryFn: () =>
      productRepository.getById({
        productUid,
        userUid: user.getUid(),
        companyUid: user.getCompanyUid(),
        inventoryUid,
      }),
    enabled: !!productUid,
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

  const submitFile = async (file: File) => {
    if (!product) return;
    try {
      await updatePhotoProductUseCase({
        userUid: user.getUid(),
        companyUid: user.getCompanyUid(),
        product,
        currentFile: file as File,
      });
      queryClient.invalidateQueries({ queryKey: ['get-product'] });
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
    submitFile(null as unknown as File);
  };

  const handleDeletePhoto = (): void => {
    setIsDeletePhotoModalOpen(true);
  };

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
          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              <div className="mb-3">
                {product?.getPhotoLink() ? (
                  <NextImage
                    src={product?.getPhotoLink()}
                    alt="current product photo"
                    width={200}
                    height={200}
                  />
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
              {errors.size?.message && (
                <p className="text-sm text-red-600" id="inventoryName-error">
                  {errors.size?.message}
                </p>
              )}
              {errors.type?.message && (
                <p className="text-sm text-red-600" id="inventoryName-error">
                  {errors.type?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500">PNG, JPG, JPEG max 2MB</p>
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
