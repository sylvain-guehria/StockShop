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
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        newPassWordPrompt(supabase);
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
  const newPassword = prompt('What would you like your new password to be?');
  if (!newPassword) return;
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword as string,
  });

  if (data) alert('Password updated successfully!');
  if (error) alert('There was an error updating your password.');
};
