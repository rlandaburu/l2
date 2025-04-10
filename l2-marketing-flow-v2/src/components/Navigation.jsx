// src/components/Navigation.jsx
import React from 'react';

function Navigation({ onPrevious, onNext, currentStep, totalSteps }) {
  const buttonBaseClasses = "px-5 py-2 rounded-md font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-black focus:ring-brand-red disabled:opacity-50 disabled:cursor-not-allowed";
  const activeClasses = "bg-brand-red text-white hover:bg-brand-red-hover";
  //const inactiveClasses = "bg-brand-card text-brand-text-secondary hover:bg-gray-700 hover:text-white";

  return (
    <div className="flex justify-between items-center mt-8">
      <button
        onClick={onPrevious}
        disabled={currentStep === 0}
        className={`${buttonBaseClasses} ${currentStep === 0 ? 'bg-gray-600 text-gray-400' : activeClasses}`}
      >
        ← Previous Step
      </button>
      <span className="text-brand-text-secondary font-medium">
        Step {currentStep + 1} of {totalSteps}
      </span>
      <button
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className={`${buttonBaseClasses} ${currentStep === totalSteps - 1 ? 'bg-gray-600 text-gray-400' : activeClasses}`}
      >
        Next Step →
      </button>
    </div>
  );
}

export default Navigation;