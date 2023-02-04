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

export const removeKeysWithNoValues = (obj: any): any => {
  if (!obj) return {};
  const newObj = Object.fromEntries(
    Object.entries(obj).filter(
      ([_key, value]) => value !== null && value !== '' && value !== undefined
    )
  );
  return newObj;
};
