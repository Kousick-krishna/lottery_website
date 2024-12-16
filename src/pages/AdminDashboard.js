import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const AdminDashboard = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", mobile: "+971XXXXXXXXX", chosennumber: "1234" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", mobile: "+971XXXXXXXXY", chosennumber: "5678" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [timer, setTimer] = useState('00:00:00');
  const [winners, setWinners] = useState({
    firstPrize: { name: '', prize: '', congratulation: 'Shining bright at the top!' },
    secondPrize: { name: '', prize: '', congratulation: 'Your brilliance lights the way!' },
    thirdPrize: { name: '', prize: '', congratulation: 'Amazing effort, truly inspiring!' },
  });
  const [intervalId, setIntervalId] = useState(null);
  const [showTimerBox, setShowTimerBox] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleInputChange = (e, prize) => {
    const { name, value } = e.target;
    setWinners({
      ...winners,
      [prize]: { ...winners[prize], [name]: value },
    });
  };

  useEffect(() => {
    const storedStartTime = localStorage.getItem('timerStartTime');
    if (storedStartTime) {
      const elapsedTime = Math.floor((Date.now() - parseInt(storedStartTime)) / 1000);
      const remainingTime = countdownTime - elapsedTime;
      if (remainingTime > 0) {
        setIsTimerRunning(true);
        startTimer(remainingTime);
      } else {
        setTimer('00:00:00');
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    socket.on('timerStart', ({ endTime }) => {
      const remainingTime = Math.max(0, endTime - Date.now());
      setCountdownTime(Math.floor(remainingTime / 1000));
      setIsTimerRunning(true);
      startTimer(Math.floor(remainingTime / 1000));
    });

    return () => {
      socket.off('timerStart');
    };
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedWinners = [
      { name: winners.firstPrize.name, prize: winners.firstPrize.prize, rank: 'First', congratulation: winners.firstPrize.congratulation },
      { name: winners.secondPrize.name, prize: winners.secondPrize.prize, rank: 'Second', congratulation: winners.secondPrize.congratulation },
      { name: winners.thirdPrize.name, prize: winners.thirdPrize.prize, rank: 'Third', congratulation: winners.thirdPrize.congratulation },
    ];

    try {
      const response = await fetch('http://localhost:5000/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWinners),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message); 
        setShowForm(false);
      } else {
        const errorResult = await response.json();
        alert('Error: ' + errorResult.message); 
      }
    } catch (err) {
      console.error('Error submitting winners:', err);
      alert('Error submitting winners');
    }
  };

  const handleStartTimer = async () => {
    const inputTime = document.getElementById('timeInput').value;
    const [hours, minutes, seconds] = inputTime.split(':').map(Number);
    const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

    setCountdownTime(totalTimeInSeconds);

    try {
      await fetch('http://localhost:5000/start-timer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ duration: totalTimeInSeconds }),
      });
    } catch (error) {
      console.error('Error starting timer:', error);
    }
  };

  const handleResetTimer = () => {
    setTimer('00:00:00');
    setCountdownTime(0);
    setIsTimerRunning(false);
    clearInterval(intervalId);
  };

  const startTimer = (initialTime) => {
    let remainingTime = initialTime;

    const id = setInterval(() => {
      if (remainingTime <= 0) {
        setTimer('00:00:00');
        alert('Show has been completed!');
        clearInterval(id);
        setIsTimerRunning(false);
        return;
      }

      remainingTime--;
      setTimer(formatTime(remainingTime));
      setCountdownTime(remainingTime);
    }, 1000);

    setIntervalId(id);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleNewShow = () => {
    setShowTimerBox(true);
    setTimer('00:00:00');
    setIsTimerRunning(false);
    setCountdownTime(0);
    localStorage.removeItem('timerStartTime');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6 mt-24">
        <div className="container mx-auto p-8">
          <button
            onClick={handleNewShow}
            className="bg-blue-500 text-white py-2 px-4 mt-32 rounded absolute top-4 right-4 mr-7"
          >
            New Show
          </button>

          {showTimerBox && (
            <div className="flex justify-start mb-4 items-center">
              <input
                type="time"
                id="timeInput"
                step="1"
                className="mr-2 border p-2"
                onChange={(e) => setTimer(e.target.value)}
              />
              {!isTimerRunning ? (
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 mr-2"
                  onClick={handleStartTimer}
                >
                  START
                </button>
              ) : (
                <>
                  <button
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-600"
                    onClick={handleResetTimer}
                  >
                    RESET
                  </button>
                </>
              )}
            </div>
          )}

          {showTimerBox && (
            <div className="text-center text-xl mt-4 mb-4">
              <h3>Timer: {timer}</h3>
            </div>
          )}
        </div>

        <table className="min-w-full bg-white shadow-lg rounded-lg mt-4">
          <thead>
            <tr>
              <th className="border-b p-2 text-left">Player ID</th>
              <th className="border-b p-2 text-left">Name</th>
              <th className="border-b p-2 text-left">Email</th>
              <th className="border-b p-2 text-left">Mobile</th>
              <th className="border-b p-2 text-left">Chosen Number</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id} className="border-b">
                <td className="p-2">{player.id}</td>
                <td className="p-2">{player.name}</td>
                <td className="p-2">{player.email}</td>
                <td className="p-2">{player.mobile}</td>
                <td className="p-2">{player.chosennumber}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-6">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition duration-300"
            onClick={() => setShowForm(!showForm)}
          >
            ANNOUNCE WINNERS
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleFormSubmit}
            className="bg-white shadow-lg rounded-lg p-6 mt-4 w-full max-w-md mx-auto"
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">First Prize</label>
              <input
                type="text"
                name="name"
                value={winners.firstPrize.name}
                onChange={(e) => handleInputChange(e, 'firstPrize')}
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="Enter name"
              />
              <input
                type="text"
                name="prize"
                value={winners.firstPrize.prize}
                onChange={(e) => handleInputChange(e, 'firstPrize')}
                className="border border-gray-300 rounded-lg p-2 w-full mt-2"
                placeholder="Enter prize"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Second Prize</label>
              <input
                type="text"
                name="name"
                value={winners.secondPrize.name}
                onChange={(e) => handleInputChange(e, 'secondPrize')}
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="Enter name"
              />
              <input
                type="text"
                name="prize"
                value={winners.secondPrize.prize}
                onChange={(e) => handleInputChange(e, 'secondPrize')}
                className="border border-gray-300 rounded-lg p-2 w-full mt-2"
                placeholder="Enter prize"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Third Prize</label>
              <input
                type="text"
                name="name"
                value={winners.thirdPrize.name}
                onChange={(e) => handleInputChange(e, 'thirdPrize')}
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="Enter name"
              />
              <input
                type="text"
                name="prize"
                value={winners.thirdPrize.prize}
                onChange={(e) => handleInputChange(e, 'thirdPrize')}
                className="border border-gray-300 rounded-lg p-2 w-full mt-2"
                placeholder="Enter prize"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
              >
                Submit Winners
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;








