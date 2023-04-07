import Link from 'next/link';

import NextImage from '@/components/lib/nextImage/NextImage';
import { mainRoutes } from '@/routes/mainRoutes';

import inventoryMarketLogo from '../../../../public/assets/images/inventoryMarket.png';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword = () => {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href={mainRoutes.home.path}>
          <NextImage
            className="mx-auto h-12 w-auto cursor-pointer"
            src={inventoryMarketLogo}
            alt="inventory shop logo"
          />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Réinitialiser son mot de passe
        </h2>
        <div className="mt-2 flex justify-center text-center text-sm text-gray-600">
          <div className="mr-2">Ou</div>
          <div className="cursor-pointer font-medium text-primary-600 hover:text-primary-500">
            <Link href={mainRoutes.login.path}>{mainRoutes.login.label}</Link>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
