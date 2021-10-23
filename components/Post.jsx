import { useRouter } from "next/dist/client/router";

export default function Post({ post }) {
  const router = useRouter();
  console.log(post.excerpt);
  return (
    <div
      className={`w-full overflow-hidden transition duration-300 ease-in transform bg-white rounded-lg shadow-lg cursor-pointer select-none lg:rounded-xl col-span-full md:col-span-1 hover:scale-95 active:scale-75 active:shadow-2xl ${
        !post.coverImage
          ? "row-end-small"
          : post.title.length < 27 && post.excerpt?.length < 40
          ? "row-end-medium"
          : post.title.length < 27 && post.excerpt?.length > 40
          ? "row-end-medium2"
          : post.title.length > 27 && post.title.length < 27 * 3 && post.excerpt?.length < 40
          ? "row-end-medium3"
          : "row-end-large"
      }`}
      onClick={() => router.push(`/blog/${post.slug}`)}
    >
      {post.coverImage && (
        <div className="relative w-full h-80 md:h-70">
          {/* <Image
            objectFit="cover"
            layout="fill"
            src={post.frontmatter.cover_image}
            className="rounded-t-lg"
          /> */}
          <img
            src={post.coverImage}
            className="absolute top-0 bottom-0 left-0 right-0 w-full h-full rounded-t-lg"
            alt=""
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-2xl font-bold text-gray-900 line-clamp-3">{post.title}</h3>
        <p className="my-2 text-lg font-medium text-blue-500">{`${post.arthur?.firstname} ${post.arthur?.lastname}`}</p>
        <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
      </div>
    </div>
  );
}
