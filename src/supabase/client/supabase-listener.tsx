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
}: {
  serverAccessToken?: string;
  user?: User;
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
      if (event === 'PASSWORD_RECOVERY') {
        await newPassWordPrompt(supabase);
        return;
      }

      if (session?.access_token !== serverAccessToken) {
        window.location.reload();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase]);

  return null;
}

const newPassWordPrompt = async (supabase: SupabaseClient<Database>) => {
  const newPassword = prompt('Entrez votre nouveau mot de passe');
  if (!newPassword) return;
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword as string,
  });

  if (data?.user) {
    alert('Votre mot de passe a été mis à jour');
    supabase.auth.signOut();
  }
  if (error) alert(error.message);
};
