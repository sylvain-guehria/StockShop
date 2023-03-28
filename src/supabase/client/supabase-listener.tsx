/* eslint-disable no-alert */

'use client';

import type { SupabaseClient } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/modules/user/userType';
import type { Database } from '@/types/supabase';

import { TableNames } from '../enums/tableNames';
import { useSupabase } from './SupabaseProvider';

const DynamicFirstConnectionModal = dynamic(
  () => import('../../components/FirstConnectionModal')
);

export default function SupabaseListener({
  serverAccessToken,
  userId,
}: {
  serverAccessToken?: string;
  userId?: string;
}) {
  const { supabase } = useSupabase();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { setUserTypeUser, reinitializeUser } = useAuth();
  const [showFirstConnectionModal, setShowFirstConnectionModal] =
    useState(false);

  useQuery({
    queryKey: [ApiRequestEnums.GetUser, { currentUserId }],
    enabled: !!currentUserId || !!userId,
    queryFn: async () =>
      supabase
        .from(TableNames.PROFILES)
        .select('*')
        .eq('id', currentUserId || userId)
        .single(),
    staleTime: 3000,
    onSuccess: ({ data }: { data: User }) => {
      setUserTypeUser(data as User);
      if (data && !data.hasSeenFirstConnectionModal) {
        setShowFirstConnectionModal(true);
      }
    },
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.access_token !== serverAccessToken) {
        window.location.reload();
      }

      if (event === 'PASSWORD_RECOVERY') {
        await newPassWordPrompt(supabase);
      }

      if (session?.user?.id) setCurrentUserId(session?.user?.id);
      if (!session?.user?.id) reinitializeUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase]);

  return showFirstConnectionModal ? <DynamicFirstConnectionModal /> : null;
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
