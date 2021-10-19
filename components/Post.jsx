import { useRouter } from "next/dist/client/router";
import Image from "next/image";

export default function Post({ post }) {
  const router = useRouter();
  return (
    <div
      className="shadow-lg rounded-lg lg:rounded-xl bg-white w-full col-span-full md:col-span-1 cursor-pointer hover:scale-95 transition transform duration-300 ease-in active:scale-75 active:shadow-2xl select-none overflow-hidden"
      onClick={() => router.push(`/blog/${post.slug}`)}
    >
      {post.frontmatter?.cover_image && (
        <div className="relative h-80 md:h-70 w-full">
          <Image
            objectFit="cover"
            layout="fill"
            src={post.frontmatter.cover_image}
            className="rounded-t-lg"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-2xl font-bold text-gray-900">{post.frontmatter.title}</h3>
        <p className="mb-2 font-medium text-blue-500 text-lg">{post.frontmatter.arthur}</p>
        <p className="text-gray-600">{post.frontmatter.excerpt}</p>
      </div>
    </div>
  );
}
