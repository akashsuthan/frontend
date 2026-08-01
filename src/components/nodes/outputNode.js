import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NODE_LABELS } from '../../config';

const Icon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-value`, label: 'Input' }
  ];

  return (
    <BaseNode id={id} title={NODE_LABELS.OUTPUT} badge="sink" icon={<Icon />} accentColor="var(--node-output)" handles={handles}>
      <div className="vs-field">
        <label className="vs-label">Name</label>
        <input className="vs-input" type="text" value={currName} onChange={e => setCurrName(e.target.value)} />
      </div>
      <div className="vs-field">
        <label className="vs-label">Type</label>
        <select className="vs-select" value={outputType} onChange={e => setOutputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
