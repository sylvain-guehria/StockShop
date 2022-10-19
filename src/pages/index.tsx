import dynamic from 'next/dynamic';

import Header from '@/components/lib/Header/Header';

import { Base } from '../components/template/Base';

const DynamicFirstConnectionModal = dynamic(
  () => import('@/components/modals/firstConnectionModal/FirstConnectionModal'),
  {
    suspense: true,
  }
);

const Index = () => {
  return (
    <>
      <DynamicFirstConnectionModal />
      <Header />
      <Base />
    </>
  );
};

export default Index;
