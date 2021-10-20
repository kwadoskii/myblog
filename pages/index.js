// import fs from "fs";
import Head from "next/head";
// import path from "path";
import Footer from "../components/Footer";
import matter from "gray-matter";
import Post from "../components/Post";
import { server } from "../configs/server";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>My Blog</title>
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

export async function getStaticProps() {
  // const files = fs.readdirSync(path.join("posts"));

  // const posts = files.map((filename) => {
  //   const slug = filename.replace(".md", "").split(" ").join("-");
  //   const markdownMeta = fs.readFileSync(path.join("posts", filename), "utf-8");

  //   const { data: frontmatter } = matter(markdownMeta);

  //   return { slug, frontmatter };
  // });

  let { data: posts } = await fetch(`${server}/api/posts`, {
    method: "GET",
  }).then((res) => res.json());

  posts = posts.map((post) => {
    const { data: frontmatter } = matter(post);
    // const slug = frontmatter.title.split(" ").join("-");
    const slug = post._id;

    return { slug, frontmatter };
  });

  return {
    props: {
      posts,
    },
  };
}
