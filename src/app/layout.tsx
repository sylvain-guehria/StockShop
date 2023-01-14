import 'server-only';
import '../styles/global.css';

import type { JSXElementConstructor, ReactElement } from 'react';
import React from 'react';
import SupabaseListener from 'supabase/client/supabase-listener';
import createServerSupabaseClient from 'supabase/server/supabase-server';

// We don't want Next.js to cache this session value
export const revalidate = 0;

const RootLayout = async ({
  children,
}: {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}) => {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

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
      <SupabaseListener accessToken={session?.access_token} />
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
