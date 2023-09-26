'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { logException } from 'logger';
import Link from 'next/link';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Input from '@/components/lib/inputs/Input';
import LinkButton from '@/components/lib/LinkButton/LinkButton';
import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { useToast } from '@/hooks/useToast';
import { mainRoutes } from '@/routes/mainRoutes';

import { validationSchema } from './LoginFormValidation';

interface LoginFormType {
  email: string;
  password: string;
}

const LoginEmailForm = () => {
  const toast = useToast(10000);
  const [isLoading, setIsLoading] = useState(false);
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>(formOptions);

  const { mutate } = useMutation({
    mutationFn: ({ email, password }: LoginFormType) =>
      fetch('/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }).then((res) => res.json()),

    onSuccess: (response) => {
      // Success of the query but not of the login (else it redirects)
      setIsLoading(false);
      toast(ToasterTypeEnum.ERROR, response.message);
    },
    onError: (error: Error) => {
      setIsLoading(false);
      logException(error, { when: 'LoginEmailForm' });
      toast(ToasterTypeEnum.ERROR, error.message);
    },
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (
    data: LoginFormType,
  ) => {
    setIsLoading(true);
    const { email, password } = data;
    mutate({
      email,
      password,
    });
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

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <div className="cursor-pointer font-medium text-primary-600 hover:text-primary-500">
            <Link href={mainRoutes.resetPassword.path}>
              {mainRoutes.resetPassword.label}
            </Link>
          </div>
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
          Se connecter
        </LinkButton>
      </div>
    </form>
  );
};

export default LoginEmailForm;
