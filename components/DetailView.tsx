import React, { useState, useEffect } from 'react';
import { Stream } from '../types';
import { BackIcon, SendIcon, ClockIcon } from './icons';
import CommentThread from './CommentThread';
import { useTranslation } from '../hooks/useTranslation';
import { useTimeRemaining } from '../hooks/useTimeRemaining';

interface DetailViewProps {
  stream: Stream;
  onBack: () => void;
  onAddComment: (streamId: string, body: string, parentId?: string) => void;
}

const DetailView: React.FC<DetailViewProps> = ({ stream, onBack, onAddComment }) => {
  const [commentText, setCommentText] = useState('');
  const { displayText } = useTranslation(stream.body);
  const { timeRemaining, isExpired } = useTimeRemaining(stream.expiresAt);

  useEffect(() => {
    if (isExpired) {
      onBack();
    }
  }, [isExpired, onBack]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(stream.id, commentText.trim());
      setCommentText('');
    }
  };
  
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
  }).format(stream.createdAt);

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <BackIcon className="w-5 h-5" />
          Back to Streams
        </button>
        <div className="flex items-center gap-2 text-sm text-yellow-400 bg-yellow-900/50 px-3 py-1 rounded-full">
            <ClockIcon className="w-4 h-4"/>
            <span>{timeRemaining} remaining</span>
        </div>
      </div>
      
      <div className="bg-slate-800 rounded-lg p-5">
        <div className="flex justify-between items-center text-sm text-slate-400 mb-4">
          <span>@{stream.author.nickname || 'Anonymous'}</span>
          <time>{formattedTime}</time>
        </div>
        <p className="text-xl text-slate-100 leading-relaxed whitespace-pre-wrap">{displayText}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-300 mb-4 border-b border-slate-700 pb-2">Thread</h2>
        <CommentThread comments={stream.comments} streamId={stream.id} onAddComment={onAddComment} />
      </div>

      <form onSubmit={handleCommentSubmit} className="mt-8 sticky bottom-4">
        <div className="flex items-center gap-2 bg-slate-800 rounded-full p-2 border border-slate-700 focus-within:border-cyan-500 transition-colors">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add to the thread..."
            className="w-full bg-transparent px-3 text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 flex items-center justify-center transition-colors disabled:bg-slate-600"
            disabled={!commentText.trim()}
            aria-label="Send comment"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailView;