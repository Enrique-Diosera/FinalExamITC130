'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BlogPost } from '@/types/blog';

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch('/api/blog').then(res => res.json()).then(data => {
      const found = data.find((p: BlogPost) => p.id === Number(id));
      setPost(found);
    });
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-sm">{new Date(post.date).toLocaleDateString()}</p>
      <p className="mt-4">{post.content}</p>
    </div>
  );
}
