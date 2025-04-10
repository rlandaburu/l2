// src/components/FlowSelector.jsx
import React from 'react';

function FlowSelector({ selectedFlow, onSelectFlow }) {
  const getButtonClasses = (flowType) => {
    const baseClasses = "px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-black";
    if (selectedFlow === flowType) {
      return `${baseClasses} bg-brand-red text-white shadow-md cursor-default`;
    } else {
      return `${baseClasses} bg-brand-card text-brand-text-secondary hover:bg-gray-700 hover:text-white focus:ring-brand-red`;
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 my-8 px-4">
      <button
        onClick={() => onSelectFlow('optimistic')}
        className={getButtonClasses('optimistic')}
        aria-pressed={selectedFlow === 'optimistic'}
      >
        Optimistic Rollup Flow
      </button>
      <button
        onClick={() => onSelectFlow('zk')}
        className={getButtonClasses('zk')}
        aria-pressed={selectedFlow === 'zk'}
      >
        ZK-Rollup Flow
      </button>
    </div>
  );
}

export default FlowSelector;