import '../styles/global.css';

import type { JSXElementConstructor, ReactElement } from 'react';
import React from 'react';

const RootLayout = async ({
  children,
}: {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}) => {
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
