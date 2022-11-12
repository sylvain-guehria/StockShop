'use client';

import { Menu, Transition } from '@headlessui/react';
import {
  ArrowsPointingInIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import { Fragment, useState } from 'react';

import type { Inventory } from '@/modules/inventory/inventoryType';

const DynamicModal = dynamic(() => import('../../04-lib/modal/Modal'), {
  suspense: true,
});

const DynamicEditInventoryForm = dynamic(
  () => import('../editInventoryForm/EditInventoryForm'),
  {
    suspense: true,
  }
);

type Props = {
  inventories: Inventory[];
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const PinnedInventories: FC<Props> = ({ inventories }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(inventories[0]);

  const handleEditModalOpen = (inventory: Inventory) => {
    setSelectedInventory(inventory);
    setIsEditModalOpen(true);
  };
  return (
    <>
      {isEditModalOpen && (
        <DynamicModal open={isEditModalOpen} setOpen={setIsEditModalOpen}>
          <DynamicEditInventoryForm
            inventory={selectedInventory as Inventory}
          />
        </DynamicModal>
      )}
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
                'bg-primary-400',
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
                <Menu.Button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
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
                  <Menu.Items className="absolute top-14 right-1 z-10 mx-3 mt-1 w-auto rounded-md bg-white shadow-lg ring-1 ring-black/5">
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'flex px-4 py-3 text-sm cursor-pointer justify-between'
                          )}
                          onClick={() => handleEditModalOpen(inventory)}
                        >
                          Editer
                          <PencilIcon
                            className="ml-3 h-5 w-5 shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'px-4 py-3 text-sm cursor-pointer flex justify-between'
                          )}
                        >
                          Supprimer
                          <TrashIcon
                            className="ml-3 h-5 w-5 shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'px-4 py-3 text-sm cursor-pointer flex justify-between'
                          )}
                        >
                          Inventaire par défaut
                          <ArrowsPointingInIcon
                            className="ml-3 h-5 w-5 shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default PinnedInventories;
