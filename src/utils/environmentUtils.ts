export const isInBrowser = () => {
  return typeof window !== 'undefined';
};

export const isOnServer = () => {
  return !isInBrowser();
};

export const isGooglePageSpeed =
  isInBrowser() &&
  (window?.navigator?.userAgent?.includes('Chrome-Lighthouse') ||
    window?.navigator?.userAgent?.includes('Googlebot'));
