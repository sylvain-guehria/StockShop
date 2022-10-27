'use client';

import RegisterComponant from '@/components/03-auth/register/RegisterComponant';
import ToastContainer from '@/components/08-toaster/ToastContainer';
import { ToastProvider } from '@/components/08-toaster/ToastContext';
import { AuthContextProvider } from '@/hooks/useAuth';
import AuthLayout from '@/layouts/AuthLayout';

const RegisterClientPage = () => {
  return (
    <AuthContextProvider>
      <ToastProvider>
        <AuthLayout>
          <RegisterComponant />
          <ToastContainer />
        </AuthLayout>
      </ToastProvider>
    </AuthContextProvider>
  );
};

export default RegisterClientPage;
