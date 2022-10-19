import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import MarketplaceFooter from '@/components/02-marketplace/MarketplaceFooter';
import MarketplaceHeader from '@/components/02-marketplace/MarketplaceHeader';
import MobileMenu from '@/components/02-marketplace/MobileMenu';

type Props = {
  children: ReactNode;
};
const MarketplaceLayout: FC<Props> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <MarketplaceHeader setMobileMenuOpen={setMobileMenuOpen} />
      {children}
      <MarketplaceFooter />
    </div>
  );
};
export default MarketplaceLayout;
