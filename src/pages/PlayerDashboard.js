// import React from 'react';
// import { usePlayer } from '../context/PlayerContext';
// import Navbar from '../components/Navbar';
// import { TimerDisplay } from '../components/TimerDisplay';
// import { useCountdownTimer } from '../components/useCountdownTimer';
// import { useNumberSelection } from '../components/useNumberSelection';
// import { SearchBar } from '../components/SearchBar';
// import { NumberGrid } from '../components/NumberGrid';
// import { ConfirmationPopup } from '../components/ConfirmationPopup';

// function PlayerDashboard() {
//   const { timeLeft, isRunning } = useCountdownTimer();
//   const { player, updatePlayer } = usePlayer();
//   const {
//     checkedValue,
//     isPopupOpen,
//     searchQuery,
//     filteredNumbers,
//     setSearchQuery,
//     handleNumberClick,
//     setIsPopupOpen,
//     resetSelection,
//   } = useNumberSelection();

//   const handleSubmit = async () => {
//     if (!checkedValue) return;

//     const playerData = {
//       email: player.email,
//       number: checkedValue,
//     };

//     try {
//       const response = await fetch('http://localhost:5000/player-register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(playerData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         console.log('Player number updated:', data.message);
//         updatePlayer({ luckyNumber: checkedValue });
//         setIsPopupOpen(false); // Close popup but keep selection
//       } else {
//         console.error('Error:', data.message);
//         resetSelection(); // Reset on error
//       }
//     } catch (error) {
//       console.error('Request failed:', error);
//       resetSelection(); // Reset on error
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
//       <Navbar />

//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 mt-28">
//           <h1 className="text-3xl font-bold text-white">Player Dashboard</h1>
//           <TimerDisplay timeLeft={timeLeft} />
//           {checkedValue && isRunning && (
//             <div className="mt-4 text-center text-white">
//               <p className="text-lg">Your selected number: <span className="font-bold">{checkedValue}</span></p>
//             </div>
//           )}
//         </div>
//       </div>

//       {isRunning && (
//         <>
//           <SearchBar 
//             searchQuery={searchQuery}
//             onSearchChange={setSearchQuery}
//           />

//           <NumberGrid
//             filteredNumbers={filteredNumbers}
//             checkedValue={checkedValue}
//             onNumberClick={handleNumberClick}
//             isRunning={isRunning}
//           />

//           {checkedValue && isPopupOpen && (
//             <ConfirmationPopup
//               selectedNumber={checkedValue}
//               onSubmit={handleSubmit}
//               onClose={() => setIsPopupOpen(false)}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default PlayerDashboard;

// PlayerDashboard.js
import React, { useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import Navbar from '../components/Navbar';
import { TimerDisplay } from '../components/TimerDisplay';
import { useCountdownTimer } from '../components/useCountdownTimer';
import { useNumberSelection } from '../components/useNumberSelection';
import { SearchBar } from '../components/SearchBar';
import { NumberGrid } from '../components/NumberGrid';
import { ConfirmationPopup } from '../components/ConfirmationPopup';

function PlayerDashboard() {
  const { timeLeft, isRunning, resetTimer } = useCountdownTimer();
  const { player, updatePlayer } = usePlayer();
  const {
    selectedNumbers,
    tempSelectedNumber,
    isPopupOpen,
    searchQuery,
    filteredNumbers,
    setSearchQuery,
    handleNumberClick,
    setIsPopupOpen,
    resetSelection,
    handleConfirm,
    resetAllSelections,
  } = useNumberSelection();

  useEffect(() => {
    if (timeLeft === 0) {
      resetAllSelections(); // Reset all selections when the timer ends
    }
  }, [timeLeft, resetAllSelections]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      <Navbar />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 mt-28">
          <h1 className="text-3xl font-bold text-white">Player Dashboard</h1>
          <TimerDisplay timeLeft={timeLeft} />
          {tempSelectedNumber && isRunning && (
            <div className="mt-4 text-center text-white">
              <p className="text-lg">Your selected number: <span className="font-bold">{tempSelectedNumber}</span></p>
            </div>
          )}
        </div>
      </div>

      {isRunning && (
        <>
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <NumberGrid
            filteredNumbers={filteredNumbers}
            checkedValue={selectedNumbers}
            onNumberClick={handleNumberClick}
            isRunning={isRunning}
          />
          {tempSelectedNumber && isPopupOpen && (
            <ConfirmationPopup
              selectedNumber={tempSelectedNumber}
              onSubmit={handleConfirm}
              onClose={() => setIsPopupOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default PlayerDashboard;