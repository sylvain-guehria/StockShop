import '../styles/global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import ToastContainer from '@/components/08-toaster/ToastContainer';
import { ToastProvider } from '@/components/08-toaster/ToastContext';

import { AuthContextProvider } from '../hooks/useAuth';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default Providers;
