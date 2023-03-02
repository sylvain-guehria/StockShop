'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Providers from '@/components/layouts/Providers';
import Input from '@/components/lib/inputs/Input';
import LinkButton from '@/components/lib/LinkButton/LinkButton';
import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { useToast } from '@/hooks/useToast';
import supabase from '@/supabase/client/supabase-browser';
import { getURL } from '@/usecases/auth/authUtils';

import { validationSchema } from './ResetPasswordFormValidation';

interface LoginFormType {
  email: string;
  password: string;
  rememberMe: boolean;
}

const ResetPasswordForm = () => {
  const toast = useToast(10000);
  const [isLoading, setIsLoading] = useState(false);
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormType>(formOptions);

  const onSubmit: SubmitHandler<LoginFormType> = async (
    data: LoginFormType
  ) => {
    const { email } = data;
    setIsLoading(true);
    try {
      const response = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: getURL(),
      });
      if (response.data) {
        toast(ToasterTypeEnum.SUCCESS, 'Email envoyé');
        reset();
      }
      if (response.error) {
        toast(ToasterTypeEnum.ERROR, response.error.message);
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('error ResetPasswordForm', error);
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
        <LinkButton
          type="submit"
          className="w-full justify-center "
          style="secondary"
          isLoading={isLoading}
        >
          Recevoir un email
        </LinkButton>
      </div>
    </form>
  );
};

const ResetPasswordFormWithProviders = () => (
  <Providers>
    <ResetPasswordForm />
  </Providers>
);

export default ResetPasswordFormWithProviders;
