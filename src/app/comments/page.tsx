'use client';

import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
}

interface Post {
  id: string;
  title: string;
}

export default function CommentPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedPost, setSelectedPost] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then(setUsers);

    fetch('/api/blog')
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userID: selectedUser,
        postID: selectedPost,
        body: commentBody,
      }),
    });

    if (res.ok) {
      setMessage('Comment submitted!');
      setCommentBody('');
    } else {
      setMessage('Failed to submit comment.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add Comment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Comment Author</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
            className="w-full border px-2 py-2 rounded"
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Post to Comment On</label>
          <select
            value={selectedPost}
            onChange={(e) => setSelectedPost(e.target.value)}
            required
            className="w-full border px-2 py-2 rounded"
          >
            <option value="">Select Post</option>
            {posts.map((post) => (
              <option key={post.id} value={post.id}>{post.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Comment</label>
          <textarea
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
        >
          Submit
        </button>

        {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
      </form>
    </div>
  );
}
