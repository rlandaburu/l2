// src/App.jsx
import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import FlowVisualizer from './components/FlowVisualizer';
import FlowOverviewCanvas from './components/FlowOverviewCanvas';
import DetailModal from './components/DetailModal'; // Import the new modal
import { unifiedFlowData } from './data';

function App() {
  const [viewMode, setViewMode] = useState('overview');
  const [selectedNodeData, setSelectedNodeData] = useState(null); // State for modal data

  const flowData = unifiedFlowData;

  // Callback for node selection from the overview canvas
  const handleNodeSelect = useCallback((nodeData) => {
    console.log("Node selected, opening modal:", nodeData);
    setSelectedNodeData(nodeData); // Set data to show modal
  }, []);

  // Callback to close the modal
  const handleCloseModal = useCallback(() => {
    console.log("Closing modal");
    setSelectedNodeData(null); // Clear data to hide modal
  }, []);

  // Helper function for button styling
  const getButtonClasses = (mode) => {
    const baseClasses = "px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-black focus:ring-brand-red";
    if (viewMode === mode) {
      return `${baseClasses} bg-brand-red text-white shadow-md cursor-default`;
    } else {
      return `${baseClasses} bg-brand-card text-brand-text-secondary hover:bg-gray-700 hover:text-white`;
    }
  };

  return (
    // Removed the outer flex container for sidebar layout
    <div className="min-h-screen bg-brand-black text-brand-text">

        {/* Use a standard layout, modal will overlay */}
        <div className="flex flex-col min-h-screen"> {/* Ensure content takes height */}
            <header className="text-center pt-8 pb-4 px-4 flex-shrink-0">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-white">
                  L2 Transaction Flow Analysis
                </h1>
                <p className="text-base text-brand-text-secondary max-w-3xl mx-auto">
                    Technical deep dive for <span className="text-brand-red font-semibold">FORTA Firewall</span> strategy, leveraging partnerships
                    (<span className="text-xs font-light opacity-80">Mode, Plume, Ink, Balmy, Conduit, Gelato, Caldera</span>).
                </p>
            </header>

             <div className="flex justify-center space-x-4 my-4 flex-shrink-0">
                <button onClick={() => setViewMode('overview')} className={getButtonClasses('overview')} >
                  Flow Overview (Graph)
                </button>
                <button onClick={() => setViewMode('detail')} className={getButtonClasses('detail')} >
                  Detailed Steps View
                </button>
              </div>

              <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6">
                {viewMode === 'overview' ? (
                   <FlowOverviewCanvas
                        flowData={flowData}
                        onNodeSelect={handleNodeSelect}
                    />
                ) : (
                   <FlowVisualizer key={viewMode} flowData={flowData} />
                )}
              </main>

              <footer className="text-center py-4 border-t border-brand-border flex-shrink-0">
                 <p className="text-sm text-brand-text-secondary">
                     FORTA Firewall | L2 Transaction Flow Analysis Tool
                 </p>
             </footer>
        </div>

        {/* Detail Modal Rendering Area */}
        {/* AnimatePresence handles the smooth entry/exit */}
        <AnimatePresence>
             {selectedNodeData && ( // Render modal only when data exists
                 <DetailModal
                     key="detail-modal-instance" // Key helps AnimatePresence track the element
                     nodeData={selectedNodeData}
                     onClose={handleCloseModal} // Pass close handler
                 />
             )}
         </AnimatePresence>

    </div> // End Main App container
  );
}

export default App;