import { useState, useEffect } from 'react';
import { formatTime } from '../utils/timeUtils';

export function useCountdownTimer() {
  const [timeLeft, setTimeLeft] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const resetTimer = () => {
    localStorage.removeItem('lotteryEndTime');
    localStorage.setItem('isTimerRunning', 'false');
    setTimeLeft('No active show');
    setIsRunning(false);
  };

  useEffect(() => {
    const checkTime = () => {
      const endTimeStr = localStorage.getItem('lotteryEndTime');
      const isTimerRunning = localStorage.getItem('isTimerRunning') === 'true';

      if (endTimeStr && isTimerRunning) {
        const endTime = parseInt(endTimeStr);
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
      } else {
        setTimeLeft('No active show');
        setIsRunning(false);
      }
    };

    const interval = setInterval(checkTime, 1000);
    checkTime(); // Initial check
    
    return () => clearInterval(interval);
  }, []);

  return { timeLeft, isRunning, resetTimer };
}
