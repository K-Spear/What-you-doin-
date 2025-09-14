import React, { useState, useEffect } from 'react';
import { FeedMode } from '../types';
import { GlobeIcon, UsersIcon } from './icons';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (body: string, durationMinutes: number, visibility: FeedMode) => void;
}

const MAX_CHARS = 140;

const durationOptions = [
  { label: '5m', minutes: 5 },
  { label: '1h', minutes: 60 },
  { label: '6h', minutes: 360 },
  { label: '24h', minutes: 1440 },
];

const ComposeModal: React.FC<ComposeModalProps> = ({ isOpen, onClose, onPost }) => {
  const [body, setBody] = useState('');
  const [duration, setDuration] = useState(durationOptions[2].minutes); // Default to 6h
  const [visibility, setVisibility] = useState<FeedMode>('global');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  const handlePost = () => {
    if (body.trim() && body.length <= MAX_CHARS) {
      onPost(body.trim(), duration, visibility);
      setBody('');
    }
  };

  if (!isOpen) {
    return null;
  }

  const charsLeft = MAX_CHARS - body.length;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-20 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-6 border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-slate-100 mb-4">
          What's on your mind?
        </h2>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Let your thoughts flow... they won't last forever."
          className="w-full h-32 p-3 bg-slate-900 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          maxLength={MAX_CHARS}
          autoFocus
        ></textarea>

        <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
                <label className="text-sm font-semibold text-slate-400 mb-2 block">Duration</label>
                <div className="flex items-center gap-2">
                    {durationOptions.map(opt => (
                        <button 
                            key={opt.minutes}
                            onClick={() => setDuration(opt.minutes)}
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${duration === opt.minutes ? 'bg-cyan-500 text-slate-900 font-bold' : 'bg-slate-700 hover:bg-slate-600'}`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                 <label className="text-sm font-semibold text-slate-400 mb-2 block">Visibility</label>
                 <div className="bg-slate-900 p-1 rounded-lg flex items-center w-full">
                    <button 
                        onClick={() => setVisibility('global')}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-1 text-sm rounded-md transition-colors ${visibility === 'global' ? 'bg-slate-700 text-cyan-400' : 'text-slate-400 hover:bg-slate-600'}`}
                    >
                       <GlobeIcon className="w-4 h-4" /> Global
                    </button>
                    <button 
                        onClick={() => setVisibility('friends')}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-1 text-sm rounded-md transition-colors ${visibility === 'friends' ? 'bg-slate-700 text-cyan-400' : 'text-slate-400 hover:bg-slate-600'}`}
                    >
                       <UsersIcon className="w-4 h-4" /> Friends
                    </button>
                 </div>
            </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-700">
          <span className={`text-sm ${charsLeft < 20 ? 'text-yellow-400' : 'text-slate-400'}`}>
            {charsLeft} characters left
          </span>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-100 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePost}
              disabled={!body.trim()}
              className="px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeModal;