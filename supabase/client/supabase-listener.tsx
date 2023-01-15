'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import supabase from './supabase-browser';

export default function SupabaseListener({
  accessToken,
}: {
  accessToken?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.access_token !== accessToken) {
        console.log('access token changed, refreshing...');
        router.refresh();
      }
    });
    return () => data.subscription.unsubscribe();
  }, [accessToken]);

  return null;
}
