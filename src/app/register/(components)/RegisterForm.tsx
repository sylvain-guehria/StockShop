'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Providers from '@/components/layouts/Providers';
import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { useToast } from '@/hooks/useToast';
import supabase from '@/supabase/client/supabase-browser';
import { registerWithEmailUseCase } from '@/usecases/usecases';

import { validationSchema } from './RegisterFormValidation';

interface RegisterFormType {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}
const RegisterForm = () => {
  const toast = useToast(4000);

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>(formOptions);

  const onSubmit: SubmitHandler<RegisterFormType> = async (
    data: RegisterFormType
  ) => {
    const { email, password } = data;
    try {
      const response = await registerWithEmailUseCase({
        email,
        password,
        supabase,
      });
      if (response.data.user) {
        toast(
          ToasterTypeEnum.SUCCESS,
          'un email envoyé de confirmation vous  a été envoyé'
        );
      }
      if (response.error) {
        toast(ToasterTypeEnum.ERROR, response.error.message);
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('error RegisterForm', error);
      toast(ToasterTypeEnum.ERROR, error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Adresse Email
        </label>
        <div className="mt-1">
          <input
            id="email"
            {...register('email')}
            type="text"
            autoComplete="email"
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div className="text-sm text-red-600">{errors.email?.message}</div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Mot de passe
        </label>
        <div className="mt-1">
          <input
            id="password"
            {...register('password')}
            type="password"
            autoComplete="current-password"
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div className="text-sm text-red-600">{errors.password?.message}</div>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirmer mot de passe
        </label>
        <div className="mt-1">
          <input
            id="confirmPassword"
            {...register('confirmPassword')}
            type="password"
            autoComplete="new-password"
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div className="text-sm text-red-600">
          {errors.confirmPassword?.message}
        </div>
      </div>
      {/* 
      {errorMessage && (
        <div className="text-sm text-red-600">{errorMessage}</div>
      )} */}

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="acceptTerms"
            {...register('acceptTerms')}
            type="checkbox"
            className="mr-3 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label className="cursor-pointer text-sm font-medium text-primary-600 hover:text-primary-500">
            Accepter les termes
          </label>
        </div>
        <div className="text-sm text-red-600">
          {errors.acceptTerms?.message}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          S&apos;inscrire
        </button>
      </div>
    </form>
  );
};

const RegisterFormWithProviders = () => (
  <Providers>
    <RegisterForm />
  </Providers>
);

export default RegisterFormWithProviders;