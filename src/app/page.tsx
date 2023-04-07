import BasicLayout from '@/components/layouts/BasicLayout';

import Home from './(home)/Home';

export const revalidate = 0;

const HomePage = async () => {
  return (
    <BasicLayout>
      <Home />
    </BasicLayout>
  );
};

export default HomePage;
