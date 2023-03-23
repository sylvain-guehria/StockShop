/* eslint-disable no-alert */

'use client';

import type { SupabaseClient } from '@supabase/supabase-js';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/modules/user/userType';
import type { Database } from '@/types/supabase';

import { useSupabase } from './SupabaseProvider';

const DynamicFirstConnectionModal = dynamic(
  () => import('../../components/FirstConnectionModal')
);

export default function SupabaseListener({
  serverAccessToken,
  user,
}: {
  serverAccessToken?: string;
  user?: User;
}) {
  const { supabase } = useSupabase();
  const { setUserTypeUser } = useAuth();
  const [showFirstConnectionModal, setShowFirstConnectionModal] =
    useState(false);

  useEffect(() => {
    setUserTypeUser(user as User);
    if (user && !user.hasSeenFirstConnectionModal) {
      setShowFirstConnectionModal(true);
    }
  }, [user]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (serverAccessToken && session?.access_token !== serverAccessToken) {
        window.location.reload();
      }

      if (event === 'PASSWORD_RECOVERY') {
        await newPassWordPrompt(supabase);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase]);

  return showFirstConnectionModal ? (
    <DynamicFirstConnectionModal user={user as User} />
  ) : null;
}

const newPassWordPrompt = async (supabase: SupabaseClient<Database>) => {
  await supabase.auth.getSession();

  const newPassword = prompt('Entrez votre nouveau mot de passe');
  if (!newPassword) return;
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword as string,
  });

  if (data?.user) {
    alert('Votre mot de passe a été mis à jour');
    window.location.reload();
  }
  if (error) alert(error.message);
};
