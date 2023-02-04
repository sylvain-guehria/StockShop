import type { ReactNode } from 'react';

import AuthLayout from '@/layouts/AuthLayout';

// This is a Server Component
export default function Layout({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
