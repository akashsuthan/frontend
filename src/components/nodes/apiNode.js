import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NODE_LABELS, NODE_INFO } from '../../config';

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/v1');
  const [method, setMethod] = useState(data?.method || 'GET');
  const handles = [
    { type: 'target', position: Position.Left,  id: `${id}-trigger`, label: 'Trigger' },
    { type: 'target', position: Position.Left,  id: `${id}-body`,    label: 'Body',    style: { top: '70%' } },
    { type: 'source', position: Position.Right, id: `${id}-data`,    label: 'Response' },
  ];
  return (
    <BaseNode id={id} title={NODE_LABELS.API} info={NODE_INFO.API} handles={handles}>
      <div className="vs-field" style={{ flexDirection: 'row', gap: '8px', alignItems: 'flex-end' }}>
        <div style={{ flex: '0 0 72px' }}>
          <label className="vs-label">Method</label>
          <select className="vs-select" value={method} onChange={e => setMethod(e.target.value)}>
            <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option><option>PATCH</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label className="vs-label">URL</label>
          <input className="vs-input" type="text" value={url} onChange={e => setUrl(e.target.value)} />
        </div>
      </div>
    </BaseNode>
  );
};
