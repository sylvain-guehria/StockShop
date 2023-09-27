'use client';

import { useState } from 'react';

import type { User } from '@/modules/user/userType';

import Drawer from './Drawer';
import Header from './Header';

const HeaderAndDrawer = ({ user }: { user: User | null }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Drawer
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        user={user}
      />
      <Header setMobileMenuOpen={setMobileMenuOpen} user={user} />
    </>
  );
};

export default HeaderAndDrawer;
