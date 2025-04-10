// src/components/StepNode.jsx
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const getNodeStyle = (interactionPoint) => {
  let borderColor = 'border-gray-600'; // Default/Backend
  if (interactionPoint === 'dApp') borderColor = 'border-blue-500';
  else if (interactionPoint === 'Wallet') borderColor = 'border-green-500';
  else if (interactionPoint === 'Explorer') borderColor = 'border-purple-500'; // Added for Explorer

  return `bg-brand-card p-3 rounded-lg shadow-md border-2 ${borderColor} w-48 text-xs transition-all duration-200 hover:shadow-lg`;
};

const getInteractionLabel = (interactionPoint) => {
    let color = 'text-gray-400';
    let text = 'Backend / Network';
    if (interactionPoint === 'dApp') { color = 'text-blue-400'; text = 'dApp UI Interaction'; }
    else if (interactionPoint === 'Wallet') { color = 'text-green-400'; text = 'Wallet Interaction'; }
    else if (interactionPoint === 'Explorer') { color = 'text-purple-400'; text = 'Explorer Interaction'; }
    return <div className={`font-semibold mb-1 ${color}`}>{text}</div>;
}

// Node component is now simpler, primarily for display
const StepNode = memo(({ data, selected }) => { // `selected` prop passed by React Flow
    return (
      // Added 'react-flow__node-stepNode' class for selection styling target
      <div className={`react-flow__node-stepNode ${getNodeStyle(data.interactionPoint)} ${selected ? 'selected' : ''}`}>
        <Handle type="target" position={Position.Left} className="!bg-gray-500 !w-1.5 !h-1.5" />
        <Handle type="source" position={Position.Right} className="!bg-gray-500 !w-1.5 !h-1.5" />
  
        <div className="font-bold text-brand-text text-sm mb-1">Step {data.step}: {data.title.split(':')[1].trim()}</div>
        {getInteractionLabel(data.interactionPoint)}
        <p className="text-brand-text-secondary mt-1">
          {data.technicalSummary}
        </p>
        {/* Optional: Add a subtle hint that it's clickable */}
        <div className="text-xs text-gray-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click for details</div>
      </div>
    );
  });
  
  export default StepNode;