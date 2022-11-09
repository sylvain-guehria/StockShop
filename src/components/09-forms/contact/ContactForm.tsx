'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import LinkButton from '@/components/04-lib/LinkButton/LinkButton';
import { ToasterTypeEnum } from '@/components/08-toaster/toasterEnum';
import { useToast } from '@/hooks/useToast';

import { validationSchema } from './ContactFormValidation';

interface ContactFormType {
  fullName: string;
  company: string;
  phone: string;
  message: string;
  soureOfHeard: string;
  email: string;
}

const ContactForm = () => {
  const toast = useToast(4000);
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormType>(formOptions);

  const onSubmit: SubmitHandler<ContactFormType> = async (
    data: ContactFormType
  ) => {
    const { fullName, company, phone, message, soureOfHeard } = data;
    try {
      // eslint-disable-next-line no-console
      console.log({ fullName, company, phone, message, soureOfHeard });
    } catch (error: any) {
      toast(ToasterTypeEnum.ERROR, error.message);
    }
  };

  return (
    <form
      className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700"
        >
          Nom
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="fullName"
            {...register('fullName')}
            autoComplete="given-name"
            className="  block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          Company
        </label>
        <div className="mt-1">
          <input
            type="text"
            {...register('company')}
            id="company"
            autoComplete="family-name"
            className="  block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <div className="flex justify-between">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <span id="phone-description" className="text-sm text-gray-500">
            Obligatoire
          </span>
        </div>
        <div className="mt-1">
          <input
            id="email"
            type="text"
            {...register('email')}
            autoComplete="email"
            className="  block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          <div className="text-sm text-red-600">{errors.email?.message}</div>
        </div>
      </div>
      <div className="sm:col-span-2">
        <div className="flex justify-between">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
        </div>
        <div className="mt-1">
          <input
            type="text"
            {...register('phone')}
            id="phone"
            autoComplete="tel"
            aria-describedby="phone-description"
            className="  block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <div className="flex justify-between">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Comment pouvez-vous nous aider ?
          </label>
          <span id="message-max" className="text-sm text-gray-500">
            Max. 500 characters
          </span>
        </div>
        <div className="mt-1">
          <textarea
            id="message"
            {...register('message')}
            aria-describedby="message-description"
            rows={4}
            className="  block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            defaultValue={''}
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="soureOfHeard"
          className="block text-sm font-medium text-gray-700"
        >
          Ou nous avez vous connu?
        </label>
        <div className="mt-1">
          <input
            type="text"
            {...register('soureOfHeard')}
            id="soureOfHeard"
            className="  block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            placeholder="Google, Facebook, Instagram, Bouch à oreille..."
          />
        </div>
      </div>
      <div className="text-right sm:col-span-2">
        <LinkButton>Envoyer</LinkButton>
      </div>
    </form>
  );
};
export default ContactForm;
