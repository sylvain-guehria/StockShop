'use client';

import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { logException } from 'logger';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';

import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { useToast } from '@/hooks/useToast';
import GoogleSVG from '@/logo/GoogleSVG';

const DynamicModal = dynamic(
  () => import('../../../components/lib/modal/Modal'),
  {
    suspense: true,
  },
);

const DynamicLoginWithMagikLinkForm = dynamic(
  () => import('./LoginWithMagikLinkForm'),
  {
    suspense: true,
  },
);

const LoginOtherPlatformForm = () => {
  const toast = useToast(15000);
  const [isMagikLinkModalOpen, setOpenMagikLinkModal] = useState(false);

  const handleLoginGoogle = async () => {
    try {
      const response = await fetch('/auth/sign-in-google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());

      if (response.error) throw new Error(response.error.message);
    } catch (error: any) {
      logException(error, { when: 'LoginOtherPlatformForm' });
      toast(ToasterTypeEnum.ERROR, error.message);
    }
  };

  const tellUSerToUseMagikLink = () => {
    toast(
      ToasterTypeEnum.INFO,
      "La connexion avec Google n'est pas disponible sur mobile. Vous pouvez utiliser le lien email ou créer un mot de passe. Vous pourrez toujours vous connecter avec Google sur votre ordinateur.",
    );
  };

  const openMagikLinkModal = () => {
    setOpenMagikLinkModal(true);
  };

  return (
    <>
      {isMagikLinkModalOpen && (
        <DynamicModal
          open={isMagikLinkModalOpen}
          handleCloseModal={() => setOpenMagikLinkModal(false)}
          mawWidth="sm:max-w-xl"
          width="w-full"
        >
          <DynamicLoginWithMagikLinkForm />
        </DynamicModal>
      )}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div
          onClick={isMobile ? tellUSerToUseMagikLink : handleLoginGoogle}
          className="inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
        >
          <span className="sr-only">Sign in with Google</span>
          <GoogleSVG />
        </div>
        <div
          onClick={openMagikLinkModal}
          className="inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
        >
          <span className="sr-only">Sign in with Magik link</span>
          <EnvelopeIcon className="mr-1 h-5 w-5" />
          Lien email
        </div>
      </div>
    </>
  );
};

export default LoginOtherPlatformForm;
