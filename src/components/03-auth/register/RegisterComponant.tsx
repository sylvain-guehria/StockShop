import Link from 'next/link';

import NextImage from '@/components/04-lib/nextImage/NextImage';
import { mainRoutes } from '@/routes/mainRoutes';

import stockshopLogo from '../../../../public/assets/images/stockshop.png';
import LoginOtherPlatformForm from '../login-platform/LoginOtherPlatformForm';
import RegisterForm from './RegisterForm';

const RegisterComponant = () => {
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href={mainRoutes.home.path}>
            <NextImage
              className="mx-auto h-12 w-auto cursor-pointer"
              src={stockshopLogo}
              alt="stock shop logo"
            />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            S&apos;inscrire avec son email
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            Déjà inscrit ?{' '}
            <Link href={mainRoutes.login.path}>
              <div className="cursor-pointer font-medium text-primary-600 hover:text-primary-500">
                Se connecter
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <RegisterForm />
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Ou continuer avec
                  </span>
                </div>
              </div>
              <LoginOtherPlatformForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RegisterComponant;
