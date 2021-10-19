import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Head from "next/head";
import marked from "marked";
import Image from "next/image";

export default function PostPage({ frontmatter: { title, date, cover_image }, content }) {
  return (
    <>
      <Head>
        <title>{`${title} - My Blog`}</title>
      </Head>

      <main className="min-h-screen bg-blue-100">
        <div className="container px-4 py-8 mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
          <p>posted on {date}</p>

          {cover_image && (
            <div className="relative w-40 h-40">
              {/* <Image src={cover_image} objectFit="cover" layout="fill" className="rounded-lg" /> */}
              <img
                src={cover_image}
                className="absolute top-0 bottom-0 left-0 right-0 w-full h-full rounded-t-lg"
                alt=""
              />
            </div>
          )}
          <div
            className="p-8 mx-auto prose prose-lg bg-white rounded-lg lg:prose-xl max-w-7xl prose-blue lg:p-16"
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          ></div>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", "").split(" ").join("-"),
    },
  }));

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", `${slug.replace(/-/g, " ")}.md`),
    "utf-8"
  );

  const { content, data: frontmatter } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
