
// import React, { useState} from 'react';
// import Navbar from '../components/Navbar';
// import { Play, Clock, RotateCcw } from 'lucide-react';
// import { TimerDisplay } from '../components/TimerDisplay';
// import { useCountdownTimer } from '../components/useCountdownTimer';


// const AdminDashboard = () => {
//   const [players, setPlayers] = useState([
//     { id: 1, name: "John Doe", email: "john@example.com", mobile: "+971XXXXXXXXX", chosennumber: "1234" },
//     { id: 2, name: "Jane Smith", email: "jane@example.com", mobile: "+971XXXXXXXXY", chosennumber: "5678" },
//   ]);

//   const [showForm, setShowForm] = useState(false);
//   const [showTimer, setShowTimer] = useState(false);
//   const [hours, setHours] = useState('00');
//   const [minutes, setMinutes] = useState('00');
//   const [seconds, setSeconds] = useState('00');
//   const { timeLeft, isRunning, resetTimer } = useCountdownTimer();
  
  
  // const [winners, setWinners] = useState({
  //   firstPrize: { name: '', prize: '', congratulation: 'Shining bright at the top!' },
  //   secondPrize: { name: '', prize: '', congratulation: 'Your brilliance lights the way!' },
  //   thirdPrize: { name: '', prize: '', congratulation: 'Amazing effort, truly inspiring!' },
  // });
  



  // const handleInputChange = (e, prize) => {
  //   const { name, value } = e.target;
  //   setWinners(prevState => ({
  //     ...prevState,
  //     [prize]: { ...prevState[prize], [name]: value },
  //   }));
  // };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   const updatedWinners = [
  //     { name: winners.firstPrize.name, prize: winners.firstPrize.prize, rank: 'First', congratulation: winners.firstPrize.congratulation },
  //     { name: winners.secondPrize.name, prize: winners.secondPrize.prize, rank: 'Second', congratulation: winners.secondPrize.congratulation },
  //     { name: winners.thirdPrize.name, prize: winners.thirdPrize.prize, rank: 'Third', congratulation: winners.thirdPrize.congratulation },
  //   ];

  //   try {
  //     const response = await fetch('http://localhost:5000/admin', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(updatedWinners),
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       alert(result.message);
  //       setShowForm(false);
  //     } else {
  //       const errorResult = await response.json();
  //       alert(`Error: ${errorResult.message}`);
  //     }
  //   } catch (err) {
  //     console.error('Error submitting winners:', err);
  //     alert('Failed to submit winners. Please try again.');
  //   }
  // };

//   const handleStart = () => {
//     const totalSeconds = 
//       parseInt(hours) * 3600 + 
//       parseInt(minutes) * 60 + 
//       parseInt(seconds);
    
//     if (totalSeconds > 0) {
//       const endTime = new Date().getTime() + totalSeconds * 1000;
//       localStorage.setItem('lotteryEndTime', endTime.toString());
//       localStorage.setItem('isTimerRunning', 'true');
//     }
//   };

  // const handleReset = () => {
  //   resetTimer();
  //   setShowTimer(false);
  //   setHours('00');
  //   setMinutes('00');
  //   setSeconds('00');
  // };


   
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Navbar />
//       <div className="container mx-auto p-6 mt-24">
//       <div className="max-w-4xl mx-auto mt-2">
//       <div className="bg-gray-400 backdrop-blur-md rounded-xl p-8 border">
//         <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-red-500">Admin Dashboard</h1>

//           {isRunning && (
//             <button
//               onClick={handleReset}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
//             >
//               <RotateCcw className="h-5 w-5" />
//               <span>Reset Timer</span>
//             </button>
//           )}
//         </div>
        
//         {!showTimer && !isRunning && (
//           <button
//             onClick={() => setShowTimer(true)}
//             className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 "
//           >
//             <Clock className="h-5 w-5" />
//             <span>NEW SHOW</span>
//           </button>
//         )}

//         {showTimer && !isRunning && (
//           <div className="space-y-6">
//             <div className="flex items-center space-x-4">
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-black ml-1">Hours</label>
//                 <input
//                   type="number"
//                   min="0"
//                   max="23"
//                   value={hours}
//                   onChange={(e) => setHours(e.target.value.padStart(2, '0'))}
//                   className="bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-black w-24"
//                 />
//               </div>
//               <div className="text-red-500 text-2xl mt-5">:</div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-black ml-1">Minutes</label>
//                 <input
//                   type="number"
//                   min="0"
//                   max="59"
//                   value={minutes}
//                   onChange={(e) => setMinutes(e.target.value.padStart(2, '0'))}
//                   className="bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-black w-24"
//                 />
//               </div>
//               <div className="text-red-500 text-2xl mt-5">:</div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-black ml-1">Seconds</label>
//                 <input
//                   type="number"
//                   min="0"
//                   max="59"
//                   value={seconds}
//                   onChange={(e) => setSeconds(e.target.value.padStart(2, '0'))}
//                   className="bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-black w-24"
//                 />
//               </div>
//             </div>

//             <button
//               onClick={handleStart}
//               className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
//             >
//               <Play className="h-5 w-5" />
//               <span>START</span>
//             </button>
//           </div>
//         )}

//         {isRunning && (
//           <TimerDisplay timeLeft={timeLeft} title="Current Show Timer" />
//         )}
//       </div>
//     </div>

//         <table className="min-w-full bg-white shadow-lg rounded-lg mt-16">
//           <thead>
//             <tr>
//               <th className="border-b p-2 text-left">Player ID</th>
//               <th className="border-b p-2 text-left">Name</th>
//               <th className="border-b p-2 text-left">Email</th>
//               <th className="border-b p-2 text-left">Mobile</th>
//               <th className="border-b p-2 text-left">Chosen Number</th>
//             </tr>
//           </thead>
//           <tbody>
//             {players.map((player) => (
//               <tr key={player.id} className="border-b">
//                 <td className="p-2">{player.id}</td>
//                 <td className="p-2">{player.name}</td>
//                 <td className="p-2">{player.email}</td>
//                 <td className="p-2">{player.mobile}</td>
//                 <td className="p-2">{player.chosennumber}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="flex justify-center mt-6">
//           <button
//             className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition duration-300"
//             onClick={() => setShowForm(!showForm)}
//           >
//             ANNOUNCE WINNERS
//           </button>
//         </div>

//         {showForm && (
//           <form
//             onSubmit={handleFormSubmit}
//             className="bg-white shadow-lg rounded-lg p-6 mt-4 w-full max-w-md mx-auto"
//           >
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold mb-2">First Prize</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={winners.firstPrize.name}
//                 onChange={(e) => handleInputChange(e, 'firstPrize')}
//                 className="border border-gray-300 rounded-lg p-2 w-full"
//                 placeholder="Enter name"
//               />
//               <input
//                 type="text"
//                 name="prize"
//                 value={winners.firstPrize.prize}
//                 onChange={(e) => handleInputChange(e, 'firstPrize')}
//                 className="border border-gray-300 rounded-lg p-2 w-full mt-2"
//                 placeholder="Enter prize"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold mb-2">Second Prize</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={winners.secondPrize.name}
//                 onChange={(e) => handleInputChange(e, 'secondPrize')}
//                 className="border border-gray-300 rounded-lg p-2 w-full"
//                 placeholder="Enter name"
//               />
//               <input
//                 type="text"
//                 name="prize"
//                 value={winners.secondPrize.prize}
//                 onChange={(e) => handleInputChange(e, 'secondPrize')}
//                 className="border border-gray-300 rounded-lg p-2 w-full mt-2"
//                 placeholder="Enter prize"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold mb-2">Third Prize</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={winners.thirdPrize.name}
//                 onChange={(e) => handleInputChange(e, 'thirdPrize')}
//                 className="border border-gray-300 rounded-lg p-2 w-full"
//                 placeholder="Enter name"
//               />
//               <input
//                 type="text"
//                 name="prize"
//                 value={winners.thirdPrize.prize}
//                 onChange={(e) => handleInputChange(e, 'thirdPrize')}
//                 className="border border-gray-300 rounded-lg p-2 w-full mt-2"
//                 placeholder="Enter prize"
//               />
//             </div>
//             <div className="text-center">
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
//               >
//                 Submit Winners
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState } from 'react';
import { Play, Clock, RotateCcw } from 'lucide-react';
import Navbar from '../components/Navbar';
import { TimerDisplay } from '../components/TimerDisplay';
import { useTimer } from '../components/useTimer';
import axios from 'axios';
import { API_URL } from '../components/constants';



function AdminDashboard() {

  const [players, setPlayers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", mobile: "+971XXXXXXXXX", chosennumber: "1234" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", mobile: "+971XXXXXXXXY", chosennumber: "5678" },
      ]);
  const [showTimer, setShowTimer] = useState(false);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const { timeLeft, isRunning, resetTimer } = useTimer();
  const [showForm, setShowForm] = useState(false);

  const [winners, setWinners] = useState({
    firstPrize: { name: '', prize: '', congratulation: 'Shining bright at the top!' },
    secondPrize: { name: '', prize: '', congratulation: 'Your brilliance lights the way!' },
    thirdPrize: { name: '', prize: '', congratulation: 'Amazing effort, truly inspiring!' },
  });

  const handleReset = () => {
    resetTimer();
    setShowTimer(false);
    setHours('00');
    setMinutes('00');
    setSeconds('00');
  };

  const handleInputChange = (e, prize) => {
    const { name, value } = e.target;
    setWinners(prevState => ({
      ...prevState,
      [prize]: { ...prevState[prize], [name]: value },
    }));
  };

  // const handleStart = async () => {
  //   const totalSeconds = 
  //     parseInt(hours) * 3600 + 
  //     parseInt(minutes) * 60 + 
  //     parseInt(seconds);
    
  //   if (totalSeconds > 0) {
  //     const endTime = new Date().getTime() + totalSeconds * 1000;

  //     try {
  //       const response = await axios.post(`${API_URL}/shows`, { endTime });
  //       const { showId } = response.data;
        
  //       localStorage.setItem('lotteryEndTime', endTime.toString());
  //       localStorage.setItem('showId', showId);
  //       localStorage.setItem('isTimerRunning', 'true');
  //     } catch (error) {
  //       console.error('Failed to create show:', error);
  //     }
  //   }
  // };

  const handleStart = () => {
    const totalSeconds = 
      parseInt(hours) * 3600 + 
      parseInt(minutes) * 60 + 
      parseInt(seconds);
    
    if (totalSeconds > 0) {
      const endTime = new Date().getTime() + totalSeconds * 1000;
      localStorage.setItem('lotteryEndTime', endTime.toString());
      localStorage.setItem('isTimerRunning', 'true');
    }
  };

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedWinners),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        setShowForm(false);
      } else {
        const errorResult = await response.json();
        alert(`Error: ${errorResult.message}`);
      }
    } catch (err) {
      console.error('Error submitting winners:', err);
      alert('Failed to submit winners. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6 mt-24">
      <div className="max-w-4xl mx-auto mt-2">
      <div className="bg-gray-400 backdrop-blur-md rounded-xl p-8 border">
        <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-red-500">Admin Dashboard</h1>

          {isRunning && (
            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Reset Timer</span>
            </button>
          )}
        </div>
        
        {!showTimer && !isRunning && (
          <button
            onClick={() => setShowTimer(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 "
          >
            <Clock className="h-5 w-5" />
            <span>NEW SHOW</span>
          </button>
        )}

        {showTimer && !isRunning && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black ml-1">Hours</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) => setHours(e.target.value.padStart(2, '0'))}
                  className="bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-black w-24"
                />
              </div>
              <div className="text-red-500 text-2xl mt-5">:</div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black ml-1">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value.padStart(2, '0'))}
                  className="bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-black w-24"
                />
              </div>
              <div className="text-red-500 text-2xl mt-5">:</div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black ml-1">Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value.padStart(2, '0'))}
                  className="bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-black w-24"
                />
              </div>
            </div>

            <button
              onClick={handleStart}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>START</span>
            </button>
          </div>
        )}

        {isRunning && (
          <TimerDisplay timeLeft={timeLeft} title="Current Show Timer" />
        )}
      </div>
    </div>

        <table className="min-w-full bg-white shadow-lg rounded-lg mt-16">
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
}

export default AdminDashboard;
