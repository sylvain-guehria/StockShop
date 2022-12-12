import { MegaphoneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { FC } from 'react';

type Props = {
  setIsBetaBannerOpen: (value: boolean) => void;
};

const NewsBanner: FC<Props> = ({ setIsBetaBannerOpen }) => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pb-2 sm:pb-5">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-primary-600 p-2 shadow-lg sm:p-3">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex w-0 flex-1 items-center">
              <span className="flex rounded-lg bg-primary-700 p-2">
                <MegaphoneIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </span>
              <p className="ml-3 font-medium text-white">
                <span>
                  Bienvenue ! Ce site est en version beta. Nous comptons sur vos
                  retours pour le faire évoluer selon vos envies.
                </span>
              </p>
            </div>
            <div className="order-3 mt-2 flex w-full shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
              <Link href="/contact">
                <div className="mr-3 flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-primary-600 shadow-sm">
                  Faire un retour
                </div>
              </Link>
              <Link href="/roadmap">
                <div className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-primary-600 shadow-sm">
                  Voir la roadmap
                </div>
              </Link>
            </div>
            <div className="order-2 shrink-0 sm:order-3 sm:ml-2">
              <button
                type="button"
                className="-mr-1 flex rounded-md p-2 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                  onClick={() => setIsBetaBannerOpen(false)}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsBanner;
