import React, { createContext, useContext, useState } from 'react';

import UserEntity from '@/modules/user/UserEntity';
import type { User } from '@/modules/user/userType';

type ContextType = {
  user: UserEntity;
  setUser: (user: UserEntity) => void;
  reinitializeUser: () => void;
  setUserTypeUser: (user: User) => void;
};

const AuthContext = createContext<ContextType>({
  user: UserEntity.new(),
  setUser: () => {},
  reinitializeUser: () => {},
  setUserTypeUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserEntity>(UserEntity.new());

  const setUserTypeUser = (userParam: User) => {
    setUser(UserEntity.new(userParam));
  };

  const reinitializeUser = () => {
    setUser(UserEntity.new());
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, reinitializeUser, setUserTypeUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
