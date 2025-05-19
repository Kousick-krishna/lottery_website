// import { useState, useMemo, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { API_URL } from '../components/constants';

// export function useNumberSelection(showId) {
//   const [selectedNumbers, setSelectedNumbers] = useState([]); // Store selected numbers globally
//   const [tempSelectedNumber, setTempSelectedNumber] = useState(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [error, setError] = useState(null);

//   const generateNumbers = useMemo(() => {
//     const numbers = [];
//     for (let i = 0; i < 10000; i++) {
//       numbers.push(i.toString().padStart(4, '0'));
//     }
//     return numbers;
//   }, []);

//   const filteredNumbers = useMemo(() => {
//     return generateNumbers.filter((number) => number.includes(searchQuery));
//   }, [generateNumbers, searchQuery]);

//   const fetchSelectedNumbers = async () => {
//     if (!showId) return;

//     try {
//       const response = await axios.get(`${API_URL}/numbers/${showId}`);
//       const numbers = response.data.map((item) => item.number);
//       setSelectedNumbers(numbers);
//     } catch (error) {
//       console.error('Failed to fetch selected numbers:', error);
//     }
//   };

//   useEffect(() => {
//     if (!showId) return;

//     const interval = setInterval(fetchSelectedNumbers, 5000);
//     fetchSelectedNumbers();

//     return () => clearInterval(interval);
//   }, [showId]);

//   const handleNumberClick = (number) => {
//     if (selectedNumbers.includes(number)) {
//       setError('This number has already been selected');
//       return;
//     }

//     setError(null);
//     setTempSelectedNumber(number);
//     setIsPopupOpen(true);
//   };

//   const handleConfirm = async () => {
//     if (!tempSelectedNumber || !showId) return;

//     try {
//       const userId = localStorage.getItem('userId');
//       if (!userId) return;

//       await axios.post(`${API_URL}/numbers`, {
//         userId,
//         showId,
//         number: tempSelectedNumber,
//       });

//       await fetchSelectedNumbers();
//       setIsPopupOpen(false);
//       setTempSelectedNumber(null);
//       setError(null);
//     } catch (error) {
//       setError(error.response?.data?.error || 'Failed to select number');
//       setIsPopupOpen(false);
//       setTempSelectedNumber(null);
//     }
//   };

//   const resetAllSelections = useCallback(() => {
//     setSelectedNumbers([]);
//   }, []);

//   return {
//     selectedNumbers,
//     tempSelectedNumber,
//     isPopupOpen,
//     searchQuery,
//     error,
//     filteredNumbers,
//     setSearchQuery,
//     handleNumberClick,
//     handleConfirm,
//     setIsPopupOpen,
//     resetAllSelections,
//   };
// }

import { useState, useMemo, useEffect, useCallback } from 'react';

export function useNumberSelection(showId) {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [tempSelectedNumber, setTempSelectedNumber] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  // Generate all numbers
  const generateNumbers = useMemo(() => {
    const numbers = [];
    for (let i = 0; i < 10000; i++) {
      numbers.push(i.toString().padStart(4, '0'));
    }
    return numbers;
  }, []);

  // Filter numbers based on search query
  const filteredNumbers = useMemo(() => {
    return generateNumbers.filter((number) => number.includes(searchQuery));
  }, [generateNumbers, searchQuery]);

  // Fetch selected numbers from local storage
  // useEffect(() => {
  //   // const storedNumbers = JSON.parse(localStorage.getItem(`selectedNumbers_${showId}`)) || [];
  //   const storedNumbers = JSON.parse(localStorage.getItem(`numbers`)) || [];
  //   setSelectedNumbers(storedNumbers);
  // }, [showId]);

  // Save selected numbers to local storage whenever they change
  // useEffect(() => {
  //   // localStorage.setItem(`selectedNumbers_${showId}`, JSON.stringify(selectedNumbers));
  //   localStorage.setItem(`numbers`, JSON.stringify(selectedNumbers));
  // }, [selectedNumbers, showId]);

  const handleNumberClick = (number) => {
    if (selectedNumbers.includes(number)) {
      setError('This number has already been selected');
      return;
    }

    setError(null);
    setTempSelectedNumber(number);
    setIsPopupOpen(true);
  };

  const handleConfirm = () => {
    if (!tempSelectedNumber) return;

    setSelectedNumbers((prev) => [...prev, tempSelectedNumber]);
    setTempSelectedNumber(null);
    setIsPopupOpen(false);
    setError(null);
  };

  const resetAllSelections = useCallback(() => {
    setSelectedNumbers([]);
    localStorage.removeItem(`selectedNumbers_${showId}`);
  }, [showId]);

  return {
    selectedNumbers,
    tempSelectedNumber,
    isPopupOpen,
    searchQuery,
    error,
    filteredNumbers,
    setSearchQuery,
    handleNumberClick,
    handleConfirm,
    setIsPopupOpen,
    resetAllSelections,
  };
}
