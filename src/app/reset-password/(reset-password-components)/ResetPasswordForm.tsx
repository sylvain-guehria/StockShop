'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { logException } from 'logger';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Input from '@/components/lib/inputs/Input';
import LinkButton from '@/components/lib/LinkButton/LinkButton';
import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { useToast } from '@/hooks/useToast';
import type { Database } from '@/types/supabase';

import { validationSchema } from './ResetPasswordFormValidation';

interface ResetPasswordFormType {
  password: string;
}

const ResetPasswordForm = () => {
  const toast = useToast(10000);
  const [isLoading, setIsLoading] = useState(false);
  const formOptions = { resolver: yupResolver(validationSchema) };
  const supabase = createClientComponentClient<Database>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormType>(formOptions);

  const onSubmit: SubmitHandler<ResetPasswordFormType> = async (
    data: ResetPasswordFormType,
  ) => {
    const { password } = data;
    setIsLoading(true);
    try {
      const response = await supabase.auth.updateUser({
        password,
      });
      if (response.data) {
        toast(ToasterTypeEnum.SUCCESS, 'Votre mot de passe a été changé');
      }
      if (response.error) throw new Error(response.error.message);
    } catch (error: any) {
      logException(error, { when: 'ResetPasswordForm' });
      toast(ToasterTypeEnum.ERROR, error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <LinkButton
          type="submit"
          className="w-full justify-center "
          style="secondary"
          isLoading={isLoading}
        >
          Changez le mot de passe
        </LinkButton>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
