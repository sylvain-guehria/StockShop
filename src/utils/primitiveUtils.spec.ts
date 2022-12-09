import { parseBoolean } from './primitiveUtils';

describe('parseBoolean', () => {
  test('returns true when the input is "true"', () => {
    const result = parseBoolean('true');
    expect(result).toBe(true);
  });

  test('returns false when the input is "false"', () => {
    const result = parseBoolean('false');
    expect(result).toBe(false);
  });

  test('returns undefined when the input is not "true" or "false"', () => {
    const result = parseBoolean('foo');
    expect(result).toBeUndefined();
  });

  test('returns the original boolean value when the input is a boolean', () => {
    const resultTrue = parseBoolean(true);
    const resultFalse = parseBoolean(false);
    expect(resultTrue).toBe(true);
    expect(resultFalse).toBe(false);
  });
});
