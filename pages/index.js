import fs from "fs";
import Head from "next/head";
import path from "path";
import Footer from "../components/Footer";
import matter from "gray-matter";
import Post from "../components/Post";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>My Blog</title>
      </Head>

      <main className="bg-blue-100 min-h-screen">
        <div className="px-4 container mx-auto py-9 grid md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-4 items-start">
          {posts.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownMeta = fs.readFileSync(path.join("posts", filename), "utf-8");

    const { data: frontmatter } = matter(markdownMeta);

    return { slug, frontmatter };
  });

  return {
    props: {
      posts,
    },
  };
}
