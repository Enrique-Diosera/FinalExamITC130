import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/users">Users</Link>
      <Link href="/blog">Blog</Link>
    </nav>
  );
}
