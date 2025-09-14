import React, { useState } from 'react';
import { FeedMode } from '../types';
import { GlobeIcon, UsersIcon, SendIcon } from './icons';

interface ComposeBarProps {
  onPost: (body: string, durationMinutes: number, visibility: FeedMode) => void;
}

const MAX_CHARS = 140;

const durationOptions = [
  { label: '5m', minutes: 5 },
  { label: '1h', minutes: 60 },
  { label: '6h', minutes: 360 },
  { label: '24h', minutes: 1440 },
];

const ComposeBar: React.FC<ComposeBarProps> = ({ onPost }) => {
  const [body, setBody] = useState('');
  const [duration, setDuration] = useState(durationOptions[2].minutes); // Default to 6h
  const [visibility, setVisibility] = useState<FeedMode>('global');

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (body.trim() && body.length <= MAX_CHARS) {
      onPost(body.trim(), duration, visibility);
      setBody('');
    }
  };

  const charsLeft = MAX_CHARS - body.length;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-slate-900/50 backdrop-blur-md border-t border-slate-700/50">
      <div className="container mx-auto px-4 py-3">
        {/* Controls */}
        <div className="flex justify-between items-center mb-2 px-2">
            <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 mr-2">Duration:</span>
                {durationOptions.map(opt => (
                    <button 
                        key={opt.minutes}
                        onClick={() => setDuration(opt.minutes)}
                        className={`px-2 py-0.5 text-xs rounded-full transition-colors ${duration === opt.minutes ? 'bg-cyan-500 text-slate-900 font-bold' : 'bg-slate-700 hover:bg-slate-600'}`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
            <div className="bg-slate-800 p-0.5 rounded-lg flex items-center">
                <button 
                    onClick={() => setVisibility('global')}
                    className={`flex items-center justify-center gap-1 px-2 py-0.5 text-xs rounded-md transition-colors ${visibility === 'global' ? 'bg-slate-600 text-cyan-400' : 'text-slate-400'}`}
                >
                   <GlobeIcon className="w-3 h-3" /> Global
                </button>
                <button 
                    onClick={() => setVisibility('friends')}
                    className={`flex items-center justify-center gap-1 px-2 py-0.5 text-xs rounded-md transition-colors ${visibility === 'friends' ? 'bg-slate-600 text-cyan-400' : 'text-slate-400'}`}
                >
                   <UsersIcon className="w-3 h-3" /> Friends
                </button>
            </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handlePost}>
            <div className="flex items-center gap-2 bg-slate-800 rounded-full p-2 border border-slate-700 focus-within:border-cyan-500 transition-colors">
              <input
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Let your thoughts flow..."
                className="w-full bg-transparent px-3 text-slate-100 placeholder-slate-500 focus:outline-none"
                maxLength={MAX_CHARS}
              />
               <span className={`text-xs w-12 text-center ${charsLeft < 20 ? 'text-yellow-400' : 'text-slate-500'}`}>
                {charsLeft}
              </span>
              <button
                type="submit"
                className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 flex items-center justify-center transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                disabled={!body.trim()}
                aria-label="Post stream"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ComposeBar;
