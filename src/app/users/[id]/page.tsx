'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { User } from '@/types/user';

export default function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('/api/users').then(res => res.json()).then(data => {
      const found = data.find((u: User) => u.id === Number(id));
      setUser(found);
    });
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
