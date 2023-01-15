'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import supabase from 'supabase/client/supabase-browser';

import { ToasterTypeEnum } from '@/components/08-toaster/toasterEnum';
import { useToast } from '@/hooks/useToast';
import { mainRoutes } from '@/routes/mainRoutes';
import { loginWithEmailUseCase } from '@/usecases/usecases';

import { validationSchema } from './LoginFormValidation';

interface LoginFormType {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginEmailForm = () => {
  const toast = useToast(4000);
  const router = useRouter();
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>(formOptions);

  const onSubmit: SubmitHandler<LoginFormType> = async (
    data: LoginFormType
  ) => {
    const { email, password } = data;
    try {
      const response = await loginWithEmailUseCase({
        email,
        password,
        supabase,
      });
      // eslint-disable-next-line no-console
      console.log('response LoginEmailForm', response);
      router.push(mainRoutes.home.path);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('error LoginEmailForm', error);
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

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="rememberMe"
            {...register('rememberMe')}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label
            htmlFor="rememberMe"
            className="ml-2 block text-sm text-gray-900"
          >
            Se souvenir de moi
          </label>
        </div>

        <div className="text-sm">
          <div className="cursor-pointer font-medium text-primary-600 hover:text-primary-500">
            <Link href={mainRoutes.resetPassword.path}>
              {mainRoutes.resetPassword.label}
            </Link>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Se connecter
        </button>
      </div>
    </form>
  );
};
export default LoginEmailForm;
