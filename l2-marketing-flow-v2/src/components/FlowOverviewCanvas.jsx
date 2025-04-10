/// src/components/FlowOverviewCanvas.jsx
import React, { useCallback, useMemo, useRef } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Position,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css'; // Import React Flow base styles

// Import Custom Components
import StepNode from './StepNode'; // Custom node for displaying step info

// --- Define nodeTypes OUTSIDE the component function ---
const nodeTypes = { stepNode: StepNode };

// The main component for rendering the flow graph
const FlowOverviewCanvas = ({ flowData, onNodeSelect }) => {
  // Ref for the React Flow container div
  const reactFlowWrapper = useRef(null);

  // --- Layout Definitions ---
  const yPositions = {
    dApp: 100,     // Y position for DApp interaction nodes
    Wallet: 100,   // Align Wallet/Explorer with DApp
    Explorer: 100,
    Backend: 280,  // Lower Y position for Backend nodes
  };
  const nodeHorizontalSpacing = 280;
  const nodeXOffset = 50;

  // --- Node and Edge Calculation (Memoized for Performance) ---
  const initialNodes = useMemo(() => {
    // Create nodes for each step
    const stepNodes = flowData.map((step, index) => ({
        id: `step-${step.step}`,
        type: 'stepNode',
        position: {
            x: nodeXOffset + (index * nodeHorizontalSpacing),
            y: (step.interactionPoint === 'Backend') ? yPositions.Backend : yPositions.dApp,
        },
        data: {
            step: step.step,
            title: step.title,
            interactionPoint: step.interactionPoint,
            technicalSummary: step.technicalExplanation.substring(0, 70) + (step.technicalExplanation.length > 70 ? '...' : ''),
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        selectable: true, // Keep selectable for visual feedback
    }));

    // --- REMOVED Section Label Nodes ---
    // const sectionLabels = [ ... ];
    // return [...sectionLabels, ...stepNodes];

    return stepNodes; // Return only the step nodes

  }, [flowData]);

  // Prepare edges array connecting the step nodes
  const initialEdges = useMemo(() => flowData.slice(0, -1).map((step, index) => ({
    id: `edge-${step.step}-${flowData[index + 1].step}`,
    source: `step-${step.step}`,
    target: `step-${flowData[index + 1].step}`,
    type: 'smoothstep',
    animated: step.interactionPoint !== 'Backend',
    style: { stroke: '#6b7280', strokeWidth: 1.5 },
    markerEnd: { type: 'arrowclosed', color: '#6b7280', width: 15, height: 15 },
  })), [flowData]);

  // --- React Flow State Hooks ---
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Callback for edge connections
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // --- Click Logic ---
  const handleNodeClick = useCallback((event, node) => {
    // Find the complete data object for the clicked step node
    const fullNodeData = flowData.find(d => `step-${d.step}` === node.id);
    if (fullNodeData) {
      // Call the onNodeSelect function passed down from App.jsx
      onNodeSelect(fullNodeData);
    }
  }, [flowData, onNodeSelect]); // Dependencies

  // --- Styling for React Flow UI Components ---
   const minimapStyle = {
     backgroundColor: '#1e1e1e',
     border: '1px solid #333333',
   };

   const nodeColor = (node) => {
     // Color nodes based on interaction point
     switch (node.data?.interactionPoint) {
       case 'dApp': return '#3b82f6';     // blue-500
       case 'Wallet': return '#22c55e';   // green-500
       case 'Explorer': return '#a855f7'; // purple-500
       default: return '#6b7280';         // gray-500 (Backend)
     }
   };

  // --- Render ---
  return (
    <div className="w-full"> {/* Container for legend + canvas */}
        {/* Color Legend */}
        <div className="flex justify-center space-x-4 mb-3 text-xs text-brand-text-secondary">
            <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-1.5 border border-blue-400"></span>dApp</span>
            <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-1.5 border border-green-400"></span>Wallet</span>
            <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-purple-500 mr-1.5 border border-purple-400"></span>Explorer</span>
            <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-gray-500 mr-1.5 border border-gray-400"></span>Backend/Network</span>
        </div>

        {/* React Flow Canvas Container */}
        <div ref={reactFlowWrapper} className="w-full h-[450px] md:h-[500px] bg-brand-black rounded-xl border border-brand-border shadow-lg overflow-hidden">
          <ReactFlowProvider>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                // --- Pass nodeTypes defined OUTSIDE component ---
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.15 }}
                minZoom={0.3} maxZoom={1.5}
                // Attach the click handler
                onNodeClick={handleNodeClick}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={true} // Keep true for visual click feedback
                attributionPosition="bottom-left"
                className="react-flow-dark-theme-overrides" // Use class for global CSS
              >
                <Controls
                    className="react-flow-controls-override"
                    showInteractive={false}
                 />
                <MiniMap
                    nodeColor={nodeColor}
                    style={minimapStyle}
                    pannable zoomable nodeStrokeWidth={2} nodeBorderRadius={4}
                />
                <Background variant="dots" gap={18} size={1} color="#333333" />
              </ReactFlow>
          </ReactFlowProvider>
        </div>

        {/* --- Removed <style jsx global> block --- */}
        {/* Styling should be handled by Tailwind classes on elements or global CSS */}

    </div> // End of main container
  );
};

export default FlowOverviewCanvas;