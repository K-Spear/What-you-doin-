import React from 'react';
import { SettingsIcon, GlobeIcon, UsersIcon } from './icons';
import { FeedMode } from '../types';

interface HeaderProps {
  onSettings: () => void;
  feedMode: FeedMode;
  onFeedModeChange: (mode: FeedMode) => void;
}

const Header: React.FC<HeaderProps> = ({ onSettings, feedMode, onFeedModeChange }) => {
  return (
    <header className="sticky top-0 z-10 bg-slate-900/50 backdrop-blur-md border-b border-slate-700/50 mb-6">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-100 tracking-tighter">
          님들무함
        </h1>
        <div className="flex items-center gap-3">
            <div className="bg-slate-800 p-1 rounded-lg flex items-center">
              <button
                onClick={() => onFeedModeChange('global')}
                className={`flex items-center justify-center gap-2 px-3 py-1 text-sm rounded-md transition-colors ${feedMode === 'global' ? 'bg-slate-700 text-cyan-400' : 'text-slate-400 hover:bg-slate-600'}`}
                aria-pressed={feedMode === 'global'}
              >
                <GlobeIcon className="w-4 h-4" /> Global
              </button>
              <button
                onClick={() => onFeedModeChange('friends')}
                className={`flex items-center justify-center gap-2 px-3 py-1 text-sm rounded-md transition-colors ${feedMode === 'friends' ? 'bg-slate-700 text-cyan-400' : 'text-slate-400 hover:bg-slate-600'}`}
                aria-pressed={feedMode === 'friends'}
              >
                <UsersIcon className="w-4 h-4" /> Friends
              </button>
            </div>
          <button 
            onClick={onSettings}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
            aria-label="Open settings"
          >
            <SettingsIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;