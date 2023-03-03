'use client';

import type { Session } from '@supabase/supabase-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import ToastContainer from '@/components/toaster/ToastContainer';
import { ToastProvider } from '@/components/toaster/ToastContext';
import { AuthContextProvider } from '@/hooks/useAuth';
import SupabaseProvider from '@/supabase/client/SupabaseProvider';

const queryClient = new QueryClient();

const Providers = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) => {
  return (
    <SupabaseProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <ToastProvider>
            {children}
            <ToastContainer />
          </ToastProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </SupabaseProvider>
  );
};

export default Providers;
