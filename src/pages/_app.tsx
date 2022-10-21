import '../styles/global.css';

import type { AppProps } from 'next/app';
// import App from 'next/app';
// import cookies from 'next-cookies';

const dev = process.env.NODE_ENV === 'development';
const server = dev ? 'http://localhost:3000' : 'https://mydomain.com/';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;

// MyApp.getInitialProps = async (appContext) => {
//   const { ctx } = appContext;
//   // Calls `getInitialProps` and fills `appProps.pageProps`
//   let error;
//   const appProps = await App.getInitialProps(appContext);

//   const { firebaseToken } = cookies(ctx);

//   // If token exists run Firebase validation on server side before rendering.
//   if (firebaseToken) {
//     try {
//       const headers = {
//         'Context-Type': 'application/json',
//         Authorization: JSON.stringify({ token: firebaseToken }),
//       };
//       const result = await fetch(`${server}/api/validate`, { headers }).then(
//         (res) => res.json()
//       );
//       return { ...result, ...appProps };
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   return { ...appProps };
// };
