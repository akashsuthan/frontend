// store.js

import { create } from "zustand";
import { temporal } from "zundo";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create(temporal((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    getNodeID: (type) => {
        const newIDs = {...(get().nodeIDs || {})};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    removeNode: (nodeId) => {
        set({
            nodes: get().nodes.filter((node) => node.id !== nodeId),
            edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
  }), {
    equality: (pastState, currentState) => {
        // Strip out React Flow ephemeral data and positions (so we ignore dragging)
        const stripMeaningful = (nodes) => nodes.map(n => ({
            id: n.id,
            type: n.type,
            data: n.data
        }));

        if (pastState.nodes.length !== currentState.nodes.length) return false;
        if (pastState.edges.length !== currentState.edges.length) return false;
        
        const pastStr = JSON.stringify({ 
            nodes: stripMeaningful(pastState.nodes), 
            edges: pastState.edges.map(e => ({ source: e.source, target: e.target, sourceHandle: e.sourceHandle, targetHandle: e.targetHandle })) 
        });
        const currStr = JSON.stringify({ 
            nodes: stripMeaningful(currentState.nodes), 
            edges: currentState.edges.map(e => ({ source: e.source, target: e.target, sourceHandle: e.sourceHandle, targetHandle: e.targetHandle })) 
        });
        
        return pastStr === currStr;
    }
  }));
