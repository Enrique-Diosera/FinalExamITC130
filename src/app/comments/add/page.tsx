'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    name: string;
}

interface Post {
    id: string;
    title: string;
}

interface Comment {
    id: string;
    postID: string;
    userID: string;
    body: string;
    createdAt: Date;
}

export default function AddCommentPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);

    const [userID, setUserID] = useState('');
    const [postID, setPostID] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Fetch users
        fetch('/api/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error('Failed to fetch users', err));

        // Fetch posts
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error('Failed to fetch posts', err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newComment: Omit<Comment, 'id'> = {
            userID,
            postID,
            body,
            createdAt: new Date(),
        };

        const res = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment),
        });

        if (res.ok) {
            router.push('/comments');
        } else {
            alert('Failed to submit comment');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Add Comment</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Select User</label>
                    <select
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    >
                        <option value="">-- Select User --</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Select Post</label>
                    <select
                        value={postID}
                        onChange={(e) => setPostID(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    >
                        <option value="">-- Select Post --</option>
                        {posts.map((post) => (
                            <option key={post.id} value={post.id}>
                                {post.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Comment</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        rows={4}
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit Comment
                </button>
            </form>
        </div>
    );
}
