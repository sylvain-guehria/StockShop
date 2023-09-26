'use-client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { useToast } from '@/hooks/useToast';
import { addContact } from '@/sendinblue/SendinblueService';

import { validationSchema } from './NewsLetterFormValidation';

type NewsLetterIncentiveFormType = {
  email: string;
};

const NewsLetterIncentiveForm = () => {
  const toast = useToast(60000);
  const formOptions = {
    resolver: yupResolver(validationSchema),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsLetterIncentiveFormType>(formOptions);

  const onSubmitForm: SubmitHandler<NewsLetterIncentiveFormType> = async (
    data,
  ) => {
    try {
      await addContact({ email: data.email, listIds: [1] });
    } catch (e: any) {
      toast(ToasterTypeEnum.ERROR, e.message);
      return;
    }
    toast(ToasterTypeEnum.SUCCESS, 'Merci pour votre inscription !');
  };

  return (
    <form
      className="mt-4 sm:mt-6 sm:flex"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <label htmlFor="email-address" className="sr-only">
        Email address
      </label>
      <div className="block">
        <input
          id="email-address"
          {...register('email')}
          type="text"
          placeholder="votre-email@gmail.com"
          className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 shadow-sm placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
        <div className="text-sm text-red-600">{errors.email?.message}</div>
      </div>

      <div className="mt-3 sm:ml-4 sm:mt-0 sm:shrink-0">
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white"
        >
          S&apos;inscrire
        </button>
      </div>
    </form>
  );
};

export default NewsLetterIncentiveForm;
