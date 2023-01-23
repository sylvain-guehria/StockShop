import PublicLayout from '@/layouts/PublicLayout';

import Base from '../components/06-template/Base';

export const revalidate = 600;

const HomePage = () => {
  return (
    <PublicLayout>
      <Base />
    </PublicLayout>
  );
};

export default HomePage;
