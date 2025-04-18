// src/components/DetailModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Reusing colors and functions
const sectionColors = {
  tech: 'bg-blue-900/40 border-blue-700/60',
  user: 'bg-green-900/40 border-green-700/60',
  marketing: 'bg-purple-900/40 border-purple-700/60',
  partnership: 'bg-yellow-900/40 border-yellow-700/60',
  rewards: 'bg-teal-900/40 border-teal-700/60',
  best: 'bg-red-900/40 border-brand-red/60',
  limitations: 'bg-gray-700/40 border-gray-600/60'
};

const getInteractionStyle = (interactionPoint) => {
    switch (interactionPoint) {
        case 'dApp':
            return { text: 'dApp UI Focus', color: 'text-blue-300', border: 'border-blue-500', bg: 'bg-blue-900/30' };
        case 'Wallet':
            return { text: 'Wallet UI Focus', color: 'text-green-300', border: 'border-green-500', bg: 'bg-green-900/30' };
        case 'Explorer':
             return { text: 'Explorer Focus', color: 'text-purple-300', border: 'border-purple-500', bg: 'bg-purple-900/30' };
        default:
            return { text: 'Backend / Network', color: 'text-gray-400', border: 'border-gray-600', bg: 'bg-gray-800/30' };
    }
};

// Helper function to convert basic markdown to HTML for dangerouslySetInnerHTML
const formatTextWithMarkdown = (text = '') => {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-brand-text font-medium">$1</strong>') // Bold
        .replace(/`(.*?)`/g, '<code class="bg-gray-700 text-xs px-1 rounded font-mono">$1</code>'); // Inline code
}

function DetailModal({ nodeData, onClose }) {
  if (!nodeData) return null;

  // Helper to render bulleted lists, also using formatTextWithMarkdown
  const renderList = (items) => {
    if (!items || items.length === 0) {
        return <p className="text-brand-text-secondary italic text-xs">N/A for this step.</p>;
    }
    return (
      <ul className="list-disc list-outside space-y-1 pl-4 text-brand-text-secondary text-xs">
        {items.map((item, index) => (
          <li key={index} dangerouslySetInnerHTML={{
              __html: formatTextWithMarkdown(item) // Apply formatting here too
          }}></li>
        ))}
      </ul>
    );
  };

  const interactionStyle = getInteractionStyle(nodeData.interactionPoint);

  // Animation variants
  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { delay: 0.05, duration: 0.2 } },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 0.15 } },
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop-modal"
        initial="hidden" animate="visible" exit="hidden"
        variants={backdropVariants}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/70 z-40"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        key="modal-content-main"
        variants={modalVariants}
        initial="hidden" animate="visible" exit="exit"
        // transition={{ type: 'spring', stiffness: 300, damping: 25 }} // Spring can feel jumpy sometimes
        transition={{ type: "tween", ease: "easeOut", duration: 0.25 }} // Tween is smoother
        className="fixed inset-0 m-auto w-11/12 max-w-2xl h-fit max-h-[85vh] bg-brand-card border border-brand-border rounded-xl shadow-2xl z-50 flex flex-col"
        role="dialog" // Accessibility
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-brand-border flex-shrink-0">
          <h2 id="modal-title" className="text-lg md:text-xl font-bold text-brand-text">{nodeData.title}</h2>
          <button
            onClick={onClose}
            className="text-brand-text-secondary hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 focus:ring-offset-brand-card"
            aria-label="Close Details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}> {/* Increased stroke width */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-grow overflow-y-auto p-4 space-y-3 text-sm">
          {/* Technical Explanation */}
          <section className={`p-3 rounded-lg border ${sectionColors.tech}`}>
            <h3 className="text-base font-semibold mb-1.5 text-blue-300">Technical Explanation</h3>
            {/* --- APPLY DANGEROUSLYSETINNERHTML HERE --- */}
            <p
                className="text-brand-text-secondary text-xs leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: formatTextWithMarkdown(nodeData.technicalExplanation) }}
            ></p>
          </section>

          {/* User Experience */}
          <section className={`p-3 rounded-lg border ${sectionColors.user}`}>
             <div className="flex justify-between items-center mb-1.5">
               <h3 className="text-base font-semibold text-green-300">User Experience</h3>
               <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${interactionStyle.border} ${interactionStyle.bg} ${interactionStyle.color}`}>
                 {interactionStyle.text}
               </span>
             </div>
             {/* --- APPLY DANGEROUSLYSETINNERHTML HERE --- */}
            <p
                className="text-brand-text-secondary text-xs"
                dangerouslySetInnerHTML={{ __html: formatTextWithMarkdown(nodeData.userExperience) }}
            ></p>
          </section>

          {/* Marketing Opportunities */}
          <section className={`p-3 rounded-lg border ${sectionColors.marketing}`}>
            <h3 className="text-base font-semibold mb-1.5 text-purple-300">Marketing (No Direct Partnership)</h3>
            {renderList(nodeData.marketingOpportunities)}
          </section>

          {/* Partnership Opportunities */}
          {nodeData.partnershipOpportunities && nodeData.partnershipOpportunities.length > 0 && (
             <section className={`p-3 rounded-lg border ${sectionColors.partnership}`}>
               <h3 className="text-base font-semibold mb-1.5 text-yellow-300">Partnership Leverage (<span className="text-xs font-light">Mode, Plume, Ink, Balmy, RaaS</span>)</h3>
               {renderList(nodeData.partnershipOpportunities)}
             </section>
          )}

           {/* Token Reward Ideas */}
          {nodeData.tokenRewardIdeas && nodeData.tokenRewardIdeas.length > 0 && (
             <section className={`p-3 rounded-lg border ${sectionColors.rewards}`}>
               <h3 className="text-base font-semibold mb-1.5 text-teal-300">Token Reward Ideas</h3>
               {renderList(nodeData.tokenRewardIdeas)}
             </section>
          )}

           {/* Best Opportunity */}
           <section className={`p-3 rounded-lg border ${sectionColors.best}`}>
               <h3 className="text-base font-semibold mb-1.5 text-brand-red">🏆 Best Opportunity (Leveraging Partners)</h3>
               <p className="text-brand-text-secondary text-xs" dangerouslySetInnerHTML={{
                   __html: formatTextWithMarkdown(nodeData.bestOpportunity) // Also format here
               }}></p>
           </section>

           {/* Limitations */}
           <section className={`p-3 rounded-lg border ${sectionColors.limitations}`}>
                <h3 className="text-base font-semibold mb-1.5 text-gray-400">⚠️ Limitations (User Visibility)</h3>
                {/* Limitations likely won't have markdown, but apply for consistency if needed */}
                <p className="text-gray-300 italic text-xs" dangerouslySetInnerHTML={{
                    __html: formatTextWithMarkdown(nodeData.limitations)
                }}></p>
            </section>

        </div> {/* End Scrollable Content */}
      </motion.div> {/* End Modal Content */}
    </>
  );
}

export default DetailModal;