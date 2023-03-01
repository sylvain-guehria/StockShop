'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Providers from '@/components/layouts/Providers';
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
  const toast = useToast(4000);

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
    try {
      const response = await signInWithEmail(email);
      if (response.error) {
        toast(ToasterTypeEnum.ERROR, response.error.message);
      }
      if (response.data) {
        toast(
          ToasterTypeEnum.SUCCESS,
          'Un email de connexion vous a été envoyé. Attention, il peut se trouver dans vos spams.'
        );
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('error MagikLinkForm', error);
      toast(ToasterTypeEnum.ERROR, error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <div className="mt-1">
          <input
            id="email"
            {...register('email')}
            type="text"
            autoComplete="email"
            placeholder="votre-email@exemple.com"
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div className="text-sm text-red-600">{errors.email?.message}</div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Recevoir le lien par email
        </button>
      </div>
    </form>
  );
};

const LoginWithMagikLinkWithProviders = () => (
  <Providers>
    <LoginWithMagikLinkForm />
  </Providers>
);

export default LoginWithMagikLinkWithProviders;
