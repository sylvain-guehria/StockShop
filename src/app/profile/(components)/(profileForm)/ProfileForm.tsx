import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { logException } from 'logger';
import type { FC } from 'react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Input from '@/components/lib/inputs/Input';
import LinkButton from '@/components/lib/LinkButton/LinkButton';
import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import UserEntity from '@/modules/user/UserEntity';
import { updateUserUseCase } from '@/usecases/usecases';

import { validationSchema } from './ProfileFormValidation';

type ProfileFormType = {
  username: string;
  firstName: string;
  lastName: string;
};

const ProfileForm: FC = () => {
  const [errorUserNameExist, setErrorUserNameExist] = useState(false);
  const toast = useToast(10000);
  const { user, setUser } = useAuth();

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: user.getUsername(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormType>(formOptions);

  const { mutate, isLoading } = useMutation({
    mutationFn: (userParam: UserEntity) => updateUserUseCase(userParam),

    onSuccess: () => {
      setUser(UserEntity.new(user));
      toast(ToasterTypeEnum.SUCCESS, 'Vos informations ont été mises à jour');
    },

    onError: (error: any) => {
      logException(error, { when: 'ProfileForm' });
      if (error.message === 'UserName already exists') {
        setErrorUserNameExist(true);
      } else {
        toast(ToasterTypeEnum.ERROR, error.message);
      }
    },
  });

  const onSubmit: SubmitHandler<ProfileFormType> = async (
    data: ProfileFormType,
  ) => {
    const { username, firstName, lastName } = data;
    user.setLastName(lastName);
    user.setFirstName(firstName);
    user.setUserName(username);

    mutate(user);
  };

  return (
    <form
      className="divide-y divide-gray-200 lg:col-span-9"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="px-4 py-6 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Profil
          </h2>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row">
          <div className="grow space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nom d&apos;utilisateur
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex w-2/5 items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  inventory-market.com/
                </span>
                <input
                  type="text"
                  maxLength={20}
                  {...register('username')}
                  id="username"
                  autoComplete="username"
                  className="block w-full min-w-0 grow rounded-none rounded-r-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <p className="text-center text-sm text-red-600">
                {errors.username?.message}
              </p>
              {errorUserNameExist && (
                <p className="text-center text-sm text-red-600">
                  Ce nom d&apos;utilisateur est déjà utilisé.
                </p>
              )}
            </div>

            <div className="flex justify-between">
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Prénom
                </label>
                <Input
                  type="text"
                  maxLength={30}
                  name="firstName"
                  register={register('firstName')}
                  inputClassName="block w-full min-w-0 grow rounded-none rounded-r-md"
                />
                <p className="text-sm text-red-600">
                  {errors.firstName?.message}
                </p>
              </div>

              <div className="ml-2 w-full">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom
                </label>
                <Input
                  type="text"
                  maxLength={30}
                  name="lastName"
                  register={register('lastName')}
                  inputClassName="block w-full min-w-0 grow rounded-none rounded-r-md"
                />
                <p className="text-sm text-red-600">
                  {errors.lastName?.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end p-4 sm:px-6">
        <LinkButton isLoading={isLoading} type="submit">
          Enregistrer
        </LinkButton>
      </div>
      {/* <PrivacySection /> */}
    </form>
  );
};
export default ProfileForm;
