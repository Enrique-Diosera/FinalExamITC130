'use client';

import { useEffect, useState } from 'react';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/api/blog').then(res => res.json()).then(setPosts);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-br from-slate-100 to-white min-h-screen">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-14">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-6 sm:mb-0">
          ✍️ Latest Articles
        </h1>
        <Link
          href="/blog/add"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:from-purple-600 hover:to-pink-600 transition-transform duration-300"
          aria-label="Add new blog post"
        >
          + Write Post
        </Link>
      </header>

      {posts.length === 0 ? (
        <div className="text-center mt-24 text-gray-500 text-lg animate-pulse">
          💤 No blog posts yet. Be the first to create one!
        </div>
      ) : (
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 transition-transform hover:shadow-2xl hover:-translate-y-1 duration-300"
            >
              <header>
                <h2 className="text-2xl font-bold text-gray-800 hover:text-pink-600 transition-colors duration-200">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                <time
                  dateTime={post.date}
                  className="block text-sm text-gray-400 mt-2"
                >
                  {new Date(post.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </header>

              <p className="text-gray-700 mt-4 mb-6 line-clamp-4 leading-relaxed">
                {post.content.length > 140 ? post.content.slice(0, 140) + '...' : post.content}
              </p>

              <footer className="flex justify-between items-center">
                <Link
                  href={`/blog/${post.id}`}
                  className="text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors"
                >
                  Continue reading →
                </Link>
              </footer>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
