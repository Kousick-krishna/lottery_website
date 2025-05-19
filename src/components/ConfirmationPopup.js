import React from 'react';

export function ConfirmationPopup({ selectedNumber, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-xl font-semibold text-center mb-4">Ready to Submit?</h2>
        <p className="text-center mb-4">You have selected {selectedNumber}.</p>
        <div className="flex justify-around">
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
