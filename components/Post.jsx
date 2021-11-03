import Link from "next/link";

export default function Post({ post }) {
  return (
    <Link passHref href={`/blog/${post._id}`}>
      <a
        className={`w-full overflow-hidden transition duration-200 ease-linear transform bg-white rounded-lg shadow-lg select-none lg:rounded-xl col-span-full md:col-span-1 hover:scale-105 hover:shadow-xl hover:ring-1 ring-blue-300  `}
      >
        <div>
          {post.coverImage && (
            <div
              className="relative w-full h-52 md:h-70"
              style={{
                background: `url(${post.coverImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              {/* <img
                src={post.coverImage}
                className="absolute top-0 bottom-0 left-0 right-0 w-full h-full rounded-t-lg"
                alt={post.title}
              /> */}
            </div>
          )}

          <div className="px-3 py-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-3">{post.title}</h3>
            <p className="my-1 text-lg font-normal text-blue-500">{`${post.arthur?.firstname} ${post.arthur?.lastname}`}</p>
            <p className="font-normal text-gray-600 line-clamp-2">{post.excerpt}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
