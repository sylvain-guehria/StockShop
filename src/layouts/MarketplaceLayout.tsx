import dynamic from 'next/dynamic';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import MarketplaceFooter from '@/components/02-marketplace/MarketplaceFooter';
import MarketplaceHeader from '@/components/02-marketplace/MarketplaceHeader';
import MobileMenu from '@/components/02-marketplace/MobileMenu';
import { useAuth } from '@/hooks/useAuth';

const DynamicFirstConnectionModal = dynamic(
  () =>
    import('@/components/05-modals/firstConnectionModal/FirstConnectionModal'),
  {
    suspense: true,
  }
);

type Props = {
  children: ReactNode;
};
const MarketplaceLayout: FC<Props> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const displayFirstConnectionModal = user.needToSeeFirstConnectionModal();

  return (
    <div className="bg-white">
      {displayFirstConnectionModal && <DynamicFirstConnectionModal />}
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
