export const methodMustBeImplemented = (...arg: unknown[]): Promise<Error> => {
  throw new Error(`You tried to call an abstract methode, arg: ${arg}`);
};
