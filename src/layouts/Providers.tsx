'use client';

// import '../styles/global.css';

// import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
// import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import ToastContainer from '@/components/08-toaster/ToastContainer';
import { ToastProvider } from '@/components/08-toaster/ToastContext';

import { AuthContextProvider } from '../hooks/useAuth';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  // const [supabase] = useState(() => createBrowserSupabaseClient());
  return (
    // <SessionContextProvider supabaseClient={supabase}>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </AuthContextProvider>
    </QueryClientProvider>
    // </SessionContextProvider>
  );
};

export default Providers;
