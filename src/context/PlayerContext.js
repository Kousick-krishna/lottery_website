import React, { createContext, useState, useContext } from 'react';

// Create context
const PlayerContext = createContext();

// Create a provider component
export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState({
    name: '',
    email: '',
    phone: '',
    luckyNumber: null
  });

  const updatePlayer = (newPlayerData) => {
    setPlayer((prevState) => ({ ...prevState, ...newPlayerData }));
  };

  return (
    <PlayerContext.Provider value={{ player, updatePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook to use player context
export const usePlayer = () => {
  return useContext(PlayerContext);
};
