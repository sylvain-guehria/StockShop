export const parseBoolean = (value: any): boolean | undefined => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value !== 'string') return undefined;

  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
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
