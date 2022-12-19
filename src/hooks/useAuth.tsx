import { auth, signOut } from 'firebaseFolder/clientApp';
import { sessionCookieName } from 'firebaseFolder/constant';
import Cookies from 'js-cookie';
import React, { createContext, useContext, useState } from 'react';

import UserEntity from '@/modules/user/UserEntity';
import type { User } from '@/modules/user/userType';
import { logoutUseCase } from '@/usecases/usecases';

type ContextType = {
  user: UserEntity;
  checkSessionCookieAndSetUser: (user: UserEntity) => void;
};

const AuthContext = createContext<ContextType>({
  user: UserEntity.new(),
  checkSessionCookieAndSetUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserEntity>(UserEntity.new());

  const checkSessionCookieAndSetUser = (receivedUser: User) => {
    logoutIfNoSessionCookie();
    setUser(UserEntity.new({ ...receivedUser }));
  };

  const logoutIfNoSessionCookie = () => {
    const cookies = Cookies.get();
    const sessionCookie = cookies ? cookies[sessionCookieName] : '';
    if (!sessionCookie) {
      logoutUseCase({ signOut, auth });
    }
  };

  return (
    <AuthContext.Provider value={{ user, checkSessionCookieAndSetUser }}>
      {children}
    </AuthContext.Provider>
  );
};
