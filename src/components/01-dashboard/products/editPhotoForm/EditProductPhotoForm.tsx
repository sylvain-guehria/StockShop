'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { handleUpload } from 'firebaseFolder/storage';
import type { ChangeEvent, FC } from 'react';
import { createRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import LinkButton from '@/components/04-lib/LinkButton/LinkButton';
import NextImage from '@/components/04-lib/nextImage/NextImage';
import { useAuth } from '@/hooks/useAuth';
import type ProductEntity from '@/modules/product/ProductEntity';

import { validationSchema } from './EditProductFormValidation';

type Props = {
  product: ProductEntity;
};

interface PhotoAttributesType {
  size: number;
  type: string;
}

const EditProductPhotoForm: FC<Props> = ({ product }) => {
  const originalPhotoLink = product?.getPhotoLink();

  const { user } = useAuth();

  const [file, setFile] = useState<File | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>();

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
    if (currentFile) {
      Object.defineProperty(currentFile, 'name', {
        writable: true,
        value: product.getUid(),
      });
      const uploadedPhotoLink = await handleUpload(
        `users/${user.getUid()}`,
        'product',
        currentFile
      );
      // THEN SAVE PRODUCT WITH photoLink
    }
  };

  const handleFileChange = (newFile: File): void => {
    if (!newFile) {
      setValue('size', 0);
      setValue('type', '');
    } else {
      setValue('size', newFile.size);
      setValue('type', newFile.type);
      trigger(['size', 'type']);
    }
    setCurrentFile(newFile);
  };

  const handleImageChange = (e: ChangeEvent): void => {
    e.preventDefault();
    const reader = new FileReader();
    const target = e.target as HTMLInputElement;
    const localFile: File = (target.files as FileList)[0] as File;
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(localFile);
    handleFileChange(localFile);
  };

  const handleClick = (): void => {
    fileInput?.current?.click();
  };

  const handleRemove = (): void => {
    setFile(null);
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
              <div className="flex text-sm text-gray-600">
                <input
                  ref={fileInput}
                  accept={'.png, .jpg, .jpeg'}
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleImageChange}
                />
                <LinkButton type="button" onClick={() => handleClick()}>
                  Change
                </LinkButton>
                <LinkButton type="button" onClick={() => handleRemove()}>
                  Remove
                </LinkButton>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
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
        <div className="absolute right-0 bottom-0">
          <LinkButton type="submit" style="tertiary">
            Sauvegarder
          </LinkButton>
        </div>
      </form>
    </div>
  );
};
export default EditProductPhotoForm;
