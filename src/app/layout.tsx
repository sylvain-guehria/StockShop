import 'server-only';
import '../styles/global.css';

import type { Metadata } from 'next';
import { NEXT_SEO_DEFAULT } from 'next-seo.config';
import React from 'react';

import FirstConnectionModal from '@/components/FirstConnectionModal';
import Providers from '@/components/layouts/Providers';
import { getUserInServerComponant } from '@/supabase/getUserInServerComponant';

// We don't want Next.js to cache this session value
export const revalidate = 0;

// Static metadata
export const metadata: Metadata = { ...NEXT_SEO_DEFAULT };

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserInServerComponant();
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className="flex min-h-screen flex-col">
        <Providers>
          {children}
          <FirstConnectionModal user={user} />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
