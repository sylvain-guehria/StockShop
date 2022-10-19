import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Fragment } from 'react';

import { mainRoutes } from '@/routes/mainRoutes';
import { marketpalceRoutes } from '@/routes/marketpalceRoutes';

import ServicesButton from '../Popovers/ServicesButton';
import { services } from './services';

export default function Header() {
  return (
    <Popover className="relative bg-white">
      <div
        className="pointer-events-none absolute inset-0 z-30 shadow"
        aria-hidden="true"
      />
      <div className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 sm:py-4 md:justify-start md:space-x-10 lg:px-8">
          <Link href={mainRoutes.home.path}>
            <a href="#">
              <span className="sr-only">Your Company</span>
              <img
                className="h-11 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=700"
                alt=""
              />
            </a>
          </Link>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
            <Popover.Group as="nav" className="flex space-x-10">
              <ServicesButton services={services} />
              <Link href={mainRoutes.pricing.path}>
                <a
                  href="#"
                  className="text-base font-medium text-gray-600 hover:text-gray-900"
                >
                  {mainRoutes.pricing.label}
                </a>
              </Link>
              <Link href={marketpalceRoutes.marketplace.path}>
                <a
                  href="#"
                  className="text-base font-medium text-gray-600 hover:text-gray-900"
                >
                  {marketpalceRoutes.marketplace.label}
                </a>
              </Link>
              {/* <MoreButton /> */}
            </Popover.Group>
            <div className="flex items-center md:ml-12">
              <Link href={mainRoutes.login.path}>
                <a
                  href="#"
                  className="text-base font-medium text-gray-600 hover:text-gray-900"
                >
                  {mainRoutes.login.label}
                </a>
              </Link>
              <Link href={mainRoutes.register.path}>
                <a
                  href="#"
                  className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-600"
                >
                  {mainRoutes.register.label}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-30 origin-top-right p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black/5">
            <div className="px-5 pt-5 pb-6 sm:pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=primary&shade=600"
                    alt="Your Company"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <nav>
                  <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                    {services.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-500 text-white sm:h-12 sm:w-12">
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="ml-4 text-base font-medium text-gray-900">
                          {item.name}
                        </div>
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Nous contacter
                </a>
                <a
                  href="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  XXX
                </a>
                <a
                  href="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  XXX
                </a>
                <a
                  href="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  XXX
                </a>
                <a
                  href="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  XXX
                </a>
              </div>
              <div className="mt-6">
                <Link href={mainRoutes.register.path}>
                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700"
                  >
                    {mainRoutes.register.label}
                  </a>
                </Link>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Déjà inscrit ?{' '}
                  <Link href={mainRoutes.login.path}>
                    <a
                      href="#"
                      className="text-primary-600 hover:text-primary-500"
                    >
                      {mainRoutes.login.label}
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
