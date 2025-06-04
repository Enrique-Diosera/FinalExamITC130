// app/api/blog/route.ts

import { NextResponse } from 'next/server';
import { BlogPost } from '@/types/blog';

(globalThis as any).blogPosts = (globalThis as any).blogPosts || [];

const blogPosts: BlogPost[] = (globalThis as any).blogPosts;

export async function GET() {
  return NextResponse.json(blogPosts);
}

export async function POST(req: Request) {
  const newPost: BlogPost = await req.json();
  blogPosts.push(newPost);
  return NextResponse.json(newPost);
}
