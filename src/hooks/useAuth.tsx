import { userRepository } from 'di';
import { sessionCookieName } from 'firebaseFolder/constant';
import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';

import UserEntity from '@/modules/user/UserEntity';

import { auth, onAuthStateChanged } from '../../firebaseFolder/clientApp';
import { isFirebaseUserFirstConnexion } from './hooksUtils';

type ContextType = {
  user: UserEntity;
  setUser: (user: UserEntity) => void;
};

const AuthContext = createContext<ContextType>({
  user: UserEntity.new(),
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserEntity>(UserEntity.new());

  useEffect(() => {
    const fetchUserInformation = async (uid: string) => {
      try {
        return await userRepository.getById(uid);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('ERROR fetchUserInformation', e);
        return null;
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        Cookies.remove(sessionCookieName);
        setUser(UserEntity.new({}));
        return;
      }

      const isFirstConnexion = isFirebaseUserFirstConnexion(
        // @ts-ignore
        firebaseUser.metadata.createdAt || '0'
      );

      if (isFirstConnexion) {
        console.error('isFirstConnexion*******************');
        // is handled in usecases
        return;
      }

      const fetchedUser = await fetchUserInformation(firebaseUser.uid);
      setUser(UserEntity.new(fetchedUser || {}));
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
