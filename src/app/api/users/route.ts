import { NextResponse } from 'next/server';
import { User } from '@/types/user';

// Global memory cache (reset only on full server restart)
(globalThis as any).users = (globalThis as any).users || [];

const users: User[] = (globalThis as any).users;

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const newUser: User = await req.json();
  newUser.id = Date.now(); // You can use crypto.randomUUID() for a better ID
  users.push(newUser);
  return NextResponse.json(newUser);
}
