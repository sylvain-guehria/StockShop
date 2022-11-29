'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { ChangeEvent, FC } from 'react';
import { createRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

import LinkButton from '@/components/04-lib/LinkButton/LinkButton';
import NextImage from '@/components/04-lib/nextImage/NextImage';
import type ProductEntity from '@/modules/product/ProductEntity';

type Props = {
  product: ProductEntity;
};

const EditProductPhotoForm: FC<Props> = ({ product = {} }) => {
  const photoLink = product?.getPhotoLink();

  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>();
  const fileInput: React.RefObject<HTMLInputElement> = createRef();

  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [currentImageDisplayedLink, setCurrentImageDisplayedLink] =
    useState<string>(photoLink);

  const originalPhotoLink: string = photoLink;

  const formOptions = {
    resolver: yupResolver(
      object().shape({
        photoLink: string(),
      })
    ),
    defaultValues: {
      photoLink,
    },
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ photoLink: string }>(formOptions);

  register('photoLink');

  const onSubmit: SubmitHandler<{ photoLink: string }> = async ({
    photoLink: link,
  }) => {
    console.log({ photoLink: link });
  };

  const handleFileChange = (newFile: File): void => {
    console.log({ newFile });
    if (!newFile) {
      setValue('photoLink', originalPhotoLink);
    } else {
      setValue('photoLink', newFile.name);
    }
    setCurrentFile(newFile);
  };

  const handleImageChange = (e: ChangeEvent): void => {
    e.preventDefault();
    const reader = new FileReader();
    const target = e.target as HTMLInputElement;
    const localFile: File = (target.files as FileList)[0];
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
              {imagePreviewUrl && (
                <NextImage
                  src={imagePreviewUrl}
                  alt="current product photo"
                  fill={true}
                />
              )}
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
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white text-start font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
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
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditProductPhotoForm;
