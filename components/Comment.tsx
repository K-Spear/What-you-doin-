import React, { useState } from 'react';
import { Comment as CommentType } from '../types';
import CommentThread from './CommentThread';
import { SendIcon } from './icons';
import { useTranslation } from '../hooks/useTranslation';

interface CommentProps {
  comment: CommentType;
  streamId: string;
  onAddComment: (streamId: string, body: string, parentId?: string) => void;
  level: number;
}

const Comment: React.FC<CommentProps> = ({ comment, streamId, onAddComment, level }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const { displayText, isTranslating, isTranslated } = useTranslation(comment.body);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim()) {
      onAddComment(streamId, replyText.trim(), comment.id);
      setReplyText('');
      setIsReplying(false);
    }
  };

  const timeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
  };

  return (
    <div className="flex gap-3">
      <div className="w-1 bg-slate-700 rounded-full"></div>
      <div className="flex-1">
        <div className="text-sm text-slate-400 mb-1">
          <span>@{comment.author.nickname || 'Anonymous'}</span>
          <span className="mx-2">&middot;</span>
          <span>{timeAgo(comment.createdAt)}</span>
          {isTranslating && <span className="ml-2 text-xs text-slate-500">translating...</span>}
          {isTranslated && <span className="ml-2 text-xs text-cyan-500/50">(translated)</span>}
        </div>
        <p className="text-slate-200 whitespace-pre-wrap">{displayText}</p>
        
        <div className="flex items-center gap-4 mt-2">
            {level < 1 && ( // Allow replying only on top-level comments (max 2-deep thread)
            <button
                onClick={() => setIsReplying(!isReplying)}
                className="text-xs text-cyan-500 hover:underline"
            >
                {isReplying ? 'Cancel' : 'Reply'}
            </button>
            )}
        </div>

        {isReplying && (
          <form onSubmit={handleReplySubmit} className="mt-2">
            <div className="flex items-center gap-2 bg-slate-700/50 rounded-full p-1 border border-slate-600 focus-within:border-cyan-500">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Replying to @${comment.author.nickname || 'Anonymous'}`}
                className="w-full bg-transparent px-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 flex items-center justify-center transition-colors disabled:bg-slate-600"
                disabled={!replyText.trim()}
                aria-label="Send reply"
              >
                <SendIcon className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            <CommentThread
              comments={comment.replies}
              streamId={streamId}
              onAddComment={onAddComment}
              level={level + 1}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;