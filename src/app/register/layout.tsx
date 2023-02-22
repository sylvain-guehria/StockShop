import type { ReactNode } from 'react';

import NoLayout from '@/components/layouts/NoLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return <NoLayout>{children}</NoLayout>;
}
