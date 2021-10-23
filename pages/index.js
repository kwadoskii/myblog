import Head from "next/head";
import Footer from "../components/Footer";
import Post from "../components/Post";
import { server } from "../configs/server";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Home - My Blog</title>
      </Head>

      <main className="min-h-screen bg-blue-50">
        <div className="container grid justify-center p-3 mx-auto md:px-4 md:py-9 gap-y-5 gap-x-4 grid-cols-auto-fill auto-rows-10px">
          {posts.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const { data: posts } = await fetch(`${server}/api/posts`, {
    method: "GET",
  }).then((res) => res.json());

  return {
    props: {
      posts,
    },
  };
}
