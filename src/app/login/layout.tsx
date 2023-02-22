import type { ReactNode } from 'react';

import NoLayout from '@/components/layouts/NoLayout';

// This is a Server Component
export default function Layout({ children }: { children: ReactNode }) {
  return <NoLayout>{children}</NoLayout>;
}
