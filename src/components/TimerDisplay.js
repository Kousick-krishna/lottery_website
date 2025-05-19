import React from 'react';
import { Timer } from 'lucide-react';
import PropTypes from 'prop-types';


TimerDisplay.propTypes = {
    timeLeft: PropTypes.string.isRequired,
    title: PropTypes.string,
  };
  
  TimerDisplay.defaultProps = {
    title: 'Next Draw In',
  };

export function TimerDisplay({ timeLeft, title = 'Next Draw In' }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center p-8 bg-white/5 rounded-xl border border-white/10">
        <Timer className="h-8 w-8 text-red-300 mr-4" />
        <div>
          <h2 className="text-xl font-semibold text-red-300 mb-2">{title}</h2>
          <div className="text-5xl font-mono text-black">{timeLeft}</div>
        </div>
      </div>
    </div>
  );
}
