import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NODE_LABELS, NODE_INFO } from '../../config';

export const TransformNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'Uppercase');
  const handles = [
    { type: 'target', position: Position.Left,  id: `${id}-input`,  label: 'Input' },
    { type: 'source', position: Position.Right, id: `${id}-output`, label: 'Output' },
  ];
  return (
    <BaseNode id={id} title={NODE_LABELS.TRANSFORM} info={NODE_INFO.TRANSFORM} handles={handles}>
      <div className="vs-field">
        <label className="vs-label">Method</label>
        <select className="vs-select" value={method} onChange={e => setMethod(e.target.value)}>
          <option value="Uppercase">Uppercase</option>
          <option value="Lowercase">Lowercase</option>
          <option value="Trim">Trim whitespace</option>
          <option value="Reverse">Reverse</option>
          <option value="Slugify">Slugify</option>
        </select>
      </div>
    </BaseNode>
  );
};
