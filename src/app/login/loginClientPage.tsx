'use client';

import LoginComponant from '@/components/03-auth/login/LoginComponant';
import ToastContainer from '@/components/08-toaster/ToastContainer';
import { ToastProvider } from '@/components/08-toaster/ToastContext';
import { AuthContextProvider } from '@/hooks/useAuth';
import AuthLayout from '@/layouts/AuthLayout';

const LoginClientPage = () => {
  return (
    <AuthContextProvider>
      <ToastProvider>
        <AuthLayout>
          <LoginComponant />
          <ToastContainer />
        </AuthLayout>
      </ToastProvider>
    </AuthContextProvider>
  );
};

export default LoginClientPage;
