import { Popover, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  CheckCircleIcon,
  ChevronDownIcon,
  PhoneIcon,
  PlayIcon,
} from '@heroicons/react/20/solid';
import clsx from 'clsx';
import type { FC } from 'react';
import { Fragment } from 'react';

import { mainRoutes } from '@/routes/mainRoutes';

import { services } from '../../layouts/(header)/services';

export const callsToAction = [
  { name: 'Regarder une démo', href: '#', icon: PlayIcon },
  {
    name: 'Commencer à utiliser Inventory Market',
    href: mainRoutes.register.path,
    icon: CheckCircleIcon,
  },
  { name: 'Nous contacter', href: mainRoutes.contact.path, icon: PhoneIcon },
  { name: 'Voir la roadmap', href: mainRoutes.roadmap.path, icon: Bars3Icon },
];

const ServicesButton: FC = () => {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            className={clsx(
              open ? 'text-gray-900' : 'text-gray-600',
              'group inline-flex items-center rounded-md text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
            )}
          >
            <span>Services</span>
            <ChevronDownIcon
              className={clsx(
                open ? 'text-gray-600' : 'text-gray-400',
                'ml-2 h-5 w-5 group-hover:text-gray-600'
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            <Popover.Panel className="absolute inset-x-0 top-full z-10 hidden bg-white shadow-lg md:block">
              <div className="mx-auto grid max-w-7xl gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
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
                          <p className="mt-1 text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                        <p className="mt-2 text-sm font-medium text-primary-600 lg:mt-4">
                          {item.callToAction}
                          <span aria-hidden="true"> &rarr;</span>
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl space-y-6 px-4 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
                  {callsToAction.map((item) => (
                    <div key={item.name} className="flow-root">
                      <a
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                      >
                        <item.icon
                          className="h-6 w-6 shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3">{item.name}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ServicesButton;
