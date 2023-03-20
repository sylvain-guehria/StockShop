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

import { validationSchema } from './MagikLinkFormValidation';

async function signInWithEmail(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: getURL(),
    },
  });
  return { data, error };
}

const LoginWithMagikLinkForm = () => {
  const toast = useToast(10000);
  const [isLoading, setIsLoading] = useState(false);

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>(formOptions);

  const onSubmit: SubmitHandler<{ email: string }> = async (data: {
    email: string;
  }) => {
    const { email } = data;
    setIsLoading(true);
    try {
      const response = await signInWithEmail(email);
      if (response.error) {
        toast(ToasterTypeEnum.ERROR, response.error.message);
      }
      if (response.data) {
        toast(
          ToasterTypeEnum.SUCCESS,
          'Un email de connexion vous a été envoyé. Pensez à vérifier vos spams.'
        );
      }
    } catch (error: any) {
      logException(error, { when: 'MagikLinkForm' });
      toast(ToasterTypeEnum.ERROR, error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center text-base text-gray-600">
        Demander un lien de connexion par email
      </div>
      <div>
        <div className="mt-1">
          <Input
            name="email"
            register={register('email')}
            type="text"
            placeholder="votre-email@exemple.com"
          />
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
          Recevoir le lien
        </LinkButton>
      </div>
    </form>
  );
};

export default LoginWithMagikLinkForm;
