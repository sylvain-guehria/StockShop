'use client';

import { EnvelopeIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import Providers from '@/components/layouts/Providers';
import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { useToast } from '@/hooks/useToast';
import GoogleSVG from '@/logo/GoogleSVG';
import supabase from '@/supabase/client/supabase-browser';
import { loginWithGoogleUseCase } from '@/usecases/usecases';

const DynamicModal = dynamic(
  () => import('../../../components/lib/modal/Modal'),
  {
    suspense: true,
  }
);

const DynamicLoginWithMagikLinkForm = dynamic(
  () => import('./LoginWithMagikLinkForm'),
  {
    suspense: true,
  }
);

const LoginOtherPlatformForm = () => {
  const toast = useToast(4000);
  const [isMagikLinkModalOpen, setOpenMagikLinkModal] = useState(false);

  const handleLoginGoogle = async () => {
    try {
      const response = await loginWithGoogleUseCase({ supabase });
      if (response.error) {
        toast(ToasterTypeEnum.ERROR, response.error.message);
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('error LoginOtherPlatformForm', error);
      toast(ToasterTypeEnum.ERROR, error.message);
    }
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
          onClick={handleLoginGoogle}
          className="inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
        >
          <span className="sr-only">Sign in with Google</span>
          <GoogleSVG />
        </div>
        <div
          onClick={openMagikLinkModal}
          className="inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
        >
          <span className="sr-only">Sign in with Magik link</span>
          <EnvelopeIcon className="mr-1 h-5 w-5" />
          Lien email
        </div>
      </div>
    </>
  );
};

const LoginOtherPlatformFormWithProviders = () => (
  <Providers>
    <LoginOtherPlatformForm />
  </Providers>
);

export default LoginOtherPlatformFormWithProviders;
