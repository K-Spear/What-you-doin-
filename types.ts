
export interface User {
  id: string;
  nickname?: string; // Optional session nickname
}

export interface Comment {
  id: string;
  author: User;
  body: string;
  createdAt: Date;
  replies: Comment[];
}

export type FeedMode = 'global' | 'friends';

export interface Stream {
  id: string;
  author: User;
  body: string;
  createdAt: Date;
  expiresAt: Date;
  visibility: FeedMode;
  comments: Comment[];
}