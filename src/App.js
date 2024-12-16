// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout'; 
import Home from './pages/Home';
import Admin from './pages/AdminDashboard';
import Player from './pages/PlayerDashboard';
import PlayerRegister from './pages/PlayerRegister';
import AdminLogin from './pages/AdminLogin';
import PlayerLogin from './pages/PlayerLogin';
import { PlayerProvider } from './context/PlayerContext'; // PlayerContext provider


function App() {
  return (
    <PlayerProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/admin" element={<Layout><Admin /></Layout>} />
            <Route path="/player" element={<Layout><Player /></Layout>} />
            <Route path="/player-register" element={<Layout><PlayerRegister /></Layout>} />
            <Route path="/admin-login" element={<Layout><AdminLogin /></Layout>} />
            <Route path="/player-login" element={<Layout><PlayerLogin /></Layout>} />
          </Routes>
        </Router>
    </PlayerProvider>
  );
}

export default App;
