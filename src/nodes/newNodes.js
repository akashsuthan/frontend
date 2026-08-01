// newNodes.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

// 1. TransformNode
export const TransformNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'Uppercase');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode id={id} title="Transform" handles={handles}>
      <label className="node-label">
        Method:
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="node-select">
          <option value="Uppercase">Uppercase</option>
          <option value="Lowercase">Lowercase</option>
        </select>
      </label>
    </BaseNode>
  );
};

// 2. FilterNode
export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'Length > 5');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode id={id} title="Filter" handles={handles}>
      <label className="node-label">
        Condition:
        <input 
          type="text" 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)} 
          className="node-input"
        />
      </label>
    </BaseNode>
  );
};

// 3. MathNode
export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'Add');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-a`, style: { top: '30%' } },
    { type: 'target', position: Position.Left, id: `${id}-b`, style: { top: '70%' } },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode id={id} title="Math" handles={handles}>
      <label className="node-label">
        Operation:
        <select value={operation} onChange={(e) => setOperation(e.target.value)} className="node-select">
          <option value="Add">Add</option>
          <option value="Subtract">Subtract</option>
          <option value="Multiply">Multiply</option>
        </select>
      </label>
    </BaseNode>
  );
};

// 4. APINode
export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-trigger` },
    { type: 'source', position: Position.Right, id: `${id}-data` }
  ];

  return (
    <BaseNode id={id} title="API Request" handles={handles}>
      <label className="node-label">
        URL:
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          className="node-input"
        />
      </label>
    </BaseNode>
  );
};

// 5. DatabaseNode
export const DatabaseNode = ({ id, data }) => {
  const [collection, setCollection] = useState(data?.collection || 'users');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-query` },
    { type: 'source', position: Position.Right, id: `${id}-results` }
  ];

  return (
    <BaseNode id={id} title="Database" handles={handles}>
      <label className="node-label">
        Collection:
        <input 
          type="text" 
          value={collection} 
          onChange={(e) => setCollection(e.target.value)} 
          className="node-input"
        />
      </label>
    </BaseNode>
  );
};
