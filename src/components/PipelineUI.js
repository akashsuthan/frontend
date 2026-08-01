import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap, BackgroundVariant } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { TransformNode, FilterNode, MathNode, APINode, DatabaseNode } from './nodes/newNodes';
import { NODE_TYPES } from '../config';
import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  [NODE_TYPES.INPUT]: InputNode, 
  [NODE_TYPES.LLM]: LLMNode, 
  [NODE_TYPES.OUTPUT]: OutputNode,
  [NODE_TYPES.TEXT]: TextNode, 
  [NODE_TYPES.TRANSFORM]: TransformNode, 
  [NODE_TYPES.FILTER]: FilterNode,
  [NODE_TYPES.MATH]: MathNode, 
  [NODE_TYPES.API]: APINode, 
  [NODE_TYPES.DATABASE]: DatabaseNode,
};

const selector = (state) => ({
  nodes: state.nodes, edges: state.edges, getNodeID: state.getNodeID,
  addNode: state.addNode, onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange, onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        e.shiftKey ? useStore.temporal.getState().redo() : useStore.temporal.getState().undo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        useStore.temporal.getState().redo();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    
    if (!reactFlowInstance) {
      alert("React Flow is still loading");
      return;
    }

    try {
      const dataStr = event?.dataTransfer?.getData('application/reactflow');
      if (dataStr) {
        const { nodeType: type } = JSON.parse(dataStr);
        if (!type) return;
        
        const bounds = reactFlowWrapper.current.getBoundingClientRect();
        const position = reactFlowInstance.project({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        });
        
        const nodeID = getNodeID(type);
        addNode({ id: nodeID, type, position, data: { id: nodeID, nodeType: type } });
      }
    } catch (err) {
      alert("Error dropping node: " + err.message);
    }
  }, [reactFlowInstance, getNodeID, addNode]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div 
      ref={reactFlowWrapper} 
      className="canvas-area" 
      style={{ height: '100%', width: '100%' }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes} edges={edges}
        onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance} nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        defaultEdgeOptions={{ type: 'smoothstep', animated: true }}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} color="rgba(255,255,255,0.04)" gap={24} size={1.5} />
        <Controls />
        <MiniMap nodeColor={() => 'rgba(124,58,237,0.5)'} maskColor="rgba(7,13,26,0.7)" />
      </ReactFlow>
    </div>
  );
};
