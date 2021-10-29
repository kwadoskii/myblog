import Head from "next/head";
import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";
import { server } from "../../configs/server";
import { AvatarGenerator } from "random-avatar-generator";
import Link from "next/link";

export default function PostPage({ content, post }) {
  const md = new Remarkable({ typographer: true });
  md.use(linkify);
  const createdAt = new Date(post.createdAt);
  const generator = new AvatarGenerator();

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{`${post.title} - My Blog`}</title>

        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content="tsb, kwadoskii, myblog, tsb-test, kw-my-blog" />
        <meta name="author" content={`${post.arthur.firstname} ${post.arthur.lastname}`} />

        {/* for facebook and or twitter */}
        <meta property="og:title" content={post.title} />
        <meta property="og:url" content={`${server}/blog/${post._id}`} />
        <meta property="og:image" content={post.coverImage || `${server}/images/logo.png`} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:locale" content="en_US" />

        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tsb" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:url" content={`${server}/blog/${post._id}`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.coverImage || `${server}/images/logo.png`} />
        {/* useful for the individual creator twitter handle */}
        {/* <meta name="twitter:creator" content="@arthurusername"/>  */}
      </Head>

      <main className="min-h-screen bg-blue-50">
        <div className="max-w-6xl p-3 pb-6 mx-auto lg:px-4 lg:py-8">
          <div className="w-full mx-auto bg-white rounded-lg shadow-xl md:w-4/5 lg:3/4">
            {post.coverImage && (
              <div className="relative w-full h-64 md:h-[20rem] lg:h-[24rem]">
                <img
                  src={post.coverImage}
                  className="absolute top-0 bottom-0 left-0 right-0 w-full h-full rounded-t-lg"
                  alt=""
                />
              </div>
            )}

            <div className="p-4 lg:p-12">
              <div>
                <h3 className="mb-3 text-2xl font-black text-gray-800 md:font-black md:text-5xl">
                  {post.title}
                </h3>
                <div className="flex items-center gap-5 my-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9">
                      <img
                        src={generator.generateRandomAvatar(post.arthur.username)}
                        alt={post.title}
                        className="w-full h-full"
                      />
                    </div>
                    <p className="px-2 py-0.5 font-medium bg-gray-200 rounded-md">
                      {"@" + post.arthur.username}
                    </p>
                  </div>
                  <p className="text-gray-600 ">
                    posted on{" "}
                    {`${post.createdAt.substr(0, 10)}, ${
                      createdAt.getHours() > 9 ? createdAt.getHours() : "0" + createdAt.getHours()
                    }:${
                      createdAt.getMinutes() > 9
                        ? createdAt.getMinutes()
                        : "0" + createdAt.getMinutes()
                    }`}
                  </p>
                </div>
                <hr className="mb-4 text-gray-300 md:mb-8" />
              </div>

              <div
                className="mx-auto prose md:prose-lg lg:prose-xl prose-blue"
                dangerouslySetInnerHTML={{ __html: md.render(content) }}
              ></div>
              {post.source && (
                <Link passHref href={post.source}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-5 text-xs text-blue-500 hover:underline"
                  >
                    Visit source document
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ params: { slug } }) {
  const { data } = await fetch(`${server}/api/posts/${slug}`, { method: "GET" }).then((res) =>
    res.json()
  );

  if (!data) {
    return {
      notFound: true,
    };
  }

  const { content, ...post } = data;

  return {
    props: {
      content,
      post,
    },
  };
}
