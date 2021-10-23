import Head from "next/head";
import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";
import { server } from "../../configs/server";
import { AvatarGenerator } from "random-avatar-generator";

export default function PostPage({ content, post }) {
  const md = new Remarkable({ typographer: true });
  md.use(linkify);
  const createdAt = new Date(post.createdAt);
  const generator = new AvatarGenerator();

  return (
    <>
      <Head>
        <title>{`${post.title} - My Blog`}</title>
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

            <div className="p-5 px-8 lg:p-12">
              <div>
                <h3 className="mb-3 text-3xl font-black text-gray-800 md:font-black md:text-5xl">
                  {post.title}
                </h3>
                <div className="flex items-center gap-5 my-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9">
                      <img
                        src={generator.generateRandomAvatar(post.arthur.username)}
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                    <p className="px-2 py-0.5 font-medium bg-gray-200 rounded-md">
                      {"@" + post.arthur.username}
                    </p>
                  </div>
                  <p className="text-gray-600 ">
                    posted on{" "}
                    {post.createdAt.substr(0, 10) +
                      ", " +
                      createdAt.getHours() +
                      ":" +
                      createdAt.getMinutes()}
                  </p>
                </div>
                <hr className="mb-4 text-gray-300 md:mb-8" />
              </div>

              <div
                className="mx-auto prose md:prose-lg lg:prose-xl prose-blue"
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
  const { data } = await fetch(`${server}/api/posts/${slug}`, { method: "GET" }).then((res) =>
    res.json()
  );

  //increment post view counts
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
