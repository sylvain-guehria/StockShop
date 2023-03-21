/* eslint-disable no-console */
/* eslint-disable no-alert */

'use client';

import type { SupabaseClient } from '@supabase/supabase-js';
import { useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/modules/user/userType';
import type { Database } from '@/types/supabase';

import { useSupabase } from './SupabaseProvider';

export default function SupabaseListener({
  serverAccessToken,
  user,
  layoutAuth,
}: {
  serverAccessToken?: string;
  user?: User;
  layoutAuth?: SupabaseClient<Database>['auth'];
}) {
  const { supabase } = useSupabase();
  const { setUserTypeUser } = useAuth();

  useEffect(() => {
    setUserTypeUser(user as User);
  }, [user]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (serverAccessToken && session?.access_token !== serverAccessToken) {
        window.location.reload();
      }

      if (event === 'PASSWORD_RECOVERY') {
        await newPassWordPrompt(layoutAuth);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase]);

  return null;
}

const newPassWordPrompt = async (
  layoutAuth?: SupabaseClient<Database>['auth']
) => {
  if (!layoutAuth) return;
  const newPassword = prompt('Entrez votre nouveau mot de passe');
  if (!newPassword) return;
  const { data, error } = await layoutAuth.updateUser({
    password: newPassword as string,
  });

  if (data?.user) {
    alert('Votre mot de passe a été mis à jour');
    layoutAuth.signOut();
  }
  if (error) alert(error.message);
};
