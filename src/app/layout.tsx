import '../styles/global.css';

import { userRepository } from 'di';
import type { JSXElementConstructor, ReactElement } from 'react';
import React from 'react';

import FirstConnectionModalWithProviders from '@/components/05-modals/FirstConnectionModal';
import type UserEntity from '@/modules/user/UserEntity';
import { validateUser } from '@/utils/validateUserServerSide';

const RootLayout = async ({
  children,
}: {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}) => {
  const uid = await validateUser();

  let user: UserEntity | null = null;

  if (uid) {
    user = await userRepository.getById(uid);
    if (user.needToSeeFirstConnectionModal()) {
      return <FirstConnectionModalWithProviders />;
    }
  }

  return (
    <html lang="en">
      <head>
        <title>Inventory Market</title>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
