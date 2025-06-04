// types/comment.ts
export interface Comment {
    id: string;
    postID: string;
    userID: string;
    body: string;
    createdAt: Date;
}
