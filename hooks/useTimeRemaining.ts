import { useState, useEffect } from 'react';

const formatTimeRemaining = (milliseconds: number): string => {
  if (milliseconds <= 0) {
    return 'Expired';
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);

  if (totalHours > 0) {
    return `${totalHours}h`;
  }
  if (totalMinutes > 0) {
    return `${totalMinutes}m`;
  }
  return `${totalSeconds}s`;
};

export const useTimeRemaining = (expiresAt: Date) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = expiresAt.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining('0s');
        setIsExpired(true);
        return;
      }
      
      setIsExpired(false);
      setTimeRemaining(formatTimeRemaining(diff));
    };

    calculateTime();
    
    // update every second for the last minute, otherwise every minute
    const isLastMinute = expiresAt.getTime() - Date.now() < 60000;
    const intervalTime = isLastMinute ? 1000 : 60000;
    
    const interval = setInterval(calculateTime, intervalTime);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return { timeRemaining, isExpired };
};