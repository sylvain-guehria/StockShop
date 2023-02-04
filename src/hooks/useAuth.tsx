import React, { createContext, useContext, useState } from 'react';

import UserEntity from '@/modules/user/UserEntity';
import type { User } from '@/modules/user/userType';

type ContextType = {
  user: UserEntity;
  setUser: (user: UserEntity) => void;
  reinitializeUser: () => void;
};

const AuthContext = createContext<ContextType>({
  user: UserEntity.new(),
  setUser: () => {},
  reinitializeUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
  userProfile,
}: {
  children: React.ReactNode;
  userProfile?: User;
}) => {
  const [user, setUser] = useState<UserEntity>(UserEntity.new(userProfile));

  const reinitializeUser = () => {
    setUser(UserEntity.new());
  };

  return (
    <AuthContext.Provider value={{ user, setUser, reinitializeUser }}>
      {children}
    </AuthContext.Provider>
  );
};
