import {
  CheckCircleIcon,
  PhoneIcon,
  PlayIcon,
} from '@heroicons/react/20/solid';
import type { FC } from 'react';

import { mainRoutes } from '@/routes/mainRoutes';

import { services } from '../Header/services';

export const callsToAction = [
  { name: 'Regarder une démo', href: '#', icon: PlayIcon },
  {
    name: 'Commencer à utiliser Stock Shop',
    href: mainRoutes.register.path,
    icon: CheckCircleIcon,
  },
  { name: 'Nous contacter', href: mainRoutes.contact.path, icon: PhoneIcon },
];

const MobileServicesButton: FC = () => {
  return (
    <div className="mx-auto grid max-w-7xl gap-y-6 px-4 py-6 lg:grid-cols-4 lg:gap-8 lg:p-8 lg:px-6 lg:py-12 xl:py-16">
      {services.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="-m-3 flex flex-col justify-between rounded-lg p-3 hover:bg-gray-50"
        >
          <div className="flex md:h-full lg:flex-col">
            <div className="shrink-0">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary-500 text-white sm:h-12 sm:w-12">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <div className="ml-4 md:flex md:flex-1 md:flex-col md:justify-between lg:ml-0 lg:mt-4">
              <div>
                <p className="text-base font-medium text-gray-900">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
              <p className="mt-2 text-sm font-medium text-primary-600 lg:mt-4">
                Learn more
                <span aria-hidden="true"> &rarr;</span>
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default MobileServicesButton;
