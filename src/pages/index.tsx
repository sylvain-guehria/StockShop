import dynamic from 'next/dynamic';

import Header from '@/components/04-lib/Header/Header';

import { Base } from '../components/06-template/Base';

const DynamicFirstConnectionModal = dynamic(
  () =>
    import('@/components/05-modals/firstConnectionModal/FirstConnectionModal'),
  {
    suspense: true,
  }
);

const Index = () => {
  return (
    <>
      {false && <DynamicFirstConnectionModal />}
      <Header />
      <Base />
    </>
  );
};

export default Index;
