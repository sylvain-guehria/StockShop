import { useQuery } from '@tanstack/react-query';
import { userRepository } from 'di';
import { sessionCookieName } from 'firebaseFolder/constant';
import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { ApiRequestEnums } from '@/enums/apiRequestEnums';
import UserEntity from '@/modules/user/UserEntity';

import { auth, onAuthStateChanged } from '../../firebaseFolder/clientApp';
import { isFirebaseUserFirstConnexion } from './hooksUtils';

const oneHourInMilliseconds = 1000 * 60 * 60;

type ContextType = {
  user: UserEntity;
  setUser: (user: UserEntity) => void;
  isUserLoading: boolean;
};

const AuthContext = createContext<ContextType>({
  user: UserEntity.new(),
  setUser: () => {},
  isUserLoading: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserEntity>(UserEntity.new());
  const [userUid, setUserUid] = useState<string>('');

  const { isLoading: isUserLoading } = useQuery({
    queryKey: [ApiRequestEnums.GetUser],
    queryFn: () => userRepository.getById(userUid),
    enabled: !!userUid,
    onSuccess: (retrievedUser) => {
      console.log('retrievedUser---------------------', retrievedUser);
      setUser(retrievedUser);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('Error userRepository.getById in useAuth', error);
    },
    staleTime: oneHourInMilliseconds,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        Cookies.remove(sessionCookieName);
        setUserUid('');
        return;
      }

      const isFirstConnexion = isFirebaseUserFirstConnexion(
        // @ts-ignore
        firebaseUser.metadata.createdAt || '0'
      );

      if (isFirstConnexion) {
        // is handled in usecases
        return;
      }

      setUserUid(firebaseUser?.uid || '');
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
