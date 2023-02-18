'use client';

import { Disclosure } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const user = {
  name: 'Debbie Lewis',
  handle: 'deblewis',
  email: 'debbielewis@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80',
};
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Jobs', href: '#', current: false },
  { name: 'Applicants', href: '#', current: false },
  { name: 'Company', href: '#', current: false },
];

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
];

const color1 = '#583FD3';
const color2 = '#3B2A8C';
const color3 = '#2C2069';

const DisclosureSection = () => {
  return (
    <Disclosure as="div" className="relative overflow-hidden bg-sky-700 pb-32">
      {({ open }) => (
        <>
          <nav
            className={clsx(
              open ? 'bg-sky-900' : 'bg-transparent',
              'relative z-10 border-b border-teal-500/25 lg:border-none lg:bg-transparent'
            )}
          >
            <Disclosure.Panel className="bg-sky-900 lg:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={clsx(
                      item.current ? 'bg-black/25' : 'hover:bg-sky-800',
                      'block rounded-md py-2 px-3 text-base font-medium text-white'
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-sky-800 pt-4 pb-3">
                <div className="flex items-center px-4">
                  <div className="shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-sky-200">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto shrink-0 rounded-full p-1 text-sky-200 hover:bg-sky-800 hover:text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md py-2 px-3 text-base font-medium text-sky-200 hover:bg-sky-800 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </nav>
          <div
            aria-hidden="true"
            className={clsx(
              open ? 'bottom-0' : 'inset-y-0',
              'absolute inset-x-0 left-1/2 w-full -translate-x-1/2 overflow-hidden lg:inset-y-0'
            )}
          >
            <div className="absolute inset-0 flex">
              <div
                className="h-full w-1/2"
                style={{ backgroundColor: color2 }}
              />
              <div
                className="h-full w-1/2"
                style={{ backgroundColor: color2 }}
              />
            </div>
            <div className="relative flex justify-center">
              <svg
                className="shrink-0"
                width={1750}
                height={308}
                viewBox="0 0 1750 308"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                  fill={color1}
                />
                <path
                  d="M1465.84 308L16.816 0H1750v308h-284.16z"
                  fill={color2}
                />
                <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill={color2} />
                <path
                  d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                  fill={color3}
                />
              </svg>
            </div>
          </div>
          <header className="relative py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Settings
              </h1>
            </div>
          </header>
        </>
      )}
    </Disclosure>
  );
};

export default DisclosureSection;
