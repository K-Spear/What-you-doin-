
import { useState, useEffect, useRef } from 'react';

interface TypingOptions {
  text: string;
  typingSpeed?: number;
  glitchProbability?: number;
  isPaused?: boolean;
}

export const useTypingAnimation = ({
  text,
  typingSpeed = 50,
  glitchProbability = 0.02,
  isPaused = false,
}: TypingOptions): string => {
  const [displayedText, setDisplayedText] = useState('');
  const currentIndex = useRef(0);
  const isGlitching = useRef(false);

  useEffect(() => {
    if (isPaused || isGlitching.current) {
      return;
    }

    if (currentIndex.current >= text.length) {
        setDisplayedText(text + ' '); // Add space for cursor
        return;
    }

    const timeout = setTimeout(() => {
      // Glitch effect
      if (Math.random() < glitchProbability && currentIndex.current > 0) {
        isGlitching.current = true;
        const glitchTimeout1 = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
          const glitchTimeout2 = setTimeout(() => {
             setDisplayedText(prev => prev + text[currentIndex.current - 1]);
             isGlitching.current = false;
          }, typingSpeed * 2);
          return () => clearTimeout(glitchTimeout2);
        }, typingSpeed * 2);
        return () => clearTimeout(glitchTimeout1);
      } else {
        setDisplayedText(prev => prev + text[currentIndex.current]);
        currentIndex.current++;
      }

    }, typingSpeed);

    return () => clearTimeout(timeout);

  }, [displayedText, text, typingSpeed, glitchProbability, isPaused]);

  useEffect(() => {
    // Reset animation if text changes
    currentIndex.current = 0;
    setDisplayedText('');
  }, [text]);

  // Use a blinking character for the cursor
  const cursor = '<span class="animate-blink font-mono text-cyan-400">|</span>';
  
  if (currentIndex.current >= text.length && !isPaused) {
     return `<span class="break-words">${text}</span><span class="animate-blink font-mono text-cyan-400">|</span>`;
  }

  return `<span class="break-words">${displayedText}</span><span class="animate-blink font-mono text-cyan-400">|</span>`;
};
