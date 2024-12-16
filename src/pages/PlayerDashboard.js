import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { usePlayer } from '../context/PlayerContext';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const PlayerDashboard = () => {
  const { player } = usePlayer();
  const [searchQuery, setSearchQuery] = useState('');
  const [warning, setWarning] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [timer, setTimer] = useState('');

  useEffect(() => {
    socket.on('timerStart', ({ endTime }) => {
      const updateTimer = () => {
        const now = Date.now();
        const remainingTime = Math.max(0, endTime - now);
        
        if (remainingTime > 0) {
          setTimer(formatTime(remainingTime));
          requestAnimationFrame(updateTimer);
        } else {
          setTimer('Show Ended');
        }
      };

      updateTimer();
    });

    return () => {
      socket.off('timerStart');
    };
  }, []);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (/^\d{4}$/.test(value)) {
      setIsValid(true);
      setWarning('');
    } else if (value !== '') {
      setIsValid(false);
      setWarning('Please enter a valid 4-digit number (0000 to 9999)');
    } else {
      setIsValid(false);
      setWarning('');
    }
  };

  const handleButtonClick = async () => {
    try {
      setIsClicked(true);
      const chosenNumber = searchQuery;

      if (!chosenNumber) {
        throw new Error('Chosen number is missing. Please check your input.');
      }

      const takenNumbers = JSON.parse(localStorage.getItem('takenNumbers')) || [];
      if (takenNumbers.includes(chosenNumber)) {
        setWarning('This number has already been taken.');
        return;
      }

      const response = await fetch('/player', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: player.email,
          chosenNumber,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsConfirmed(true);
        setConfirmationMessage('Your number has been confirmed and saved!');

        localStorage.setItem(
          'chosenNumberData',
          JSON.stringify({
            chosenNumber,
            timestamp: Date.now(),
          })
        );

        takenNumbers.push(chosenNumber);
        localStorage.setItem('takenNumbers', JSON.stringify(takenNumbers));
      } else {
        setWarning(data.message || 'Failed to confirm your number. Please try again.');
      }
    } catch (error) {
      console.error('Error confirming number:', error.message || error);
      setWarning('Failed to confirm your number. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-red-600 mt-4">Player Dashboard</h2>
        <div className="mt-20">
          <h1>Welcome, {player.name}</h1>

          {/* Timer Display */}
          <div className="text-center text-2xl font-bold text-red-600 mt-4">
            {timer ? `Time Remaining: ${timer}` : 'No Show Running'}
          </div>

          <input
            type="text"
            className="border p-2 w-full mb-4 text-center rounded-lg mt-8"
            placeholder="Search for available numbers"
            value={searchQuery}
            onChange={handleInputChange}
          />

          <div className="text-center mt-32">
            <p className="text-4xl font-bold">
              Your <span className="text-red-600">LUCKY</span> number Awaits
            </p>
            <p className="text-2xl font-semibold mt-4">
              Dream big, <span className="text-red-600">WIN</span> big
            </p>
          </div>

          {warning && <p className="text-red-600 text-center mt-4">{warning}</p>}

          {isValid && (
            <div className="mt-8 text-center">
              <button
                className={`inline-block p-4 text-xl font-bold rounded-lg focus:outline-none border ${
                  isConfirmed
                    ? 'bg-green-600 text-white border-black cursor-not-allowed'
                    : 'bg-white text-black border-black cursor-pointer'
                }`}
                onClick={handleButtonClick}
                disabled={isConfirmed || isClicked}
              >
                {searchQuery}
              </button>
            </div>
          )}

          {confirmationMessage && (
            <p className="text-green-600 mt-4 text-center">{confirmationMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;




