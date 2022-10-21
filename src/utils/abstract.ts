export const methodMustBeImplemented = (...arg: unknown[]): void => {
  throw new Error(`You tried to call an abstract methode, arg: ${arg}`);
};
