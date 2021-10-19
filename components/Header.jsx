import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-500 w-full py-2 px-3 text-2xl font-semibold cursor-pointer text-white shadow-lg ">
      <Link passHref href="/">
        <a className="hover:opacity-95">My Blog</a>
      </Link>
    </header>
  );
}
