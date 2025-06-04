import { NextRequest, NextResponse } from 'next/server';

interface Comment {
  id: string;
  postID: string;
  userID: string;
  body: string;
  createdAt: Date;
}

// Use globalThis to persist in-memory data during dev session
(globalThis as any).comments = (globalThis as any).comments || [];
const comments: Comment[] = (globalThis as any).comments;

export async function GET(req: NextRequest) {
  return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
  try {
    const { postID, userID, body, createdAt } = await req.json();

    if (!postID || !userID || !body) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newComment: Comment = {
      id: crypto.randomUUID(),
      postID,
      userID,
      body,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
    };

    comments.push(newComment);

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}
