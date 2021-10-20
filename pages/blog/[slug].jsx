// import fs from "fs";
import matter from "gray-matter";
// import path from "path";
import Head from "next/head";
import marked from "marked";
import Image from "next/image";

export default function PostPage({ frontmatter: { title, date, cover_image }, content }) {
  return (
    <>
      <Head>
        <title>{`${title} - My Blog`}</title>
      </Head>

      <main className="min-h-screen bg-blue-50">
        <div className="container p-2 mx-auto lg:px-4 lg:py-8">
          <div className="w-full mx-auto bg-white rounded-lg shadow-xl lg:w-3/4">
            {cover_image && (
              <div className="relative w-full h-64 lg:h-[32rem]">
                {/* <Image src={cover_image} objectFit="cover" layout="fill" className="rounded-lg" /> */}
                <img
                  src={cover_image}
                  className="absolute top-0 bottom-0 left-0 right-0 w-full h-full rounded-t-lg"
                  alt=""
                />
              </div>
            )}

            <div className="p-3 lg:p-16">
              <h3 className="mb-3 text-2xl font-black text-gray-800 md:font-black lg:text-5xl">
                {title}
              </h3>
              <p className="my-2 mb-6 text-lg text-gray-600">posted on {date}</p>
              <div
                className="mx-auto prose prose-lg lg:prose-xl prose-blue"
                dangerouslySetInnerHTML={{ __html: marked(content) }}
              ></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  // const files = fs.readdirSync(path.join("posts"));
  // const paths = files.map((filename) => ({
  //   params: {
  //     slug: filename.replace(".md", "").split(" ").join("-"),
  //   },
  // }));

  const { data: post } = await fetch("http://localhost:3000/api/posts", { method: "GET" }).then(
    (res) => res.json()
  );

  const paths = post.map((p) => ({
    params: {
      slug: p._id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  // const markdownWithMeta = fs.readFileSync(
  //   path.join("posts", `${slug.replace(/-/g, " ")}.md`),
  //   "utf-8"
  // );

  const {
    data: { content: markdownWithMeta },
  } = await fetch(`http://localhost:3000/api/posts/${slug}`, { method: "GET" }).then((res) =>
    res.json()
  );

  //increment post view counts

  const { content, data: frontmatter } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
