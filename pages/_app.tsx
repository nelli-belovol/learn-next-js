import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import { StrictMode } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <StrictMode>
      <Head>
        <title>My top - наш лучший топ</title>
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
        <meta property='og:locale' content='ru_RU' />
      </Head>
      <Component {...pageProps} />
    </StrictMode>
  );
}

export default MyApp;
