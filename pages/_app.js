import { SessionProvider } from "next-auth/react";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

import "../styles/globals.css";

const progress = new ProgressBar({
  size: 5,
  color: "#a5c3f5eb",
  delay: 100,
  className: "z-[60]",
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
