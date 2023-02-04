'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import LinkButton from '@/components/lib/LinkButton/LinkButton';
import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { useToast } from '@/hooks/useToast';
import { addressEmails } from '@/sendinblue/emailConfig';
import { sendContactUsEmail } from '@/sendinblue/sender';

import Input from '../../../components/lib/inputs/Input';
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
        <Input
          type="text"
          name="fullName"
          label="Nom"
          register={register('fullName')}
        />
      </div>
      <div>
        <Input
          type="text"
          name="company"
          label="Entreprise"
          register={register('company')}
        />
      </div>
      <div className="sm:col-span-2">
        <div className="mt-1">
          <Input
            type="text"
            name="email"
            label="Email"
            help="Obligatoire"
            placeholder="email@gmail.com"
            register={register('email')}
            error={errors.email?.message}
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <div className="mt-1">
          <Input
            type="text"
            name="phone"
            label="Numéro de téléphone"
            aria-describedby="phone-description"
            register={register('phone')}
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <div className="flex justify-between">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Comment pouvons-nous vous aider ?
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
            placeholder="Feedback, questions, suggestions, etc."
            rows={4}
            maxLength={500}
            className="  block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
          <div className="text-sm text-red-600">{errors.message?.message}</div>
        </div>
      </div>
      <div className="sm:col-span-2">
        <Input
          type="text"
          name="soureOfHeard"
          label="Où nous avez vous connu?"
          register={register('soureOfHeard')}
          placeholder="Google, Facebook, Instagram, Bouch à oreille..."
        />
      </div>
      <div className="text-right sm:col-span-2">
        <LinkButton>Envoyer</LinkButton>
      </div>
    </form>
  );
};

export default ContactForm;
