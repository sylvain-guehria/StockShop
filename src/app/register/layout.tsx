import type { ReactNode } from 'react';

import AuthLayout from '@/components/layouts/AuthLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
