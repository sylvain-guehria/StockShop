'use client';

import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SettingsImg from 'public/assets/images/settings.png';
import type { FC } from 'react';
import { Fragment, useRef, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import UserEntity from '@/modules/user/UserEntity';
import type { User } from '@/modules/user/userType';
import { SUBROLES } from '@/modules/user/userType';
import { inventoryManagementRoutes } from '@/routes/inventoryManagementRoutes';
import { marketplaceRoutes } from '@/routes/marketplaceRoutes';
import { chooseSubRoleOnFirstConnectionUseCase } from '@/usecases/usecases';

import NextImage from './lib/nextImage/NextImage';
import { ToasterTypeEnum } from './toaster/toasterEnum';

type Props = {
  user: User;
};

const FirstConnectionModal: FC<Props> = ({ user }) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const toast = useToast(10000);

  const { setUserTypeUser } = useAuth();

  const cancelButtonRef = useRef(null);

  const onChooseRoleFirstConnection = async (
    subrole: SUBROLES.BUYER | SUBROLES.SELLER
  ) => {
    chooseSubRoleOnFirstConnectionUseCase(UserEntity.new({ ...user }), subrole)
      .then((updatedUser) => {
        if (!updatedUser) return;
        setUserTypeUser(updatedUser);
        if (subrole === SUBROLES.BUYER) {
          router.push(marketplaceRoutes.marketplace.path);
        }
        if (subrole === SUBROLES.SELLER) {
          router.push(inventoryManagementRoutes.myInventory.path);
        }
        setOpen(false);
      })
      .catch((error: any) => {
        toast(ToasterTypeEnum.ERROR, error.message);
      });
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
          <div className="flex min-h-full  items-center justify-center p-4 text-center sm:p-0">
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
                  <Dialog.Title
                    as="h3"
                    className="mb-3 text-lg font-medium leading-6 text-gray-900"
                  >
                    C&apos;est votre première visite sur ce site ! Bienvenue !
                    🥳
                  </Dialog.Title>
                  <div className="mx-auto flex  items-center justify-center bg-green-100">
                    <NextImage
                      src={SettingsImg}
                      alt="Settings Zanzi illustrations from getillustrations.com"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-justify text-lg font-medium leading-6 text-gray-900"
                    >
                      Souhaitez vous accéder à l&apos;application de gestion des
                      inventaires ou souhaitez vous seulement accéder à la
                      marketplace?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-justify text-sm text-gray-500">
                        Si vous choisissez de gérer votre inventaire vous aurez
                        en plus accès à l&apos;application de gestion des
                        stocks. À tout moment vous pouvez activer ou désactiver
                        la fonction de gestion dans vos paramètres.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <Link href={marketplaceRoutes.marketplace.path}>
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
                  <Link href={inventoryManagementRoutes.myInventory.path}>
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
