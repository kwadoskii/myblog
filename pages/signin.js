import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function signin({ csrfToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { query } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //use callback usl and redirect true to enable next auth do the redirect or handle it making reidirect false and returns a promise

    signIn("credentials", {
      username,
      password,

      callbackUrl: localStorage.getItem("redirectUrl"),
    });
  };

  return (
    <>
      <Head>
        <title>Signin - Myblog</title>
      </Head>

      <div className="bg-blue-50">
        <div className="flex items-center justify-center h-screen max-w-5xl gap-3 px-3 mx-auto">
          <div className="w-full py-6 bg-white rounded-lg shadow-lg md:w-2/4 lg:w-2/5">
            <form onSubmit={handleSubmit} className="w-full p-5">
              <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
              {query.error === "invalid_credentials" && (
                <div className="p-3 mb-5 bg-red-200 rounded-md">
                  <p className="text-center text-gray-800">Login failed: Invalid crendentials</p>
                </div>
              )}
              <div className="relative mx-auto mb-3 w-28 h-28">
                <Image
                  src="/images/logo.png"
                  layout="fill"
                  className="rounded-full"
                  objectFit="cover"
                />
              </div>

              <div className="flex flex-col my-2 text-sm text-blue-400">
                <label htmlFor="username" className="mb-1 font-medium">
                  username
                </label>
                <input
                  className="p-2 text-lg border rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                  type="text"
                  placeholder="johndoe"
                  id="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col my-2 text-sm text-blue-400">
                <label htmlFor="password" className="mb-1 font-medium">
                  password
                </label>
                <input
                  required
                  type="password"
                  className="p-2 text-lg border rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col mt-3">
                <button
                  type="submit"
                  className="p-2 py-2.5 text-white transition-all duration-150 ease-linear bg-blue-500 border rounded-md outline-none hover:opacity-90 active:scale-90 active:shadow-lg"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
