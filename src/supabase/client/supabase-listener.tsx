'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/modules/user/userType';

import { useSupabase } from './SupabaseProvider';

export default function SupabaseListener({
  serverAccessToken,
  user,
}: {
  serverAccessToken?: string;
  user?: User;
}) {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { setUserTypeUser } = useAuth();

  useEffect(() => {
    setUserTypeUser(user as User);
  }, [user]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // if (event === 'PASSWORD_RECOVERY') {
      //   setIsResetPasswordModalOpen(true);
      //   return;
      // }
      if (session?.access_token !== serverAccessToken) {
        window.location.reload();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, router, supabase]);

  return null;
}
