// import React from 'react';

// export function NumberGrid({ filteredNumbers, checkedValue, onNumberClick, isRunning }) {
//   // get numbers from local storage
//   const numbers = JSON.parse(localStorage.getItem('numbers')) || {};
//   return (
//     <div className="flex justify-center items-center py-10">
//       <div className="grid grid-cols-5 gap-2 w-full max-w-7xl px-4">
//         {filteredNumbers.map((number) => {
//           const isSelected = null; // check if number is selected in numbers array
//           const hasSelection = Boolean(checkedValue);
          
//           return (
//             <div
//               key={number}
//               className={`w-full h-12 flex items-center justify-center rounded-md transition-all 
//                 ${isSelected ? 'bg-green-500 text-white' : 'bg-white text-black'}
//                 ${!isSelected && hasSelection ? 'opacity-50' : 'hover:bg-gray-100'}
//                 ${isRunning ? (hasSelection && !isSelected ? 'cursor-not-allowed' : 'cursor-pointer') : 'cursor-default'}`}
//               onClick={() => isRunning && !hasSelection && onNumberClick(number)}
//             >
//               {number}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';

export function NumberGrid({ filteredNumbers, checkedValue, onNumberClick, isRunning }) {
  const [numbers, setNumbers] = useState(JSON.parse(localStorage.getItem('numbers')) || {});
  // console.log('numbers', numbers);
  // console.log('filteredNumbers', filteredNumbers);
  // console.log('checkedValue', checkedValue);
  // console.log('isRunning', isRunning);

  const handleNumberClick = (number) => {
    if (isRunning) {
      // get user id
      const userId = "sk25"; // get it from mongo, hardcoded for now
      // check if the number has been selected by another user
      if (numbers[number] && numbers[number] !== userId) {
        return;
      }

      // check if user has already selected a number
      if (Object.values(numbers).includes(userId)) {
        return;
      }
        //&& delete numbers[Object.keys(numbers).find(key => numbers[key] === userId)];
      
      // Update the numbers object with the new number
      const newNumbers = { ...numbers, [number]: userId };
      setNumbers(newNumbers);
      localStorage.setItem('numbers', JSON.stringify(newNumbers));
      
      // onNumberClick(number); // Notify parent about the click
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="grid grid-cols-5 gap-2 w-full max-w-7xl px-4">
        {filteredNumbers.map((number) => {
          const isSelected = numbers[number]; // Check if the number is selected
          const hasSelection = Boolean(checkedValue);

          return (
            <button
              key={number}
              className={`w-full h-12 flex items-center justify-center rounded-md transition-all
                ${isSelected ? 'bg-green-500 text-white' : 'bg-white text-black'} 
              `}
              onClick={() => handleNumberClick(number)}
            >
              {number}
            </button>
          );
        })}
      </div>
    </div>
  );
}

