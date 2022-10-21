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
  // eslint-disable-next-line no-console
  console.log('getAllUsers', response.data);
  return response.data;
};

const getUser = async () => {
  const response = await axios.get('/api/user/U0NCNDNfzJQ13pr9CPnW');
  // eslint-disable-next-line no-console
  console.log('getUser', response.data);
  return response.data;
};

const Index = () => {
  // getAllUsers();
  // getUser();
  return (
    <>
      {false && <DynamicFirstConnectionModal />}
      <Header />
      <Base />
    </>
  );
};

export default Index;
