import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
