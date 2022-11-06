'use client';

import type { FC } from 'react';
import { useState } from 'react';

import MarketplaceHeader from '@/components/02-marketplace/Header/MarketplaceHeader';
import Providers from '@/hooks/Providers';

import MarketplaceDrawer from './MarketplaceDrawer';

const MarketplaceHeaderAndDrawer: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Providers>
      <MarketplaceDrawer
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <MarketplaceHeader setMobileMenuOpen={setMobileMenuOpen} />
    </Providers>
  );
};

export default MarketplaceHeaderAndDrawer;
