import { useRouter } from 'next/router';
import type { FC, ReactNode } from 'react';

import Header from '@/components/04-lib/Header/Header';
import { useAuth } from '@/hooks/useAuth';
import { marketpalceRoutes } from '@/routes/marketpalceRoutes';
import { stockManagementRoutes } from '@/routes/stockManagementRoutes';

type Props = {
  children: ReactNode;
};

const VisitorLayout: FC<Props> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  if (user.isUserLoggedIn() && user.isSeller())
    router.push(stockManagementRoutes.stockDashboard.path);

  if (user.isUserLoggedIn()) router.push(marketpalceRoutes.marketplace.path);

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default VisitorLayout;
