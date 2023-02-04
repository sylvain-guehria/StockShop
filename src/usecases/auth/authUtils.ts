export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';

  url = url.includes('http') ? url : `https://${url}`;

  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};
