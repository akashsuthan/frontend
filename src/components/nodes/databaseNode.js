import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NODE_LABELS, NODE_INFO } from '../../config';

export const DatabaseNode = ({ id, data }) => {
  const [collection, setCollection] = useState(data?.collection || 'users');
  const [operation, setOperation] = useState(data?.operation || 'find');
  const handles = [
    { type: 'target', position: Position.Left,  id: `${id}-query`,   label: 'Query' },
    { type: 'source', position: Position.Right, id: `${id}-results`, label: 'Results' },
  ];
  return (
    <BaseNode id={id} title={NODE_LABELS.DATABASE} info={NODE_INFO.DATABASE} handles={handles}>
      <div className="vs-field">
        <label className="vs-label">Collection</label>
        <input className="vs-input" type="text" value={collection} onChange={e => setCollection(e.target.value)} />
      </div>
      <div className="vs-field">
        <label className="vs-label">Operation</label>
        <select className="vs-select" value={operation} onChange={e => setOperation(e.target.value)}>
          <option value="find">find</option>
          <option value="findOne">findOne</option>
          <option value="insertOne">insertOne</option>
          <option value="updateOne">updateOne</option>
          <option value="deleteOne">deleteOne</option>
          <option value="aggregate">aggregate</option>
        </select>
      </div>
    </BaseNode>
  );
};
