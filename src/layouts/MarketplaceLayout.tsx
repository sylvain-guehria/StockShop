import type { FC, ReactNode } from 'react';

import MarketplaceHeaderAndDrawer from '@/components/02-marketplace/Header/MarketplaceHeaderAndDrawer';
import MarketplaceFooter from '@/components/02-marketplace/MarketplaceFooter';

type Props = {
  children: ReactNode;
};

const MarketplaceLayout: FC<Props> = ({ children }) => {
  return (
    <div className="bg-white">
      <MarketplaceHeaderAndDrawer />
      {children}
      <MarketplaceFooter />
    </div>
  );
};

export default MarketplaceLayout;
