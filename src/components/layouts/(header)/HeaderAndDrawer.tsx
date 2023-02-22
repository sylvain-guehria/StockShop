'use client';

import type { FC } from 'react';
import { useState } from 'react';

import Drawer from './Drawer';
import Header from './Header';

const HeaderAndDrawer: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Drawer
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <Header setMobileMenuOpen={setMobileMenuOpen} />
    </>
  );
};

export default HeaderAndDrawer;
