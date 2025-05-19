import React from 'react';

export function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="flex justify-center py-5 mt-28">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search for available numbers"
        className="w-1/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
