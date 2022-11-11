'use client';

import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';
import { Fragment } from 'react';

import type { Inventory } from '@/modules/inventory/inventoryType';

type Props = {
  inventories: Inventory[];
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const PinnedInventories: FC<Props> = ({ inventories }) => {
  return (
    <ul
      role="list"
      className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4"
    >
      {inventories.map((inventory) => (
        <li
          key={inventory.uid}
          className="relative col-span-1 flex rounded-md shadow-sm"
        >
          <div
            className={classNames(
              'bg-pink-600',
              'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
            )}
          >
            ID
          </div>
          <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-y border-r border-gray-200 bg-white">
            <div className="flex-1 truncate px-4 py-2 text-sm">
              <a
                href="#"
                className="font-medium text-gray-900 hover:text-gray-600"
              >
                {inventory.name}
              </a>
              <p className="text-gray-500">X Produit</p>
            </div>
            <Menu as="div" className="shrink-0 pr-2">
              <Menu.Button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-10 top-3 z-10 mx-3 mt-1 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          View
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Removed from pinned
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Share
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default PinnedInventories;
