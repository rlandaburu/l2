// src/components/FlowVisualizer.jsx
import React, { useState, useEffect } from 'react';
import StepDetail from './StepDetail';
import Navigation from './Navigation';

function FlowVisualizer({ flowData }) { // Removed flowType prop as it's unified
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Reset to step 0 when component mounts or potentially when flowData changes
  // (though flowData is constant now)
  useEffect(() => {
    setCurrentStepIndex(0);
    setFade(true); // Ensure it's visible initially
  }, [flowData]); // Dependency array ensures reset if flowData prop changes

  const goToStep = (index) => {
    if (index >= 0 && index < flowData.length && index !== currentStepIndex) { // Prevent re-render on same step
        setFade(false);
        setTimeout(() => {
            setCurrentStepIndex(index);
            setFade(true);
         }, 150); // Slightly faster fade
    }
  };

  const goToNextStep = () => goToStep(currentStepIndex + 1);
  const goToPreviousStep = () => goToStep(currentStepIndex - 1);

  const currentStepData = flowData[currentStepIndex];

  // Ensure data exists before rendering detail
  if (!currentStepData) {
      return <div className="text-center text-brand-text-secondary">Loading step data...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
       <Navigation
         onPrevious={goToPreviousStep}
         onNext={goToNextStep}
         currentStep={currentStepIndex}
         totalSteps={flowData.length}
       />

       {/* Key added to StepDetail ensures component remounts/re-renders properly on step change */}
       <div className={`mt-4 transition-opacity duration-150 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}>
         <StepDetail key={currentStepIndex} stepData={currentStepData} />
       </div>

       {/* Progress Dots */}
       <div className="flex justify-center space-x-2 mt-6 pb-8">
         {flowData.map((_, index) => (
           <button
             key={index}
             onClick={() => goToStep(index)}
             className={`w-3 h-3 rounded-full transition-all duration-200 ${
               index === currentStepIndex ? 'bg-brand-red scale-125 ring-2 ring-brand-red/50 ring-offset-2 ring-offset-brand-black' : 'bg-brand-border hover:bg-gray-600'
             }`}
             aria-label={`Go to step ${index + 1}`}
           ></button>
         ))}
       </div>
    </div>
  );
}

export default FlowVisualizer;