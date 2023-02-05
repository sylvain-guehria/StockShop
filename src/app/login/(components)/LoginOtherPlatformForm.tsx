'use client';

import Providers from '@/components/layouts/Providers';
import { ToasterTypeEnum } from '@/components/toaster/toasterEnum';
import { useToast } from '@/hooks/useToast';
import GoogleSVG from '@/logo/GoogleSVG';
import supabase from '@/supabase/client/supabase-browser';
import { loginWithGoogleUseCase } from '@/usecases/usecases';

const LoginOtherPlatformForm = () => {
  const toast = useToast(4000);
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
  return (
    <div className="mt-6 grid grid-cols-1 gap-3">
      <div>
        <div
          onClick={handleLoginGoogle}
          className="inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
        >
          <span className="sr-only">Sign in with Google</span>
          <GoogleSVG />
        </div>
      </div>
    </div>
  );
};

const LoginOtherPlatformFormWithProviders = () => (
  <Providers>
    <LoginOtherPlatformForm />
  </Providers>
);

export default LoginOtherPlatformFormWithProviders;
