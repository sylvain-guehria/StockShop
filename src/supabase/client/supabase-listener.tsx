'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import supabase from './supabase-browser';

const DynamicModal = dynamic(() => import('src/components/lib/modal/Modal'), {
  suspense: true,
});

const DynamicResetPassword = dynamic(
  () =>
    import('src/app/reset-password/(reset-password-components)/ResetPassword'),
  {
    suspense: true,
  }
);

export default function SupabaseListener({
  accessToken,
}: {
  accessToken?: string;
}) {
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('event', event, 'session', session);
      if (event === 'PASSWORD_RECOVERY') {
        setIsResetPasswordModalOpen(true);
        return;
      }
      if (session?.access_token !== accessToken) {
        window.location.reload();
      }
    });
    return () => data.subscription.unsubscribe();
  }, [accessToken]);

  return isResetPasswordModalOpen ? (
    <DynamicModal
      open={isResetPasswordModalOpen}
      handleCloseModal={() => setIsResetPasswordModalOpen(false)}
    >
      <DynamicResetPassword />
    </DynamicModal>
  ) : null;
}
