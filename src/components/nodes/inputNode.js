import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-value`, label: 'Output' }
  ];

  return (
    <BaseNode id={id} title="Input" handles={handles}>
      <div className="vs-field">
        <label className="vs-label">
           Name
        </label>
        <input className="vs-input" type="text" value={currName} onChange={e => setCurrName(e.target.value)} />
      </div>
      <div className="vs-field">
        <label className="vs-label">
           Type
        </label>
        <select className="vs-select" value={inputType} onChange={e => setInputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
