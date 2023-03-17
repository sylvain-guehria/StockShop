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
      if (event === 'PASSWORD_RECOVERY' && typeof window !== 'undefined') {
        await updatePassword(supabase);
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

async function updatePassword(supabase: SupabaseClient<Database>) {
  const newPassword = window.prompt(
    'Choisissez un nouveau mot de passe pour votre compte'
  );
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword as string,
  });

  if (data) window.alert('Votre mot de passe a été mis à jour.');
  if (error)
    window.alert(
      'Une erreur est survenue lors de la mise à jour du mot de passe.'
    );
}
