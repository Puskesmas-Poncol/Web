import Header from "@/components/layouts/header";
import Sidebar from "@/components/layouts/sidebar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/assets/magetan.png" sizes="tiny" />
        <title>PUSKESMAS PONCOL</title>
      </Head>
      <body className="overflow-x-hidden relative">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
