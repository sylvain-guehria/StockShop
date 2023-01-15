import React, { createContext, useContext, useState } from 'react';

import UserEntity from '@/modules/user/UserEntity';

// const oneHourInMilliseconds = 1000 * 60 * 60;

type ContextType = {
  user: UserEntity;
  setUser: (user: UserEntity) => void;
  reinitializeUser: () => void;
  // setUserUid: (userUid: string) => void;
  // isUserLoading: boolean;
};

const AuthContext = createContext<ContextType>({
  user: UserEntity.new(),
  setUser: () => {},
  reinitializeUser: () => {},
  // setUserUid: () => {},
  // isUserLoading: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserEntity>(UserEntity.new());

  const reinitializeUser = () => {
    setUser(UserEntity.new());
  };
  // const [userUid, setUserUid] = useState<string>('');

  // const { isLoading: isUserLoading } = useQuery({
  //   queryKey: [ApiRequestEnums.GetUser, { userUid }],
  //   queryFn: () => userRepository.getById(userUid),
  //   enabled: !!userUid,
  //   onSuccess: (retrievedUser) => {
  //     setUser(retrievedUser);
  //   },
  //   onError: (error) => {
  //     // eslint-disable-next-line no-console
  //     console.error('Error userRepository.getById in useAuth', error);
  //   },
  //   staleTime: oneHourInMilliseconds,
  // });

  return (
    <AuthContext.Provider value={{ user, setUser, reinitializeUser }}>
      {children}
    </AuthContext.Provider>
  );
};
