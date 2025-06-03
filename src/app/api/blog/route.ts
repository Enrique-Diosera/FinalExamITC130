import { NextResponse } from 'next/server';
import { BlogPost } from '@/types/blog';

let blogPosts: BlogPost[] = [];

export async function GET() {
  return NextResponse.json(blogPosts);
}

export async function POST(req: Request) {
  const newPost: BlogPost = await req.json();
  blogPosts.push(newPost);
  return NextResponse.json(newPost);
}
