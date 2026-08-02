import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NODE_LABELS, NODE_INFO } from '../../config';

export const ConditionNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || '==');
  const [value, setValue] = useState(data?.value || '');
  const handles = [
    { type: 'target', position: Position.Left,  id: `${id}-input`, label: 'Input' },
    { type: 'source', position: Position.Right, id: `${id}-true`,  label: 'True', style: { top: '35%' } },
    { type: 'source', position: Position.Right, id: `${id}-false`, label: 'False', style: { top: '75%' } },
  ];
  return (
    <BaseNode id={id} title={NODE_LABELS.CONDITION} info={NODE_INFO.CONDITION} handles={handles}>
      <div className="vs-field">
        <label className="vs-label">Condition</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <select className="vs-select" value={operator} onChange={e => setOperator(e.target.value)} style={{ width: '80px' }}>
            <option value="==">==</option>
            <option value="!=">!=</option>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
          </select>
          <input className="vs-input" type="text" value={value} onChange={e => setValue(e.target.value)} style={{ flex: 1 }} placeholder="Value" />
        </div>
      </div>
    </BaseNode>
  );
};
