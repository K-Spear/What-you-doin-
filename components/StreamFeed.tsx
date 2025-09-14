
import React from 'react';
import { Stream } from '../types';
import TypingStreamCard from './TypingStreamCard';

interface StreamFeedProps {
  streams: Stream[];
  onSelectStream: (stream: Stream) => void;
  expiringStreams: Set<string>;
}

const StreamFeed: React.FC<StreamFeedProps> = ({ streams, onSelectStream, expiringStreams }) => {
  if (streams.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        <h2 className="text-xl font-semibold">It's quiet here...</h2>
        <p>There are no streams in this feed right now.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {streams.map((stream, index) => (
        <div 
          key={stream.id} 
          className={expiringStreams.has(stream.id) ? 'animate-fadeOut' : 'animate-fadeIn'}
          style={{ animationDelay: `${index * 100}ms` }}
        >
            <TypingStreamCard stream={stream} onSelectStream={onSelectStream} />
        </div>
      ))}
    </div>
  );
};

export default StreamFeed;