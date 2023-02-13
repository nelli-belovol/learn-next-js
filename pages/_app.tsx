import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import { StrictMode, useEffect } from "react";
import "../styles/globals.css";
import ym from "react-yandex-metrika";
import { YMInitializer } from "react-yandex-metrika";

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  router.events.on("routeChangeComplete", (url: string) => {
    if (typeof window !== "undefined") {
      ym("hit", url);
    }
  });

  return (
    <StrictMode>
      <Head>
        <title>My top - наш лучший топ</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://mc.yandex.ru' />
        <meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
        <meta property='og:locale' content='ru_RU' />
      </Head>
      <YMInitializer accounts={[]} options={{ webvisor: true, defer: true }} version='2' />
      <Component {...pageProps} />
    </StrictMode>
  );
}

export default MyApp;
