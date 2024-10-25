import React, { useState, useRef, useEffect } from 'react';

const Navbar = ({ onAddCard, onClearBoard }) => {
    const [showClearConfirm, setShowClearConfirm] = useState(false);
  
    const handleClearClick = () => {
      setShowClearConfirm(true);
      setTimeout(() => setShowClearConfirm(false), 3000); // Hide after 3 seconds
    };
  
    return (
      <nav className="fixed left-0 right-0 top-0 z-50 bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left side */}
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">SimpleBoard+</span>
            </div>
  
            {/* Center */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onAddCard}
                className="flex items-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Card
              </button>
  
              {showClearConfirm ? (
                <button
                  onClick={onClearBoard}
                  className="flex items-center rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Confirm Clear
                </button>
              ) : (
                <button
                  onClick={handleClearClick}
                  className="flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear Board
                </button>
              )}
            </div>
  
            {/* Right side */}
            <div className="flex items-center">
              <span className="text-sm text-gray-500">Double-click to edit cards</span>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  

export default Navbar;