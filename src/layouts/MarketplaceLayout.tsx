import type { FC, ReactNode } from 'react';

import MarketplaceHeaderAndDrawer from '@/components/02-marketplace/Header/MarketplaceHeaderAndDrawer';
import MarketplaceFooter from '@/components/02-marketplace/MarketplaceFooter';

import Providers from './Providers';

type Props = {
  children: ReactNode;
};

const MarketplaceLayout: FC<Props> = ({ children }) => {
  return (
    <Providers>
      <div className="bg-white">
        <MarketplaceHeaderAndDrawer />
        {children}
        <MarketplaceFooter />
      </div>
    </Providers>
  );
};

export default MarketplaceLayout;
