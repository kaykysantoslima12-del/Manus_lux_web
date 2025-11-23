import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Manus Desagni LUX - Creative Platform with Neon Glow Design" />
        <meta name="theme-color" content="#0A0E27" />
      </Head>
      <body className="bg-neon-dark text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

