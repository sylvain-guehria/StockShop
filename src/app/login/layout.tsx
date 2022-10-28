import type { ReactNode } from 'react';

import AuthLayoutWithProviders from '@/layouts/AuthLayout';

// This is a Server Component
export default function Layout({ children }: { children: ReactNode }) {
  return <AuthLayoutWithProviders>{children}</AuthLayoutWithProviders>;
}
