'use client';

import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import Link from 'next/link';

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-br from-slate-100 to-white min-h-screen">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-14">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-6 sm:mb-0">
          👥 Users
        </h1>
        <Link
          href="/users/add"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:from-purple-600 hover:to-pink-600 transition-transform duration-300"
          aria-label="Add new user"
        >
          + Add User
        </Link>
      </header>

      {users.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-200 bg-white/90 backdrop-blur-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-pink-50/50 transition duration-200 cursor-pointer">
                  <td className="px-6 py-4 text-gray-700">{user.id}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/users/${user.id}`}
                      className="text-purple-600 hover:underline font-medium"
                    >
                      {user.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-24 text-gray-500 text-lg animate-pulse">
          🫥 No users found.
        </p>
      )}
    </div>
  );
}
