'use client';
import { useState, useEffect } from 'react';
import { BlogPost } from '@/types/blog';
import { User } from '@/types/user';

export default function AddBlog() {
  const [post, setPost] = useState<BlogPost>({ id: 0, title: '', content: '', authorId: 0, date: '' });
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/users').then(res => res.json()).then(setUsers);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post.title) {
      setError('Title is required'); 
      return;
    }

    post.id = Date.now();
    post.date = new Date().toISOString();

    await fetch('/api/blog', {
      method: 'POST',
      body: JSON.stringify(post)
    });

    alert("Post added!");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input className="border p-2 w-full" placeholder="Title" onChange={e => setPost({...post, title: e.target.value})} />
      <textarea className="border p-2 w-full" placeholder="Content" onChange={e => setPost({...post, content: e.target.value})} />
      <select className="border p-2 w-full" onChange={e => setPost({...post, authorId: Number(e.target.value)})}>
        <option>Select Author</option>
        {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
      </select>
      {error && <p className="text-red-500">{error}</p>}
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Add Post</button>
    </form>
  );
}
