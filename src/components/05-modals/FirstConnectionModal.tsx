import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Fragment, useRef, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { SUBROLES } from '@/modules/user/userType';
import { inventoryManagementRoutes } from '@/routes/inventoryManagementRoutes';
import { marketpalceRoutes } from '@/routes/marketpalceRoutes';
import { chooseSubRoleOnFirstConnectionUseCase } from '@/usecases/usecases';

const FirstConnectionModal = () => {
  const [open, setOpen] = useState(true);
  const { user } = useAuth();

  const cancelButtonRef = useRef(null);

  const onChooseRoleFirstConnection = async (
    subrole: SUBROLES.BUYER | SUBROLES.SELLER
  ) => {
    chooseSubRoleOnFirstConnectionUseCase(user, subrole).then(() =>
      setOpen(false)
    );
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => null}
      >
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
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
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      C&apos;est votre première visite sur ce site ! Bienvenue.
                      Dite nous si vous venez gérer votre inventaire ou
                      seulement acheter des produits dans les inventaires de vos
                      commerçant préféfés ?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Si vous choisissez de gérer votre inventaire vous aurez
                        en plus accès à l&apos;application de gestion. Ne vous
                        en fait pas, à tout moment vous pouvez activer ou
                        désactiver la fonction de gestion dans vos paramètres.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <Link href={marketpalceRoutes.marketplace.path}>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      onClick={() =>
                        onChooseRoleFirstConnection(SUBROLES.SELLER)
                      }
                      ref={cancelButtonRef}
                    >
                      Je veux gérer mon inventaire
                    </button>
                  </Link>
                  <Link
                    href={inventoryManagementRoutes.inventoryDashboard.path}
                  >
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                      onClick={() =>
                        onChooseRoleFirstConnection(SUBROLES.BUYER)
                      }
                    >
                      Je viens seulement en tant qu&apos;acheteur
                    </button>
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default FirstConnectionModal;
