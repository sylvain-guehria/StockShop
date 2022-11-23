'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import LinkButton from '@/components/04-lib/LinkButton/LinkButton';
import { ToasterTypeEnum } from '@/components/08-toaster/toasterEnum';
import { useToast } from '@/hooks/useToast';
import { addressEmails } from '@/sendinblue/emailConfig';
import { sendContactUsEmail } from '@/sendinblue/sender';

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
  const toast = useToast(10000);
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormType>(formOptions);

  const onSubmit: SubmitHandler<ContactFormType> = async (
    data: ContactFormType
  ) => {
    const { fullName, company, phone, message, soureOfHeard, email } = data;
    try {
      await sendContactUsEmail({
        sender: {
          fullName,
          company,
          phone,
          soureOfHeard,
          email,
        },
        message,
      });
      toast(
        ToasterTypeEnum.SUCCESS,
        'Votre email à été envoyé, nous vous répondrons aussi vite que possible =)'
      );
      reset();
    } catch (error) {
      toast(
        ToasterTypeEnum.ERROR,
        `Il semble que nous ayons un problème avec notre serveur mail, veuillez envoyer un email directement à ${addressEmails.INENTORY_MARKET_FR}`
      );
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
            maxLength={500}
            className="  block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          <div className="text-sm text-red-600">{errors.message?.message}</div>
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
