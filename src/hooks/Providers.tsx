import '../styles/global.css';

import type { ReactNode } from 'react';

import ToastContainer from '@/components/08-toaster/ToastContainer';
import { ToastProvider } from '@/components/08-toaster/ToastContext';

import { AuthContextProvider } from './useAuth';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContextProvider>
      <ToastProvider>
        {children}
        <ToastContainer />
      </ToastProvider>
    </AuthContextProvider>
  );
};

export default Providers;
