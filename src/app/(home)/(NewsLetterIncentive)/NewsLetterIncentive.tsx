import Link from 'next/link';

import Section from '@/components/04-lib/layout/Section';
import { mainRoutes } from '@/routes/mainRoutes';

import NewsLetterIncentiveForm from './NewsLetterIncentiveForm';

const GetEarlyAccessIncentive = () => {
  return (
    <Section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 xl:gap-x-8">
          <div className="flex items-center rounded-lg bg-gray-200 p-6 sm:p-10">
            <div className="mx-auto max-w-sm">
              <h3 className="font-semibold text-gray-900">
                Inscrivez vous à notre future newsletter
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Celle-ci vous informera des nouveautés et des mise à jour de
                notre site.
              </p>
              <NewsLetterIncentiveForm />
            </div>
          </div>

          <div className="relative mt-6 flex items-center py-12 px-6 sm:py-16 sm:px-10 lg:mt-0">
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <img
                src="https://tailwindui.com/img/ecommerce-images/footer-02-exclusive-sale.jpg"
                alt=""
                className="h-full w-full object-cover object-center saturate-0"
              />
              <div className="absolute inset-0 bg-primary-600/90" />
            </div>
            <div className="relative mx-auto max-w-sm text-center">
              <h3 className="text-2xl font-bold tracking-tight text-white">
                Soyez les premiers
              </h3>
              <p className="mt-2 text-gray-200">
                Les utilisateurs qui utilisent l&apos;application de gestion des
                stocks et qui sont inscrits à la newsletter auront un compte
                premium gratuit à vie.{'  '}
                <Link
                  href={mainRoutes.login.path}
                  className="whitespace-nowrap font-bold text-white hover:text-gray-200"
                >
                  Je crée mon compte<span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default GetEarlyAccessIncentive;
