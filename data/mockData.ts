import { Stream } from '../types';

export const initialStreams: Stream[] = [
  {
    id: 'stream-1',
    author: { id: 'user-1', nickname: 'Thinker' },
    body: "Is it just me, or does time feel like it's speeding up the older you get? It's a strange and unsettling phenomenon.",
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 23), // Expires in 23 hours
    visibility: 'global',
    comments: [
      {
        id: 'comment-1-1',
        author: { id: 'user-2', nickname: 'Observer' },
        body: 'Totally! It feels like last week was January, and now we are almost halfway through the year.',
        createdAt: new Date(Date.now() - 1000 * 60 * 4),
        replies: [
          {
            id: 'comment-1-1-1',
            author: { id: 'user-1', nickname: 'Thinker' },
            body: "Exactly! It's called the 'holiday paradox' or something. Your brain encodes new experiences but routine days just blur together.",
            createdAt: new Date(Date.now() - 1000 * 60 * 3),
            replies: [],
          },
        ],
      },
      {
        id: 'comment-1-2',
        author: { id: 'user-3' },
        body: "I try to do something new every week to combat this. It helps a little.",
        createdAt: new Date(Date.now() - 1000 * 60 * 2),
        replies: [],
      }
    ],
  },
  {
    id: 'stream-2',
    author: { id: 'user-4' },
    body: "Just finished a marathon of a classic sci-fi show. It's amazing how well some of the old practical effects still hold up today.",
    createdAt: new Date(Date.now() - 1000 * 60 * 12),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 6), // Expires in 6 hours
    visibility: 'global',
    comments: [],
  },
  {
    id: 'stream-3',
    author: { id: 'user-5', nickname: 'Wanderer' },
    body: "That feeling when you discover a new song and you just have to listen to it on repeat for three days straight.",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    expiresAt: new Date(Date.now() + 1000 * 60 * 30), // Expires in 30 minutes
    visibility: 'friends',
    comments: [
        {
            id: 'comment-3-1',
            author: { id: 'user-6', nickname: 'DJ' },
            body: 'Yes! What song is it? Share the goods!',
            createdAt: new Date(Date.now() - 1000 * 60 * 25),
            replies: [],
        }
    ],
  },
];