// src/components/HoverModal.jsx
import React from 'react';

// Reuse section colors for consistency (or define new ones)
const sectionColors = {
  tech: 'border-blue-700/60',
  user: 'border-green-700/60',
  marketing: 'border-purple-700/60',
  partnership: 'border-yellow-700/60',
  rewards: 'border-teal-700/60',
};

function HoverModal({ nodeData, position }) {
  if (!nodeData || !position) return null;

  // Basic positioning based on mouse coordinates
  // Add offsets to prevent the modal from being directly under the cursor
  const style = {
    left: `${position.x + 15}px`,
    top: `${position.y + 15}px`,
    maxWidth: '450px', // Limit width
    zIndex: 100, // Ensure it's above the flow canvas
  };

  const renderList = (items) => {
    if (!items || items.length === 0) return <p className="text-brand-text-secondary italic text-xs">N/A</p>;
    return (
      <ul className="list-disc list-outside space-y-1 pl-4 text-brand-text-secondary text-xs">
        {items.map((item, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-brand-text font-medium">$1</strong>').replace(/`(.*?)`/g, '<code class="bg-gray-700 text-xs px-1 rounded">$1</code>') }}></li>
        ))}
      </ul>
    );
  };


  return (
    <div
      className="absolute bg-brand-card p-4 rounded-lg shadow-xl border border-brand-border text-sm text-brand-text"
      style={style}
    >
      <h3 className="text-base font-bold mb-2 text-brand-text">{nodeData.title}</h3>

      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2"> {/* Scrollable content */}
        <section className={`p-2 rounded border ${sectionColors.tech}`}>
          <h4 className="text-xs font-semibold mb-1 text-blue-300 uppercase tracking-wider">Technical</h4>
          <p className="text-brand-text-secondary text-xs leading-relaxed whitespace-pre-wrap">{nodeData.technicalExplanation}</p>
        </section>

        <section className={`p-2 rounded border ${sectionColors.user}`}>
          <h4 className="text-xs font-semibold mb-1 text-green-300 uppercase tracking-wider">User Experience</h4>
          <p className="text-brand-text-secondary text-xs">{nodeData.userExperience}</p>
        </section>

        <section className={`p-2 rounded border ${sectionColors.marketing}`}>
            <h4 className="text-xs font-semibold mb-1 text-purple-300 uppercase tracking-wider">Marketing (No Partnership)</h4>
             {renderList(nodeData.marketingOpportunities)}
         </section>

         {nodeData.partnershipOpportunities && nodeData.partnershipOpportunities.length > 0 && (
            <section className={`p-2 rounded border ${sectionColors.partnership}`}>
                 <h4 className="text-xs font-semibold mb-1 text-yellow-300 uppercase tracking-wider">Partnership Ideas</h4>
                 {renderList(nodeData.partnershipOpportunities)}
             </section>
         )}

         {nodeData.tokenRewardIdeas && nodeData.tokenRewardIdeas.length > 0 && (
            <section className={`p-2 rounded border ${sectionColors.rewards}`}>
                 <h4 className="text-xs font-semibold mb-1 text-teal-300 uppercase tracking-wider">Token Reward Ideas</h4>
                 {renderList(nodeData.tokenRewardIdeas)}
             </section>
         )}
      </div>
       <p className="text-xs text-gray-500 mt-2 text-right">Hover off node to close</p>
    </div>
  );
}

export default HoverModal;