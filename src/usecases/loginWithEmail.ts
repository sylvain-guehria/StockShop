export const loginWithEmail =
  () =>
  async (
    loginEmail: (email: string, password: string) => Promise<string>,
    { email, password }: LoginInfo
  ): Promise<string> => {
    return loginEmail(email, password);
  };

type LoginInfo = {
  email: string;
  password: string;
};
