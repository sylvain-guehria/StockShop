import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';
import { Fragment, useState } from 'react';

import { categories } from '@/categoriesDatabase/categories';
import Input from '@/components/04-lib/inputs/Input';
import InputSelect from '@/components/04-lib/inputs/InputSelect';
import { getSubCategoriesByCategoryUidFromDatabase } from '@/modules/category/categoryUtils';
import { ProductAttributes } from '@/modules/product/productType';
import { classNames } from '@/utils/tailwindUtils';

type Props = {};

const sortingOptions = [
  { value: 'alphabetical', label: 'Ordre alphabétique' },
  { value: 'price', label: 'Prix' },
];

export const ProductsFilters: FC<Props> = () => {
  const [categoryUid, setCategoryUid] = useState<string>('');
  return (
    <div className="bg-white">
      <Disclosure
        as="section"
        aria-labelledby="filter-heading"
        className="grid items-center border-y border-gray-200"
      >
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>
        <div className="relative col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
            <div>
              <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                <FunnelIcon
                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                2 Filtres
              </Disclosure.Button>
            </div>
            <div className="pl-6">
              <button type="button" className="text-gray-500">
                Réinitiliser les filtres
              </button>
            </div>
          </div>
        </div>
        <Disclosure.Panel className="border-t border-gray-200 py-4">
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 px-6 sm:grid-cols-12 xl:grid-cols-10">
            <fieldset className="sm:col-span-4 xl:col-span-2">
              <legend className="block font-medium">Label</legend>
              <div>
                <Input
                  type="text"
                  name={ProductAttributes.LABEL}
                  inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </fieldset>
            <fieldset className="sm:col-span-4 xl:col-span-2">
              <legend className="block font-medium">Catégorie</legend>
              <div>
                <InputSelect
                  options={[
                    { label: '', value: '' },
                    ...categories.map((category) => ({
                      label: category.label,
                      value: category.uid,
                    })),
                  ]}
                  onChange={(e) => setCategoryUid(e.target.value)}
                  name={ProductAttributes.CATEGORY_UID}
                  inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </fieldset>
            <fieldset className="sm:col-span-4 xl:col-span-2">
              <legend className="block font-medium">Sous Catégorie</legend>
              <div>
                <InputSelect
                  options={[
                    { label: '', value: '' },
                    ...getSubCategoriesByCategoryUidFromDatabase(
                      categoryUid as string
                    ).map((subcategory) => ({
                      label: subcategory.label,
                      value: subcategory.uid,
                    })),
                  ]}
                  disabled={!categoryUid}
                  name={ProductAttributes.SUB_CATEGORY_UID}
                  inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </fieldset>
            <fieldset className="sm:col-span-3 xl:col-span-1">
              <legend className="block font-medium">TVA</legend>
              <div>
                <InputSelect
                  options={[
                    { label: '', value: '' },
                    { label: '20%', value: '20' },
                    { label: '10%', value: '10' },
                    { label: '5.5%', value: '5.5' },
                    { label: '2.1%', value: '2.1' },
                  ]}
                  name={ProductAttributes.TVA}
                  inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </fieldset>
            <fieldset className="sm:col-span-3 xl:col-span-1">
              <legend className="block font-medium">A acheter</legend>
              <div>
                <InputSelect
                  options={[
                    { label: '', value: '' },
                    { label: 'Oui', value: 'yes' },
                    { label: 'Non', value: 'no' },
                  ]}
                  name={ProductAttributes.TO_BUY}
                  inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </fieldset>
            <fieldset className="sm:col-span-3 xl:col-span-1">
              <legend className="block font-medium">Visibilité</legend>
              <div>
                <InputSelect
                  options={[
                    { label: '', value: '' },
                    { label: 'Privé', value: 'private' },
                    { label: 'Public', value: 'public' },
                  ]}
                  name={ProductAttributes.IS_PUBLIC}
                  inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </fieldset>
            <fieldset className="sm:col-span-3 xl:col-span-1">
              <legend className="block font-medium">Etat</legend>
              <div>
                <InputSelect
                  options={[
                    { label: '', value: '' },
                    { label: 'Neuf', value: 'new' },
                    { label: 'Occasion', value: 'used' },
                    { label: 'Reconditionné', value: 'refurbished' },
                  ]}
                  name={ProductAttributes.CONDITION}
                  inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </fieldset>
          </div>
        </Disclosure.Panel>
        <div className="col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
            <Menu as="div" className="relative inline-block">
              <div className="flex">
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Trier par
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
                  <div className="py-1">
                    {sortingOptions.map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <div
                            className={classNames(
                              option.value
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm cursor-pointer'
                            )}
                          >
                            {option.label}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </Disclosure>
    </div>
  );
};
