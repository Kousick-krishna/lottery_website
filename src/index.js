import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PlayerProvider } from './context/PlayerContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

