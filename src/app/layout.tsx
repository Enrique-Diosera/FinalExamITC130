// app/layout.tsx

import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Final Exam",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-100 to-white text-gray-900 font-sans">
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">📘 FInal Exam</h1>
            <div className="space-x-4 text-sm sm:text-base">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/users"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Users
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Blog
              </Link>

              <Link
                href="/comments"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Comments
              </Link>


            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
