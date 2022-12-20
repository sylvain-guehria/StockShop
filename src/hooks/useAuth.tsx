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

  const checkSessionCookieAndSetUser = async (receivedUser: User) => {
    const cookies = Cookies.get();
    const sessionCookie = cookies ? cookies[sessionCookieName] : '';

    const firebaseCurrentUser = auth.currentUser;

    if (!sessionCookie && firebaseCurrentUser) {
      await logoutUseCase({ signOut, auth });
      setUser(UserEntity.new({}));
      return;
    }
    if (sessionCookie && !firebaseCurrentUser) {
      Cookies.remove(sessionCookieName);
      setUser(UserEntity.new({}));
      return;
    }
    setUser(UserEntity.new({ ...receivedUser }));
  };

  return (
    <AuthContext.Provider value={{ user, checkSessionCookieAndSetUser }}>
      {children}
    </AuthContext.Provider>
  );
};
