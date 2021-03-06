import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleSignInSignOut = () => {
    if (session) {
      return signOut();
    } else {
      localStorage.setItem("redirectUrl", location.href);
      return signIn("credentials");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-between w-full px-3 py-2 text-2xl font-semibold text-white bg-blue-500 shadow-lg h-14"></div>
    );
  }

  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
      </Head>
      <header className="sticky top-0 z-50 flex items-center bg-blue-500 shadow-lg h-14">
        <div className="flex items-center justify-between w-full max-w-6xl px-3 py-2 mx-auto text-2xl font-semibold text-white">
          <Link passHref href="/">
            <div>
              <a className="cursor-pointer hover:opacity-95">My Blog</a>
            </div>
          </Link>

          <div className="flex items-center gap-4 text-sm md:text-lg">
            {session && (
              <>
                <p>Welcome, {session.user.name.split(" ")[0]}</p>
                <Link passHref href="/new">
                  <a className="rounded-md px-3 py-0.5 ring-1 ring-white transition-all ease-linear hover:shadow-xl hover:bg-white hover:text-blue-500 duration-100 active:scale-90">
                    Write
                  </a>
                </Link>
              </>
            )}
            <button
              className="px-3 py-0.5  font-medium text-blue-500 bg-white outline-none ring-1 ring-white rounded-md transition-all ease-linear hover:shadow-lg hover:bg-opacity-90 active:scale-95 duration-100"
              onClick={handleSignInSignOut}
            >
              {session ? "Sign out" : "Sign in"}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
