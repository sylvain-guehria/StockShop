'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { auth, sendPasswordResetEmail } from 'firebaseFolder/clientApp';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { ToasterTypeEnum } from '@/components/08-toaster/toasterEnum';
import { useToast } from '@/hooks/useToast';

import { validationSchema } from './ResetPasswordFormValidation';

interface LoginFormType {
  email: string;
  password: string;
  rememberMe: boolean;
}

const ResetPasswordForm = () => {
  const toast = useToast(4000);
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>(formOptions);

  const onSubmit: SubmitHandler<LoginFormType> = async (
    data: LoginFormType
  ) => {
    const { email } = data;
    try {
      await sendPasswordResetEmail(auth, email);
      toast(ToasterTypeEnum.SUCCESS, 'Email envoyé');
    } catch (error: any) {
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
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Recevoir un email.
        </button>
      </div>
    </form>
  );
};
export default ResetPasswordForm;
