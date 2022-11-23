'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import LinkButton from '@/components/04-lib/LinkButton/LinkButton';
import { ToasterTypeEnum } from '@/components/08-toaster/toasterEnum';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import type { UpdateInventoryParams } from '@/modules/inventory/inventoryService';
import type {
  Inventory,
  InventoryColor,
} from '@/modules/inventory/inventoryType';
import { InventoryColors } from '@/modules/inventory/inventoryType';

import { validationSchema } from './EditInventoryFormValidation';

const { BLACK, BLUE, GRAY, GREEN, ORANGE, PRIMARY, RED, YELLOW } =
  InventoryColors;

interface EditInventoryFormType {
  name: string;
  isPublic: string;
  color: InventoryColor;
}

const publicStates = [
  { id: 'isPrivate', title: 'Privée', value: 'false' },
  { id: 'isPublic', title: 'Public', value: 'true' },
];

type Props = {
  inventory: Inventory;
  onSubmit: ({ inventory, userUid, companyUid }: UpdateInventoryParams) => void;
};

const EditInventoryForm: FC<Props> = ({ inventory, onSubmit }) => {
  const toast = useToast(4000);
  const { user } = useAuth();
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: inventory.name,
      isPublic: inventory?.isPublic?.toString() || 'false',
      color: inventory.color || PRIMARY,
    },
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditInventoryFormType>(formOptions);

  register('color');

  const handleColorChange = (color: InventoryColor): void => {
    setValue('color', color);
  };

  const onSubmitForm: SubmitHandler<EditInventoryFormType> = async (
    data: EditInventoryFormType
  ) => {
    try {
      onSubmit({
        inventory: {
          uid: inventory.uid,
          name: data.name,
          isPublic: data.isPublic as unknown as boolean,
          color: data.color,
          isDefaultInventory: inventory.isDefaultInventory,
        },
        userUid: user.uid,
        companyUid: inventory.companyUid as string,
      });
    } catch (e) {
      toast(
        ToasterTypeEnum.ERROR,
        "Une erreur est survenue lors de la modification de l'inventaire"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-6 p-6 text-left"
    >
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
              checked={watch('color') === PRIMARY}
              id={PRIMARY}
              value={PRIMARY}
              onChange={(e) =>
                handleColorChange(e.target.value as InventoryColor)
              }
              aria-describedby="checkbox-color"
              type="checkbox"
              className="mr-3 h-6 w-6 rounded border-gray-300 bg-primary-600 text-primary-600 focus:ring-indigo-500"
            />
            <input
              checked={watch('color') === GREEN}
              id={GREEN}
              value={GREEN}
              onChange={(e) =>
                handleColorChange(e.target.value as InventoryColor)
              }
              aria-describedby="checkbox-color"
              type="checkbox"
              className="mr-3 h-6  w-6 rounded border-gray-300 bg-green-500 text-green-500 focus:ring-indigo-500"
            />
            <input
              checked={watch('color') === YELLOW}
              id={YELLOW}
              value={YELLOW}
              onChange={(e) =>
                handleColorChange(e.target.value as InventoryColor)
              }
              aria-describedby="checkbox-color"
              type="checkbox"
              className="mr-3 h-6 w-6 rounded border-gray-300 bg-yellow-500 text-yellow-400 focus:ring-indigo-500"
            />
            <input
              checked={watch('color') === RED}
              id={RED}
              value={RED}
              onChange={(e) =>
                handleColorChange(e.target.value as InventoryColor)
              }
              aria-describedby="checkbox-color"
              type="checkbox"
              className="mr-3 h-6  w-6 rounded border-gray-300 bg-red-500 text-red-500 focus:ring-indigo-500"
            />
            <input
              checked={watch('color') === BLUE}
              id={BLUE}
              value={BLUE}
              onChange={(e) =>
                handleColorChange(e.target.value as InventoryColor)
              }
              aria-describedby="checkbox-color"
              type="checkbox"
              className="mr-3 h-6  w-6 rounded border-gray-300 bg-blue-400 text-blue-400 focus:ring-indigo-500"
            />
            <input
              checked={watch('color') === ORANGE}
              id={ORANGE}
              value={ORANGE}
              onChange={(e) =>
                handleColorChange(e.target.value as InventoryColor)
              }
              aria-describedby="checkbox-color"
              type="checkbox"
              className="mr-3 h-6  w-6 rounded border-gray-300 bg-orange-500 text-orange-500 focus:ring-indigo-500"
            />
            <input
              checked={watch('color') === GRAY}
              id={GRAY}
              value={GRAY}
              onChange={(e) =>
                handleColorChange(e.target.value as InventoryColor)
              }
              aria-describedby="checkbox-color"
              type="checkbox"
              className="mr-3 h-6  w-6 rounded border-gray-300 bg-gray-500 text-gray-500 focus:ring-indigo-500"
            />
            <input
              checked={watch('color') === BLACK}
              id={BLACK}
              value={BLACK}
              onChange={(e) =>
                handleColorChange(e.target.value as InventoryColor)
              }
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
        <LinkButton
          type="submit"
          style="secondary"
          className="flex w-full justify-center"
        >
          Valider
        </LinkButton>
      </div>
    </form>
  );
};
export default EditInventoryForm;
