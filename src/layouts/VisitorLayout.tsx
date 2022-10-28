'use client';

import { useRouter } from 'next/navigation';
import type { FC, ReactNode } from 'react';

import Header from '@/components/04-lib/Header/Header';
import Providers from '@/hooks/Providers';
import { useAuth } from '@/hooks/useAuth';
import { marketpalceRoutes } from '@/routes/marketpalceRoutes';
import { stockManagementRoutes } from '@/routes/stockManagementRoutes';

type Props = {
  children: ReactNode;
};

const VisitorLayout: FC<Props> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  if (user.isLoggedIn() && user.isSeller())
    router.push(stockManagementRoutes.stockDashboard.path);

  if (user.isLoggedIn()) router.push(marketpalceRoutes.marketplace.path);

  return (
    <>
      <Header />
      {children}
    </>
  );
};

const VisitorLayoutWithProviders: FC<Props> = ({ children }) => {
  return (
    <Providers>
      <VisitorLayout>{children}</VisitorLayout>
    </Providers>
  );
};

export default VisitorLayoutWithProviders;
