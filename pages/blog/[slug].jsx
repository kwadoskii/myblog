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

      <main className="bg-blue-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h3 className="text-gray-800 text-2xl font-semibold">{title}</h3>
          <p>posted on {date}</p>

          {cover_image && (
            <div className="h-40 w-40 relative">
              <Image src={cover_image} objectFit="cover" layout="fill" className="rounded-lg" />
            </div>
          )}
          <div
            className="prose prose-lg lg:prose-xl max-w-7xl prose-blue bg-white mx-auto p-8 lg:p-16 rounded-lg"
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
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(path.join("posts", slug + ".md"), "utf-8");

  const { content, data: frontmatter } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
