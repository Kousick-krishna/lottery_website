import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />
      
      {/* Content of the current page */}
      <main className="bg-white">{children}</main>
    </div>
  );
};

export default Layout;
