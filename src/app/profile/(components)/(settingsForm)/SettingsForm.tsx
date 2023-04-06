import { Switch } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { logException } from 'logger';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import LinkButton from '@/components/lib/LinkButton/LinkButton';
import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import UserEntity from '@/modules/user/UserEntity';
import { updateUserUseCase } from '@/usecases/usecases';

import { validationSchema } from './SettingsFormValidation';

type SettingsFormType = {
  hasInventoryManagementServiceActivated: boolean;
};

const SettingsForm: FC = () => {
  const toast = useToast(10000);
  const { user, setUser } = useAuth();

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      hasInventoryManagementServiceActivated: user.isSeller(),
    },
  };

  const { register, handleSubmit, watch, setValue } =
    useForm<SettingsFormType>(formOptions);

  register('hasInventoryManagementServiceActivated', { required: true });

  const hasInventoryManagementServiceActivated = watch(
    'hasInventoryManagementServiceActivated'
  );

  const { mutate, isLoading } = useMutation({
    mutationFn: (userParam: UserEntity) => updateUserUseCase(userParam),

    onSuccess: () => {
      setUser(UserEntity.new(user));
      toast(ToasterTypeEnum.SUCCESS, 'Vos informations ont été mises à jour');
    },

    onError: (error: any) => {
      logException(error, { when: 'SettingsForm' });
      toast(ToasterTypeEnum.ERROR, error.message);
    },
  });

  const onSubmit: SubmitHandler<SettingsFormType> = async () => {
    if (hasInventoryManagementServiceActivated) {
      user.activateSockManagement();
    } else {
      user.desActivateSockManagement();
    }

    mutate(user);
  };

  const changeHasInventoryManagementServiceActivated = () => {
    setValue(
      'hasInventoryManagementServiceActivated',
      !hasInventoryManagementServiceActivated
    );
  };

  return (
    <form
      className="divide-y divide-gray-200 p-3 px-6 lg:col-span-9"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Switch.Group as="li" className="flex items-center justify-between py-4">
        <div className="flex flex-col">
          <Switch.Label
            as="p"
            className="text-sm font-medium text-gray-900"
            passive
          >
            Activer le module de gestion des stocks
          </Switch.Label>
          <Switch.Description className="text-sm text-gray-500">
            Un fois ce module activé, vous pourrez gérer les stocks de vos
            produits en cliquant sur le bouton &quot;Gestion inventaire&quot; du
            menu Services. Désactiver ce module n&apos;efface pas vos données.
          </Switch.Description>
        </div>
        <Switch
          checked={hasInventoryManagementServiceActivated}
          onChange={changeHasInventoryManagementServiceActivated}
          className={clsx(
            hasInventoryManagementServiceActivated
              ? 'bg-primary-500'
              : 'bg-gray-200',
            'relative ml-4 inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
          )}
        >
          <span
            aria-hidden="true"
            className={clsx(
              hasInventoryManagementServiceActivated
                ? 'translate-x-5'
                : 'translate-x-0',
              'inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
      </Switch.Group>
      <div className="mt-4 flex justify-end p-4 sm:px-6">
        <LinkButton isLoading={isLoading} type="submit">
          Enregistrer
        </LinkButton>
      </div>
    </form>
  );
};
export default SettingsForm;
