import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app_logo from './app_logo.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg shadow-lg px-8 py-4 z-20 rounded-lg">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-black text-2xl">
          <img src={app_logo} alt="Logo" className="w-20 h-20" />
        </div>

        {/* Company Name */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-red-600 text-3xl font-bold">
          4-Digit Gift Card
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="text-black hover:text-red-500 font-medium text-xl">
              Home
            </Link>
          </li>
          <li>
            <Link to="/player-register" className="text-black hover:text-red-500 font-medium text-xl">
              Player SignUp
            </Link>
          </li>
          <li>
            <Link to="/admin-login" className="text-black hover:text-red-500 font-medium text-xl">
              Admin Signin
            </Link>
          </li>
          
        </ul>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-black focus:outline-none" onClick={toggleMenu}>
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu (Sliding from the right with full gray background) */}
      <div
        className={`absolute top-0 right-0 w-full h-full bg-gray-800 text-white p-4 md:hidden transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="fixed top-0 left-0 flex flex-col w-screen h-screen bg-gray-800">
  {/* Close Button */}
  <button
    className="absolute top-4 right-4 text-white text-4xl font-bold"
    onClick={toggleMenu} // Function to close the menu
  >
    &times;
  </button>

  {/* Navigation Links */}
  <div className="flex flex-col items-center w-full space-y-6 mt-16">
    <Link
      to="/"
      className="w-full text-center text-lg font-medium py-2 hover:bg-gray-700 rounded-md"
      onClick={toggleMenu}
    >
      Home
    </Link>
    <Link
      to="/player-register"
      className="w-full text-center text-lg font-medium py-2 hover:bg-gray-700 rounded-md"
      onClick={toggleMenu}
    >
      Player SignUp
    </Link>
    <Link
      to="/admin-login"
      className="w-full text-center text-lg font-medium py-2 hover:bg-gray-700 rounded-md"
      onClick={toggleMenu}
    >
      Admin Signin
    </Link>
  </div>
</div>


      </div>
    </nav>
  );
}

export default Navbar;
