import React, { useState } from 'react';
import { Stream } from '../types';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import { useTranslation } from '../hooks/useTranslation';
import { useTimeRemaining } from '../hooks/useTimeRemaining';
import { ClockIcon } from './icons';

interface TypingStreamCardProps {
  stream: Stream;
  onSelectStream: (stream: Stream) => void;
}

const TypingStreamCard: React.FC<TypingStreamCardProps> = ({ stream, onSelectStream }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { displayText } = useTranslation(stream.body);
  const { timeRemaining } = useTimeRemaining(stream.expiresAt);
  const animatedText = useTypingAnimation({ text: displayText, isPaused: isHovered });
  
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(stream.createdAt);

  return (
    <div
      className="bg-slate-800/50 rounded-lg p-4 cursor-pointer border border-transparent hover:border-cyan-500 transition-all duration-300"
      onClick={() => onSelectStream(stream)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center text-sm text-slate-400 mb-3">
        <span>@{stream.author.nickname || 'Anonymous'}</span>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1" title={`Expires at ${stream.expiresAt.toLocaleTimeString()}`}>
              <ClockIcon className="w-4 h-4"/>
              <span>{timeRemaining} left</span>
            </div>
            <span>{formattedTime}</span>
        </div>
      </div>
      <p className="h-24 text-lg text-slate-200 font-mono leading-relaxed" dangerouslySetInnerHTML={{ __html: animatedText }} />
      <div className="text-right text-sm text-cyan-500 mt-2">
         {stream.comments.length > 0 ? `${stream.comments.length} replies` : 'Tap to reply'}
      </div>
    </div>
  );
};

export default TypingStreamCard;