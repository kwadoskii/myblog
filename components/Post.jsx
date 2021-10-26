import Link from "next/link";

export default function Post({ post }) {
  return (
    <Link passHref href={`/blog/${post._id}`}>
      <a
        className={`w-full overflow-hidden transition duration-200 ease-linear transform bg-white rounded-lg shadow-lg select-none lg:rounded-xl col-span-full md:col-span-1 hover:scale-105 hover:shadow-2xl hover:ring-1 ring-blue-300 ${
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
      >
        <div>
          {post.coverImage && (
            <div className="relative w-full h-80 md:h-70">
              <img
                src={post.coverImage}
                className="absolute top-0 bottom-0 left-0 right-0 w-full h-full rounded-t-lg"
                alt=""
              />
            </div>
          )}

          <div className="px-3 py-2">
            <h3 className="text-lg font-bold text-gray-900 md:w-[32ch] line-clamp-3">
              {post.title}
            </h3>
            <p className="my-1 text-lg font-normal text-blue-500">{`${post.arthur?.firstname} ${post.arthur?.lastname}`}</p>
            <p className="font-normal text-gray-600 line-clamp-2">{post.excerpt}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
