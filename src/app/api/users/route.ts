import { NextResponse } from 'next/server';
import { User } from '@/types/user';

let users: User[] = [];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const newUser: User = await req.json();
  newUser.id = Date.now();
  users.push(newUser);
  return NextResponse.json(newUser);
}
