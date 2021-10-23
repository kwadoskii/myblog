import Header from "../components/Header";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
