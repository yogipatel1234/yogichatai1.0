
import React from 'react';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

const SuggestionChips: React.FC<SuggestionChipsProps> = ({ suggestions, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="bg-gray-700 text-gray-200 px-4 py-2 rounded-full text-sm hover:bg-gray-600 transition-colors duration-200"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SuggestionChips;
