'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { inventoryServiceDi } from 'di';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { ToasterTypeEnum } from '@/components/08-toaster/toasterEnum';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import type { Inventory } from '@/modules/inventory/inventoryType';

import { validationSchema } from './EditInventoryFormValidation';

interface EditInventoryFormFormType {
  name: string;
  isPublic: string;
  color: string;
}

const publicStates = [
  { id: 'isPrivate', title: 'Privée', value: 'false' },
  { id: 'isPublic', title: 'Public', value: 'true' },
];

type Props = {
  inventory: Inventory;
  onSuccess?: () => void;
};

const EditInventoryForm: FC<Props> = ({ inventory, onSuccess }) => {
  const toast = useToast(4000);
  const { user } = useAuth();
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: inventory.name,
      isPublic: inventory?.isPublic?.toString() || 'false',
      color: inventory.color || 'primary-600',
    },
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditInventoryFormFormType>(formOptions);

  register('color');

  const handleColorChange = (color: string): void => {
    setValue('color', color);
  };

  const onSubmit: SubmitHandler<EditInventoryFormFormType> = async (
    data: EditInventoryFormFormType
  ) => {
    try {
      await inventoryServiceDi.updateInventory(
        {
          uid: inventory.uid,
          name: data.name,
          isPublic: data.isPublic as unknown as boolean,
          color: data.color,
        },
        user.uid,
        inventory.companyUid as string
      );
      if (onSuccess) onSuccess();
    } catch (e) {
      toast(
        ToasterTypeEnum.ERROR,
        "Une erreur est survenue lors de la modification de l'inventaire"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Nom de l&apos;inventaire
        </label>
        <div className="mt-1">
          <input
            id="name"
            {...register('name')}
            type="text"
            autoComplete="name"
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div className="text-sm text-red-600">{errors.name?.message}</div>
      </div>

      <div>
        <label
          htmlFor="couleur"
          className="block text-sm font-medium text-gray-700"
        >
          Couleur
        </label>
        <div className="w-11">
          <div className="flex h-5 items-center">
            <input
              checked={watch('color') === 'primary-600'}
              id="primary-600"
              value="primary-600"
              onChange={(e) => handleColorChange(e.target.value)}
              aria-describedby="checkbox-color"
              type="checkbox"
              className="mr-3 h-6 w-6 rounded border-gray-300 bg-primary-600 text-primary-600 focus:ring-indigo-500"
            />
            <input
              checked={watch('color') === 'green-500'}
              id="green-500"
              value="green-500"
              onChange={(e) => handleColorChange(e.target.value)}
              aria-describedby="checkbox-color"
              type="checkbox"
              className="mr-3 h-6  w-6 rounded border-gray-300 bg-green-500 text-green-500 focus:ring-indigo-500"
            />
            <input
              checked={watch('color') === 'yellow-500'}
              id="yellow-500"
              value="yellow-500"
              onChange={(e) => handleColorChange(e.target.value)}
              aria-describedby="checkbox-color"
              type="checkbox"
              className="mr-3 h-6 w-6 rounded border-gray-300 bg-yellow-500 text-yellow-400 focus:ring-indigo-500"
            />
            <input
              checked={watch('color') === 'red-500'}
              id="red-500"
              value="red-500"
              onChange={(e) => handleColorChange(e.target.value)}
              aria-describedby="checkbox-color"
              type="checkbox"
              className="mr-3 h-6  w-6 rounded border-gray-300 bg-red-500 text-red-500 focus:ring-indigo-500"
            />
            <input
              checked={watch('color') === 'blue-400'}
              id="blue-400"
              value="blue-400"
              onChange={(e) => handleColorChange(e.target.value)}
              aria-describedby="checkbox-color"
              type="checkbox"
              className="mr-3 h-6  w-6 rounded border-gray-300 bg-blue-400 text-blue-400 focus:ring-indigo-500"
            />
            <input
              checked={watch('color') === 'orange-500'}
              id="orange-500"
              value="orange-500"
              onChange={(e) => handleColorChange(e.target.value)}
              aria-describedby="checkbox-color"
              type="checkbox"
              className="mr-3 h-6  w-6 rounded border-gray-300 bg-orange-500 text-orange-500 focus:ring-indigo-500"
            />
            <input
              checked={watch('color') === 'gray-500'}
              id="gray-500"
              value="gray-500"
              onChange={(e) => handleColorChange(e.target.value)}
              aria-describedby="checkbox-color"
              type="checkbox"
              className="mr-3 h-6  w-6 rounded border-gray-300 bg-gray-500 text-gray-500 focus:ring-indigo-500"
            />
            <input
              checked={watch('color') === 'black'}
              id="black"
              value="black"
              onChange={(e) => handleColorChange(e.target.value)}
              aria-describedby="checkbox-color"
              type="checkbox"
              className="mr-3 h-6  w-6 rounded border-gray-300 bg-black text-black focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="flex">
        {publicStates.map((state) => (
          <div key={state.id} className="mr-3 flex items-center">
            <input
              id={state.id}
              value={state.value}
              {...register('isPublic')}
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor={state.id}
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              {state.title}
            </label>
          </div>
        ))}
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Valider
        </button>
      </div>
    </form>
  );
};
export default EditInventoryForm;
