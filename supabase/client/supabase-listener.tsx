'use client';

import { useEffect } from 'react';

import supabase from './supabase-browser';

export default function SupabaseListener({
  accessToken,
}: {
  accessToken?: string;
}) {
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.access_token !== accessToken) {
        window.location.reload();
      }
    });
    return () => data.subscription.unsubscribe();
  }, [accessToken]);

  return null;
}
