import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const PlayerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For error messages
  const [successMessage, setSuccessMessage] = useState(''); // For success message
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Replace with your actual backend API call
      const response = await fetch('http://localhost:5000/player-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        console.log('Login successful:', data);
        setSuccessMessage('Login successful! Redirecting...'); // Set success message

        // Wait for 2 seconds before redirecting
        setTimeout(() => {
          navigate('/player'); // Redirect to PlayerDashboard
        }, 2000);
      } else {
        // Handle login error
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred while logging in');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-96 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Player Login</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>} {/* Display error messages */}
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>} {/* Display success message */}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-2 rounded-lg mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerLogin;
