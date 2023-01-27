export const parseBoolean = (value: string | boolean): boolean | undefined => {
  if (typeof value === 'boolean') {
    return value;
  }
  // eslint-disable-next-line no-nested-ternary
  return value === 'true' ? true : value === 'false' ? false : undefined;
};

export const isNumber = (input: any): boolean => {
  // eslint-disable-next-line no-restricted-globals
  return typeof input === 'number' && !isNaN(input);
};

export const asNumber = (input: any): number | null => {
  if (isNumber(input)) return input;
  if (typeof input === 'string') {
    const parsedInput = parseInt(input, 10);
    if (isNumber(parsedInput)) return parsedInput;
  }
  return null;
};
