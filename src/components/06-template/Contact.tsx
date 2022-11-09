import Image from 'next/image';
import ContactImg from 'public/assets/images/contact.png';

import { contactEmail } from '@/constants/emails';

import { Section } from '../04-lib/layout/Section';
import ContactForm from '../09-forms/contact/ContactForm';

const Contact = () => {
  return (
    <div className="bg-white">
      <main>
        {/* Header */}
        <div className="bg-gray-100">
          <Section yPadding="pt-10 pb-5">
            <div className="mx-auto max-w-md pl-4 pr-8 sm:max-w-lg sm:px-6 lg:max-w-7xl lg:px-8">
              <h1 className="text-center text-3xl font-bold leading-10 tracking-tight text-gray-900 sm:text-5xl sm:leading-none lg:text-5xl">
                Contactez-nous
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-center text-xl leading-normal text-gray-500">
                Que ce soit pour un feedback, un question ou pour faire remonter
                un bug, nous serons ravis de vous répondre.
              </p>
            </div>
          </Section>
        </div>

        {/* Contact Section */}
        <div className="relative bg-white">
          <div className="lg:absolute lg:inset-0 ">
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="h-full w-full object-cover lg:absolute">
                <Image
                  src={ContactImg}
                  alt="Zanzi illustrations from getillustrations.com"
                />
              </div>
            </div>
          </div>
          <div className="relative py-16 px-4 sm:py-24 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:px-8 lg:py-32">
            <div className="lg:pr-8">
              <div className="mx-auto max-w-md  sm:max-w-lg lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Rentrons en contact
                </h2>
                <p className="mt-4 text-lg text-gray-500 sm:mt-3">
                  On adorerait avoir de vos nouvelles ! Envoyez nous un message
                  via le formulaire ci-dessous, ou envoyez nous directement un
                  email à{' '}
                  <a
                    className="text-primary-600"
                    href={`mailto: ${contactEmail}`}
                  >
                    {contactEmail}
                  </a>
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Contact;
