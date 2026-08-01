import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NODE_LABELS, NODE_INFO } from '../../config';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-value`, label: 'Value' }
  ];

  return (
    <BaseNode id={id} title={NODE_LABELS.OUTPUT} info={NODE_INFO.OUTPUT} handles={handles}>
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
