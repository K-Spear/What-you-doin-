
import React from 'react';
import { Comment as CommentType } from '../types';
import Comment from './Comment';

interface CommentThreadProps {
  comments: CommentType[];
  streamId: string;
  onAddComment: (streamId: string, body: string, parentId?: string) => void;
  level?: number;
}

const CommentThread: React.FC<CommentThreadProps> = ({ comments, streamId, onAddComment, level = 0 }) => {
  if (!comments || comments.length === 0) {
      if(level === 0) return <p className="text-slate-500 text-center py-4">No comments yet. Start the conversation!</p>;
      return null;
  }

  return (
    <div className={`space-y-4 ${level > 0 ? 'pl-4' : ''}`}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          streamId={streamId}
          onAddComment={onAddComment}
          level={level}
        />
      ))}
    </div>
  );
};

export default CommentThread;
