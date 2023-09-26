/* eslint-disable no-restricted-syntax */
// @ts-nocheck
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

// default tailwind breakpoints
// 'sm': '640px',
// 'md': '768px',
// 'lg': '1024px',
// 'xl': '1280px',

export const getBreakpointValue = (value: string): number =>
  +fullConfig.theme.screens[value].slice(
    0,
    fullConfig.theme.screens[value].indexOf('px'),
  );

/**
 *- return one of the breakpoint but undefined if under the first break point (sm)
 */
export const getCurrentBreakpoint = (): string => {
  let currentBreakpoint: string;
  let biggestBreakpointValue = 0;
  for (const breakpoint of Object.keys(fullConfig.theme.screens)) {
    const breakpointValue = getBreakpointValue(breakpoint);
    if (
      breakpointValue > biggestBreakpointValue &&
      window.innerWidth >= breakpointValue
    ) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint;
    }
  }
  return currentBreakpoint;
};
