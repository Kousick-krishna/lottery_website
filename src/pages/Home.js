// import React, { useState, useEffect } from 'react';
// import backgroundImage from '../assets/background.jpg';
// import Carousel from '../components/Carousel';
// import Footer from '../components/Footer';

// const Home = () => {
//   const [winners, setWinners] = useState([]);

//   useEffect(() => {
//     const fetchWinners = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/winners'); // Adjust the API URL if necessary
//         const data = await response.json();
//         console.log(data); // Log the response data to check its structure
//         if (response.ok) {
//           setWinners(data); // Store winners data in state
//         } else {
//           console.error('Failed to fetch winners');
//         }
//       } catch (error) {
//         console.error('Error fetching winners:', error);
//       }
//     };
  
//     fetchWinners();
//   }, []);
  

//   return (
//     <div className="overflow-hidden">
//       <div className="relative w-full h-screen">
//         <div
//           className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-50"
//           style={{ backgroundImage: `url(${backgroundImage})` }}
//         ></div>
//         <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
//         <div className="relative z-10 flex flex-col justify-center items-center w-full h-screen text-white text-center">
//           <h1 className="text-5xl font-bold text-gray-100">Welcome to 4-Digit Gift Card</h1>
//           <p className="mt-4 text-2xl text-gray-300">The best jackpot opportunity in Dubai.</p>
//         </div>
//       </div>

//       <div className="py-16 bg-white text-gray-900">
//   <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Top 3 Winners</h2>
//   <div className="flex flex-wrap justify-center gap-8">
//     {winners.slice(0, 3).map((winner, index) => (
//       <div
//         key={index}
//         className="bg-gray-500 text-gray-800 p-6 rounded-lg shadow-lg w-64 mb-4 sm:w-full sm:max-w-xs"
//       >
//         <h3 className="text-xl text-center font-bold text-white">{winner.rank} - {winner.name}</h3>
//         <p className="text-center mt-2 text-lg font-medium text-white">{winner.prize}</p>
//         <p className="mt-4 text-center text-sm text-white">{winner.congratulation}</p>
//       </div>
//     ))}
//   </div>
// </div>


//       <div className="overflow-hidden w-full">
//         <Carousel />
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/background.jpg';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';

const Home = () => {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/winners'); // Adjust this endpoint as needed
        const data = await response.json();
        if (response.ok) {
          setWinners(data); // Set winners from backend
        } else {
          throw new Error('Failed to fetch winners');
        }
      } catch (error) {
        console.error('Error fetching winners:', error);
        setError('Unable to load winners.');
      } finally {
        setLoading(false); // Fetch complete
      }
    };

    fetchWinners();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-screen">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-screen text-white text-center">
          <h1 className="text-5xl font-bold text-gray-100">Welcome to 4-Digit Gift Card</h1>
          <p className="mt-4 text-2xl text-gray-300">The best jackpot opportunity in Dubai.</p>
        </div>
      </div>

      {/* Winners Section */}
      <div className="py-16 bg-white text-gray-900">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Top 3 Winners</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading winners...</p> 
        ) : error ? (
          <p className="text-center text-red-500">{error}</p> 
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {winners.slice(0, 3).map((winner, index) => (
              <div
                key={index}
                className="bg-gray-500 text-gray-800 p-6 rounded-lg shadow-lg w-64 mb-4 sm:w-full sm:max-w-xs"
              >
                <h3 className="text-2xl text-center font-bold text-white">
                  {winner.rank} Prize 
                </h3>
                <p className="text-center mt-2 text-xl font-medium text-white">{winner.name}</p>
                <p className="mt-4 text-center text-bold text-gray-200">{winner.congratulation}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Carousel Section */}
      <div className="overflow-hidden w-full">
        <Carousel />
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;


