import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import { StrictMode } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <StrictMode>
      <Head>
        <title>My top - наш лучший топ</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,700;1,600&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Component {...pageProps} />
    </StrictMode>
  );
}

export default MyApp;
