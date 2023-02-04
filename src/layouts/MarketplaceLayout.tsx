import type { FC, ReactNode } from 'react';

import MarketplaceHeaderAndDrawer from '@/components/02-marketplace/Header/MarketplaceHeaderAndDrawer';
import MarketplaceFooter from '@/components/02-marketplace/MarketplaceFooter';
import type { User } from '@/modules/user/userType';

import Providers from './Providers';

type Props = {
  children: ReactNode;
  userProfile: User;
};

const MarketplaceLayout: FC<Props> = ({ children, userProfile }) => {
  return (
    <Providers userProfile={userProfile}>
      <div className="bg-white">
        <MarketplaceHeaderAndDrawer />
        {children}
        <MarketplaceFooter />
      </div>
    </Providers>
  );
};

export default MarketplaceLayout;
