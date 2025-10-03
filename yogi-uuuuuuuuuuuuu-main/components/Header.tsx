
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/70 backdrop-blur-sm border-b border-gray-700 p-4 shadow-md sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center space-x-3">
         <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
          YP
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Yogi Pedhadiya AI</h1>
          <p className="text-sm text-gray-400">Your assistant for AI, Code, and Creativity</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
