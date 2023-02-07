'use client';

import type { FC } from 'react';
import { useState } from 'react';

import MarketplaceDrawer from './MarketplaceDrawer';
import MarketplaceHeader from './MarketplaceHeader';

const MarketplaceHeaderAndDrawer: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <MarketplaceDrawer
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <MarketplaceHeader setMobileMenuOpen={setMobileMenuOpen} />
    </>
  );
};

export default MarketplaceHeaderAndDrawer;
