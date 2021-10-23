// import fs from "fs";
import matter from "gray-matter";
// import path from "path";
import Head from "next/head";
import marked from "marked";
import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";
import Image from "next/image";
import { server } from "../../configs/server";

export default function PostPage({ content, post }) {
  const md = new Remarkable({ typographer: true });
  md.use(linkify);

  return (
    <>
      <Head>
        <title>{`${post.title} - My Blog`}</title>
      </Head>

      <main className="min-h-screen bg-blue-50">
        <div className="container p-2 mx-auto lg:px-4 lg:py-8">
          <div className="w-full mx-auto bg-white rounded-lg shadow-xl lg:w-3/4">
            {post.coverImage && (
              <div className="relative w-full h-64 lg:h-[32rem]">
                {/* <Image src={cover_image} objectFit="cover" layout="fill" className="rounded-lg" /> */}
                <img
                  src={post.coverImage}
                  className="absolute top-0 bottom-0 left-0 right-0 w-full h-full rounded-t-lg"
                  alt=""
                />
              </div>
            )}

            <div className="p-3 lg:p-16">
              <h3 className="mb-3 text-2xl font-black text-gray-800 md:font-black lg:text-5xl">
                {post.title}
              </h3>
              <p className="my-2 mb-6 text-lg text-gray-600">
                posted on {post.createdAt.substr(0, 10)}
              </p>
              <div
                className="mx-auto prose prose-lg lg:prose-xl prose-blue"
                dangerouslySetInnerHTML={{ __html: md.render(content) }}
              ></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// export async function getStaticPaths() {
//   // const files = fs.readdirSync(path.join("posts"));
//   // const paths = files.map((filename) => ({
//   //   params: {
//   //     slug: filename.replace(".md", "").split(" ").join("-"),
//   //   },
//   // }));

//   const { data: post } = await fetch(`${server}/api/posts`, { method: "GET" }).then((res) =>
//     res.json()
//   );

//   const paths = post.map((p) => ({
//     params: {
//       slug: p._id,
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params: { slug } }) {
  // const markdownWithMeta = fs.readFileSync(
  //   path.join("posts", `${slug.replace(/-/g, " ")}.md`),
  //   "utf-8"
  // );

  const { data } = await fetch(`${server}/api/posts/${slug}`, { method: "GET" }).then((res) =>
    res.json()
  );

  //increment post view counts

  if (!data) {
    return {
      notFound: true,
    };
  }

  const { content: markdownWithMeta, ...post } = data;
  const { content, data: frontmatter } = matter(markdownWithMeta);

  return {
    props: {
      content,
      post,
    },
  };
}
