import { asNumber, isNumber, parseBoolean } from './primitiveUtils';

describe('parseBoolean', () => {
  test('returns true when the input is "true"', () => {
    const result = parseBoolean('true');
    expect(result).toBe(true);
  });

  test('returns false when the input is "false"', () => {
    const result = parseBoolean('false');
    expect(result).toBe(false);
  });

  test('returns the original boolean value when the input is a boolean', () => {
    const resultTrue = parseBoolean(true);
    const resultFalse = parseBoolean(false);
    expect(resultTrue).toBe(true);
    expect(resultFalse).toBe(false);
  });

  test('returns undefined when the input is not a boolean', () => {
    const result = parseBoolean(1);
    expect(result).toBe(undefined);
    const result2 = parseBoolean({});
    expect(result2).toBe(undefined);
    const result3 = parseBoolean([]);
    expect(result3).toBe(undefined);
    const result4 = parseBoolean(null);
    expect(result4).toBe(undefined);
    const result5 = parseBoolean(undefined);
    expect(result5).toBe(undefined);
  });
  test('returns undefined when the input is not string true or false', () => {
    const result = parseBoolean('hello');
    expect(result).toBe(undefined);
  });
});

describe('isNumber function tests', () => {
  test('Should return true for positive integers', () => {
    expect(isNumber(5)).toBe(true);
  });

  test('Should return true for zero', () => {
    expect(isNumber(0)).toBe(true);
  });

  test('Should return true for negative integers', () => {
    expect(isNumber(-5)).toBe(true);
  });

  test('Should return true for decimal numbers', () => {
    expect(isNumber(5.5)).toBe(true);
  });

  test('Should return true for infinity', () => {
    expect(isNumber(Infinity)).toBe(true);
  });

  test('Should return false for strings', () => {
    expect(isNumber('5')).toBe(false);
  });

  test('Should return false for NaN', () => {
    expect(isNumber(NaN)).toBe(false);
  });

  test('Should return false for undefined', () => {
    expect(isNumber(undefined)).toBe(false);
  });

  test('Should return false for null', () => {
    expect(isNumber(null)).toBe(false);
  });
});

describe('asNumber function tests', () => {
  test('Should return the same number for input number', () => {
    expect(asNumber(5)).toBe(5);
  });

  test('Should return the parsed number for input string', () => {
    expect(asNumber('5')).toBe(5);
  });

  test('Should return null for NaN', () => {
    expect(asNumber(NaN)).toBe(null);
  });

  test('Should return null for non-number string', () => {
    expect(asNumber('hello')).toBe(null);
  });

  test('Should return null for an object', () => {
    expect(asNumber({})).toBe(null);
  });
});
