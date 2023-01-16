import createServerSupabaseClient from 'supabase/server/supabase-server';

import PublicLayout from '@/layouts/PublicLayout';

import Base from '../components/06-template/Base';

export const revalidate = 0;

const HomePage = async () => {
  const supabase = createServerSupabaseClient();
  const user = await supabase.auth.getUser();

  // eslint-disable-next-line no-console
  console.log('in home SSR--------------------------- user', user);

  return (
    <PublicLayout>
      <Base />
    </PublicLayout>
  );
};

export default HomePage;
