// src/components/StepDetail.jsx
import React from 'react';

// Define colors for sections - adjust HSL/RGB for desired shades on black bg
// Using Tailwind's transparency for background (e.g., /40) and slightly stronger borders
const sectionColors = {
  tech: 'bg-blue-900/40 border-blue-700/60',
  user: 'bg-green-900/40 border-green-700/60',
  marketing: 'bg-purple-900/40 border-purple-700/60',
  partnership: 'bg-yellow-900/40 border-yellow-700/60',
  rewards: 'bg-teal-900/40 border-teal-700/60',
  best: 'bg-red-900/40 border-brand-red/60',
  limitations: 'bg-gray-700/40 border-gray-600/60'
};

// Function to get styling based on interaction point
const getInteractionStyle = (interactionPoint) => {
    switch (interactionPoint) {
        case 'dApp':
            return { text: 'dApp UI Focus', color: 'text-blue-300', border: 'border-blue-500', bg: 'bg-blue-900/30' };
        case 'Wallet':
            return { text: 'Wallet UI Focus', color: 'text-green-300', border: 'border-green-500', bg: 'bg-green-900/30' };
        case 'Explorer':
             return { text: 'Explorer Focus', color: 'text-purple-300', border: 'border-purple-500', bg: 'bg-purple-900/30' };
        default: // Backend or other cases
            return { text: 'Backend / Network', color: 'text-gray-400', border: 'border-gray-600', bg: 'bg-gray-800/30' };
    }
};

function StepDetail({ stepData }) {
  // Handle case where data might not be loaded yet (though less likely now)
  if (!stepData) {
    return <div className="text-center p-10 text-brand-text-secondary">Loading step details...</div>;
  }

  // Helper to render bulleted lists from the data array
  const renderList = (items) => {
    if (!items || items.length === 0) {
        return <p className="text-brand-text-secondary italic text-sm">N/A for this step.</p>;
    }
    return (
      <ul className="list-disc list-outside space-y-1.5 pl-5 text-brand-text-secondary text-sm">
        {items.map((item, index) => (
          // Use dangerouslySetInnerHTML to render simple bold/code markdown
          <li key={index} dangerouslySetInnerHTML={{
              __html: item
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-brand-text font-medium">$1</strong>')
                .replace(/`(.*?)`/g, '<code class="bg-gray-700 text-xs px-1 rounded font-mono">$1</code>')
          }}></li>
        ))}
      </ul>
    );
  };

  // Get the specific style for the current step's interaction point
  const interactionStyle = getInteractionStyle(stepData.interactionPoint);

  return (
    // Main container for the step details
    <div className="bg-brand-card p-4 md:p-6 rounded-xl shadow-lg border border-brand-border">
      {/* Step Title */}
      <h2 className="text-xl md:text-2xl font-bold mb-5 text-brand-text">{stepData.title}</h2>

      {/* Grid or Flex container for sections */}
      <div className="space-y-4">

        {/* Technical Explanation Section */}
        <section className={`p-3 rounded-lg border ${sectionColors.tech}`}>
          <h3 className="text-lg font-semibold mb-1.5 text-blue-300">Technical Explanation</h3>
          {/* Use whitespace-pre-wrap to respect formatting in the data string */}
          <p className="text-brand-text-secondary text-sm leading-relaxed whitespace-pre-wrap">{stepData.technicalExplanation}</p>
        </section>

        {/* User Experience Section with Interaction Highlight */}
        <section className={`p-3 rounded-lg border ${sectionColors.user}`}>
           <div className="flex justify-between items-center mb-1.5">
             <h3 className="text-lg font-semibold text-green-300">User Experience</h3>
             {/* Interaction Point Badge */}
             <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${interactionStyle.border} ${interactionStyle.bg} ${interactionStyle.color}`}>
               {interactionStyle.text}
             </span>
           </div>
          <p className="text-brand-text-secondary text-sm">{stepData.userExperience}</p>
        </section>

        {/* Marketing Opportunities Section */}
        <section className={`p-3 rounded-lg border ${sectionColors.marketing}`}>
          <h3 className="text-lg font-semibold mb-1.5 text-purple-300">Marketing Opportunities (FORTA Firewall - No Partnerships)</h3>
          {renderList(stepData.marketingOpportunities)}
        </section>

        {/* Partnership Opportunities Section (Conditional Rendering) */}
        {stepData.partnershipOpportunities && stepData.partnershipOpportunities.length > 0 && (
           <section className={`p-3 rounded-lg border ${sectionColors.partnership}`}>
             <h3 className="text-lg font-semibold mb-1.5 text-yellow-300">Potential Partnership Ideas</h3>
             {renderList(stepData.partnershipOpportunities)}
           </section>
        )}

         {/* Token Reward Ideas Section (Conditional Rendering) */}
        {stepData.tokenRewardIdeas && stepData.tokenRewardIdeas.length > 0 && (
           <section className={`p-3 rounded-lg border ${sectionColors.rewards}`}>
             <h3 className="text-lg font-semibold mb-1.5 text-teal-300">Token Reward Ideas</h3>
             {renderList(stepData.tokenRewardIdeas)}
           </section>
        )}

        {/* Best Opportunity Section */}
        <section className={`p-3 rounded-lg border ${sectionColors.best}`}>
          <h3 className="text-lg font-semibold mb-1.5 text-brand-red">🏆 Best Opportunity (No Partnerships)</h3>
          <p className="text-brand-text-secondary text-sm" dangerouslySetInnerHTML={{
              __html: stepData.bestOpportunity
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-brand-text">$1</strong>')
           }}></p>
        </section>

        {/* Limitations Section */}
        <section className={`p-3 rounded-lg border ${sectionColors.limitations}`}>
           <h3 className="text-lg font-semibold mb-1.5 text-gray-400">⚠️ Limitations (No Partnerships)</h3>
           <p className="text-gray-300 italic text-sm">{stepData.limitations}</p>
        </section>

      </div> {/* End of sections container */}
    </div> // End of main component container
  );
}

export default StepDetail;