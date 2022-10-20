import axios from 'axios';
import dynamic from 'next/dynamic';

import Header from '@/components/04-lib/Header/Header';

import Base from '../components/06-template/Base';

const DynamicFirstConnectionModal = dynamic(
  () =>
    import('@/components/05-modals/firstConnectionModal/FirstConnectionModal'),
  {
    suspense: true,
  }
);

const getAllUsers = async () => {
  const response = await axios.get('/api/user/getAll/');
  return response.data;
};

const Index = () => {
  getAllUsers();
  return (
    <>
      {false && <DynamicFirstConnectionModal />}
      <Header />
      <Base />
    </>
  );
};

export default Index;
