
import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center justify-start gap-3">
        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-semibold text-white bg-purple-500">
            AI
        </div>
        <div className="flex items-center space-x-1.5 p-3 rounded-2xl bg-gray-700">
            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
    </div>
  );
};

export default LoadingIndicator;
