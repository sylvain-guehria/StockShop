export const parseBoolean = (value: string | boolean): boolean | undefined => {
  if (typeof value === 'boolean') {
    return value;
  }
  // eslint-disable-next-line no-nested-ternary
  return value === 'true' ? true : value === 'false' ? false : undefined;
};
