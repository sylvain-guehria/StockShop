import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';
import {
  AdjustmentsVerticalIcon,
  ArrowsUpDownIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline';
import type { Dispatch, FC } from 'react';
import { Fragment, useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { categories } from '@/categoriesDatabase/categories';
import InputSelect from '@/components/lib/inputs/InputSelect';
import LinkButton from '@/components/lib/LinkButton/LinkButton';
import { getSubCategoriesByCategoryIdFromDatabase } from '@/modules/category/categoryUtils';
import {
  ProductAttributes,
  ProductLabels,
} from '@/modules/product/productType';
import { classNames } from '@/utils/tailwindUtils';

import type {
  AuthorizedOrderProperty,
  FilterPropertyType,
  FiltersActionsType,
  FiltersStateType,
} from './ProductsFiltersReducer';
import { ActionNamesEnum, initialFilters } from './ProductsFiltersReducer';

const sortingOptions = [
  { value: ProductAttributes.LABEL, label: 'Ordre alphabétique' },
  {
    value: ProductAttributes.UPDATED_AT,
    label: ProductLabels[ProductAttributes.UPDATED_AT],
  },
  // {
  //   value: ProductAttributes.SELLING_PRICE,
  //   label: ProductLabels[ProductAttributes.SELLING_PRICE],
  // },
  // {
  //   value: ProductAttributes.BUYING_PRICE,
  //   label: ProductLabels[ProductAttributes.BUYING_PRICE],
  // },
  {
    value: ProductAttributes.QUANTITY_IN_INVENTORY,
    label: ProductLabels[ProductAttributes.QUANTITY_IN_INVENTORY],
  },
  // {
  //   value: ProductAttributes.OPTIMUM_QUANTITY,
  //   label: ProductLabels[ProductAttributes.OPTIMUM_QUANTITY],
  // },
  {
    value: ProductAttributes.TO_BUY,
    label: ProductLabels[ProductAttributes.TO_BUY],
  },
];

type Props = {
  filtersState: FiltersStateType;
  dispatchFilterActions: Dispatch<FiltersActionsType>;
};

export const ProductsFilters: FC<Props> = ({
  filtersState,
  dispatchFilterActions,
}) => {
  const formOptions = {
    defaultValues: initialFilters,
  };

  const { register, handleSubmit, watch, setValue, reset } =
    useForm<FilterPropertyType>(formOptions);

  const watchCategoryId = watch(ProductAttributes.CATEGORY_ID);

  const onSubmitFilterForm: SubmitHandler<FilterPropertyType> = async (
    data: FilterPropertyType
  ) => {
    dispatchFilterActions({
      type: ActionNamesEnum.SET_FILTERS,
      payload: { filters: data },
    });
  };

  useEffect(() => {
    setValue(ProductAttributes.SUB_CATEGORY_ID, '');
  }, [watchCategoryId]);

  const resetFilters = () => {
    reset();
    dispatchFilterActions({
      type: ActionNamesEnum.RESET_FILTERS,
    });
  };

  return (
    <div className="rounded-lg bg-white">
      <form onSubmit={handleSubmit(onSubmitFilterForm)}>
        <Disclosure
          as="section"
          aria-labelledby="filter-heading"
          className="grid items-center border-y border-gray-200"
        >
          <h2 id="filter-heading" className="sr-only">
            Filters
          </h2>
          <div className="relative col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-300 px-4 text-sm sm:px-6 lg:px-8">
              <div>
                <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                  <FunnelIcon
                    className="mr-2 h-4 w-4 flex-none text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  {
                    Object.values(filtersState.filters).filter(
                      (filter) => filter
                    ).length
                  }{' '}
                  Filtres
                </Disclosure.Button>
              </div>
              <div className="pl-6">
                <button
                  type="button"
                  className="group flex items-center font-medium text-gray-700"
                >
                  <div
                    className="tooltip tooltip-right"
                    data-tip="Réinitialiser les filtres"
                  >
                    <ArrowUturnLeftIcon className="mr-2 h-4 w-4 flex-none text-gray-400 group-hover:text-gray-500" />
                  </div>{' '}
                  <div className="hidden lg:contents" onClick={resetFilters}>
                    Réinitialiser filtres{' '}
                  </div>
                </button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="border-t border-gray-200 pb-4 pt-1">
            <div className="my-3 grid grid-cols-1 gap-y-6 gap-x-4 px-6 sm:grid-cols-12">
              <fieldset className="sm:col-span-3">
                <InputSelect
                  options={[
                    { label: '', value: '' },
                    ...categories.map((category) => ({
                      label: category.label,
                      value: category.id,
                    })),
                  ]}
                  label="Catégorie"
                  name={ProductAttributes.CATEGORY_ID}
                  register={register(ProductAttributes.CATEGORY_ID)}
                  inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </fieldset>
              <fieldset className="sm:col-span-3">
                <div>
                  <InputSelect
                    options={[
                      { label: '', value: '' },
                      ...getSubCategoriesByCategoryIdFromDatabase(
                        watchCategoryId as string
                      ).map((subcategory) => ({
                        label: subcategory.label,
                        value: subcategory.id,
                      })),
                    ]}
                    label="Sous catégorie"
                    disabled={!watchCategoryId}
                    name={ProductAttributes.SUB_CATEGORY_ID}
                    register={register(ProductAttributes.SUB_CATEGORY_ID)}
                    inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </fieldset>
              <fieldset className="sm:col-span-2">
                <div>
                  <InputSelect
                    label="A acheter"
                    options={[
                      { label: '', value: '' },
                      { label: 'Oui', value: 'true' },
                      { label: 'Non', value: 'false' },
                    ]}
                    name={ProductAttributes.TO_BUY}
                    register={register(ProductAttributes.TO_BUY)}
                    inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </fieldset>
              <fieldset className="sm:col-span-2">
                <div>
                  <InputSelect
                    label="Visibilité"
                    options={[
                      { label: '', value: '' },
                      { label: 'Privé', value: 'false' },
                      { label: 'Public', value: 'true' },
                    ]}
                    name={ProductAttributes.IS_PUBLIC}
                    register={register(ProductAttributes.IS_PUBLIC)}
                    inputClassName="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </fieldset>
              <div className="self-end text-right sm:col-span-2 sm:text-center">
                <LinkButton type="submit">
                  <div className="flex items-center font-medium">
                    <AdjustmentsVerticalIcon className="mr-2 h-4 w-4 flex-none text-primary-600" />
                    Filtrer
                  </div>
                </LinkButton>
              </div>
            </div>
          </Disclosure.Panel>
          <div className="col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
              <Menu as="div" className="relative inline-block">
                <div className="flex">
                  <div
                    className="tooltip tooltip-left cursor-pointer"
                    data-tip="Inverser l'ordre"
                    onClick={() =>
                      dispatchFilterActions({
                        type: ActionNamesEnum.CHANGE_SORTER_ORDER,
                      })
                    }
                  >
                    <ArrowsUpDownIcon
                      className="mr-3 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                  <Menu.Button className="group inline-flex justify-center border-x border-gray-300 px-3 text-sm  font-medium text-gray-700 hover:text-gray-900">
                    <div>Trier par</div>
                    <div className="tooltip tooltip-left" data-tip="Trier par">
                      <ChevronDownIcon
                        className="ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500 lg:-mr-1"
                        aria-hidden="true"
                      />
                    </div>
                  </Menu.Button>
                  <div className="ml-6 hidden text-sm font-medium text-gray-700 hover:text-gray-900 xl:inline-flex">
                    {
                      ProductLabels[
                        filtersState.sorter.field ||
                          ('' as keyof typeof ProductLabels)
                      ]
                    }
                  </div>
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
                                'block px-4 py-2 text-sm cursor-pointer',
                                option.value === filtersState.sorter.field
                                  ? 'bg-gray-200'
                                  : ''
                              )}
                              onClick={() =>
                                dispatchFilterActions({
                                  type: ActionNamesEnum.SET_SORTER_FIELD,
                                  payload: {
                                    sorterField:
                                      option.value as AuthorizedOrderProperty,
                                  },
                                })
                              }
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
      </form>
    </div>
  );
};
