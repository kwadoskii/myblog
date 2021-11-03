import Head from "next/head";
import Footer from "../components/Footer";
import MansoryLayout from "../components/MansoryLayout";
import Post from "../components/Post";
import { server } from "../configs/server";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Home - My Blog</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta
          name="description"
          content="A place for reading stories, news and learning cool stuffs"
        />
        <meta name="keywords" content="tsb, kwadoskii, myblog, kw-my-blog" />

        {/* for facebook and or twitter */}
        <meta property="og:title" content="Home - My Blog" />
        <meta property="og:url" content={server} />
        <meta property="og:image" content={`${server}/images/logo.png`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="A place for reading stories, news and learning cool stuffs"
        />
        <meta property="og:locale" content="en_US" />

        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home - My Blog" />
        <meta name="twitter:url" content={server} />
        <meta
          name="twitter:description"
          content="A place for reading stories, news and learning cool stuffs"
        />
        <meta name="twitter:image" content={`${server}/images/logo.png`} />
      </Head>

      <main className="min-h-screen bg-blue-50">
        <MansoryLayout classes="max-w-6xl p-4 mx-auto md:px-7 md:py-9">
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </MansoryLayout>
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
