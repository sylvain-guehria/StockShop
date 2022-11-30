'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { ChangeEvent, FC } from 'react';
import { createRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import LinkButton from '@/components/04-lib/LinkButton/LinkButton';
import NextImage from '@/components/04-lib/nextImage/NextImage';
import { ToasterTypeEnum } from '@/components/08-toaster/toasterEnum';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import type ProductEntity from '@/modules/product/ProductEntity';
import { updatePhotoProductUseCase } from '@/usecases/usecases';

import { validationSchema } from './EditProductFormValidation';

type Props = {
  product: ProductEntity;
  handleCloseModal: () => void;
};

interface PhotoAttributesType {
  size: number;
  type: string;
}

const EditProductPhotoForm: FC<Props> = ({ product, handleCloseModal }) => {
  const { user } = useAuth();

  const toast = useToast(5000);

  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(
    product?.getPhotoLink()
  );

  const fileInput: React.RefObject<HTMLInputElement> = createRef();

  const formOptions = {
    resolver: yupResolver(validationSchema),
  };

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<PhotoAttributesType>(formOptions);

  register('size');
  register('type');

  const onSubmit: SubmitHandler<PhotoAttributesType> = async () => {
    try {
      await updatePhotoProductUseCase({
        userUid: user.getUid(),
        companyUid: user.getCompanyUid(),
        product,
        currentFile: currentFile as File,
      });
      handleCloseModal();
    } catch (error: any) {
      toast(ToasterTypeEnum.ERROR, error.message);
    }
  };

  const handleFileChange = (newFile: File): void => {
    if (!newFile) {
      setValue('size', 0);
      setValue('type', '');
    } else {
      setValue('size', newFile.size);
      setValue('type', newFile.type);
      const isValid = trigger(['size', 'type']);
      if (!isValid) {
        setCurrentFile(null);
        setImagePreviewUrl('');
        return;
      }
    }
    setCurrentFile(newFile);
  };

  const handleImageChange = (e: ChangeEvent): void => {
    e.preventDefault();
    const reader = new FileReader();
    const target = e.target as HTMLInputElement;
    const localFile: File = (target.files as FileList)[0] as File;
    reader.onloadend = () => {
      setCurrentFile(localFile);
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(localFile);
    handleFileChange(localFile);
  };

  const handleClick = (): void => {
    fileInput?.current?.click();
  };

  const handleRemove = (): void => {
    setCurrentFile(null);
    setImagePreviewUrl('');
    if (fileInput != null && fileInput.current != null) {
      fileInput.current.value = '';
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Visuel du produit
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6 sm:col-span-6">
          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              <div className="mb-3">
                {imagePreviewUrl ? (
                  <NextImage
                    src={imagePreviewUrl}
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
                <div className="text-sm text-gray-600">
                  <LinkButton type="button" onClick={() => handleClick()}>
                    {imagePreviewUrl ? 'Changer' : 'Ajouter'}
                  </LinkButton>
                  {imagePreviewUrl && (
                    <LinkButton type="button" onClick={() => handleRemove()}>
                      Supprimer
                    </LinkButton>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG max 2MB</p>
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
        <div>
          <LinkButton type="submit" style="tertiary">
            Sauvegarder
          </LinkButton>
        </div>
      </form>
    </div>
  );
};
export default EditProductPhotoForm;
