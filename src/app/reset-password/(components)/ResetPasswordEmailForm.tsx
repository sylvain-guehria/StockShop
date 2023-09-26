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
import { getURL } from '@/usecases/auth/authUtils';

import { validationSchema } from './ResetPasswordEmailFormValidation';

interface ResetPasswordEmailFormType {
  email: string;
}

const ResetPasswordEmailForm = () => {
  const toast = useToast(10000);
  const [isLoading, setIsLoading] = useState(false);
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordEmailFormType>(formOptions);

  const onSubmit: SubmitHandler<ResetPasswordEmailFormType> = async (
    data: ResetPasswordEmailFormType,
  ) => {
    const { email } = data;
    setIsLoading(true);
    try {
      const response = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${getURL()}?no-redirect=true`,
      });
      if (response.data) {
        toast(ToasterTypeEnum.SUCCESS, 'Email envoyé');
        reset();
      }
      if (response.error) throw new Error(response.error.message);
    } catch (error: any) {
      logException(error, { when: 'ResetPasswordEmailForm' });
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

export default ResetPasswordEmailForm;
