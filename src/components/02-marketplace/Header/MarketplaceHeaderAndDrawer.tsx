'use client';

import type { FC } from 'react';
import { useState } from 'react';

import MarketplaceHeader from '@/components/02-marketplace/Header/MarketplaceHeader';

import MarketplaceDrawer from './MarketplaceDrawer';

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
