export const getKeysWithValues = (obj: any): string[] => {
  if (!obj) return [];
  const keysWithValue: string[] = [];
  Object.keys(obj).forEach((key) => {
    if (obj[key] || obj[key] === 0 || obj[key] === false) {
      keysWithValue.push(key);
    }
  });
  return keysWithValue;
};
