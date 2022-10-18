import type { FC, ReactNode } from 'react';

type IBackgroundProps = {
  children: ReactNode;
};

const SellerLayout: FC<IBackgroundProps> = ({ children }) => {
  return (
    <div className="h-full bg-gray-100">
      <div className="h-full">{children}</div>
    </div>
  );
};

export default SellerLayout;
