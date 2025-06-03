'use client';
import { useState } from 'react';
import { User } from '@/types/user';

export default function AddUserPage() {
  const [user, setUser] = useState<User>({ id: 0, name: '', email: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.name || !user.email) {
      setError("All fields required");
      return;
    }

    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user)
    });

    if (res.ok) {
      alert("User added!");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input className="border p-2 w-full" type="text" placeholder="Name" onChange={e => setUser({...user, name: e.target.value})} />
      <input className="border p-2 w-full" type="email" placeholder="Email" onChange={e => setUser({...user, email: e.target.value})} />
      {error && <p className="text-red-500">{error}</p>}
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Add User</button>
    </form>
  );
}
