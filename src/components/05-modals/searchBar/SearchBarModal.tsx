import { Dialog, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { FC } from 'react';
import { Fragment } from 'react';

import { getCurrentBreakpoint } from '@/utils/tailwindUtils';

type Props = {
  isSearchBarOpen: boolean;
  setIsSearchBarOpen: (isopen: boolean) => void;
};

const SearchBarModal: FC<Props> = ({ isSearchBarOpen, setIsSearchBarOpen }) => {
  // SEE =>  https://tailwindui.com/components/application-ui/navigation/command-palettes
  return (
    <Transition.Root show={isSearchBarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsSearchBarOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </Transition.Child>

        <div
          className="fixed inset-x-0 top-0 z-10 overflow-y-auto"
          data-modal-placement="top-right"
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="text"
                    id="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder={
                      getCurrentBreakpoint()
                        ? 'Chercher par ville ou nom de boutique'
                        : 'Ville ou boutique'
                    }
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 ml-2 flex items-center p-2 pr-3 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SearchBarModal;
