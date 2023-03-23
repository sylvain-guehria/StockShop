'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { logException } from 'logger';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Input from '@/components/lib/inputs/Input';
import LinkButton from '@/components/lib/LinkButton/LinkButton';
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
  const toast = useToast(10000);
  const [isLoading, setIsLoading] = useState(false);
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>(formOptions);

  const onSubmit: SubmitHandler<RegisterFormType> = async (
    data: RegisterFormType
  ) => {
    setIsLoading(true);
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
          'Bienvenue, un email envoyé de confirmation vous  a été envoyé'
        );
      }
      if (response.error) throw new Error(response.error.message);
    } catch (error: any) {
      logException(error, { when: 'RegisterForm' });
      toast(ToasterTypeEnum.ERROR, error.message);
    } finally {
      setIsLoading(false);
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
          <Input name="email" register={register('email')} type="text" />
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
          <Input
            name="password"
            register={register('password')}
            type="password"
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
          <Input
            name="confirmPassword"
            register={register('confirmPassword')}
            type="password"
          />
        </div>
        <div className="text-sm text-red-600">
          {errors.confirmPassword?.message}
        </div>
      </div>

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
        <LinkButton
          type="submit"
          style="secondary"
          className="w-full justify-center"
          isLoading={isLoading}
          disabled={isLoading}
        >
          S&apos;inscrire
        </LinkButton>
      </div>
    </form>
  );
};

export default RegisterForm;
