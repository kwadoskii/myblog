import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center w-full h-12 px-3 py-2 text-2xl font-semibold text-white bg-blue-500 shadow-lg cursor-pointer md:h-16">
      <Link passHref href="/">
        <a className="hover:opacity-95">My Blog</a>
      </Link>
    </header>
  );
}
