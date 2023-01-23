'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import ToastContainer from '@/components/08-toaster/ToastContainer';
import { ToastProvider } from '@/components/08-toaster/ToastContext';
import type { User } from '@/modules/user/userType';

import { AuthContextProvider } from '../hooks/useAuth';

const queryClient = new QueryClient();

const Providers = ({
  children,
  userProfile,
}: {
  children: ReactNode;
  userProfile?: User;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider userProfile={userProfile}>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default Providers;
