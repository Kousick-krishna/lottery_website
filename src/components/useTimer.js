import { useState, useEffect } from 'react';
import { formatTime } from '../utils/timeUtils';

export function useTimer() {
  const [timeLeft, setTimeLeft] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showId, setShowId] = useState(null);

  const resetTimer = () => {
    localStorage.removeItem('lotteryEndTime');
    localStorage.removeItem('showId');
    localStorage.removeItem('userId');
    localStorage.setItem('isTimerRunning', 'false');
    setTimeLeft('No active show');
    setIsRunning(false);
    setShowId(null);
  };

  useEffect(() => {
    const checkTime = () => {
      const endTimeStr = localStorage.getItem('lotteryEndTime');
      const currentShowId = localStorage.getItem('showId');
      const isTimerRunning = localStorage.getItem('isTimerRunning') === 'true';

      if (endTimeStr && isTimerRunning) {
        const endTime = parseInt(endTimeStr, 10);
        const now = new Date().getTime();
        const difference = endTime - now;

        if (difference <= 0) {
          resetTimer();
          return;
        }

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(formatTime(hours, minutes, seconds));
        setIsRunning(true);
        setShowId(currentShowId);
      } else {
        resetTimer();
      }
    };

    const interval = setInterval(checkTime, 1000);
    checkTime(); // Initial check

    return () => clearInterval(interval);
  }, []);

  return { timeLeft, isRunning, showId, resetTimer };
}
