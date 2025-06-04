import { NextRequest, NextResponse } from 'next/server';

interface Comment {
    id: string;
    postID: string;
    userID: string;
    body: string;
    createdAt: Date;
}

// Temporary in-memory store (reset on every dev restart)
let comments: Comment[] = [];

// Handle GET (return all comments)
export async function GET(req: NextRequest) {
    return NextResponse.json(comments);
}

// Handle POST (add a new comment)
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
