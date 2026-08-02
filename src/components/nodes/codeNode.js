import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NODE_LABELS, NODE_INFO } from '../../config';

export const CodeNode = ({ id, data }) => {
  const [language, setLanguage] = useState(data?.language || 'python');
  const [code, setCode] = useState(data?.code || 'def main(input):\n  return input');
  const handles = [
    { type: 'target', position: Position.Left,  id: `${id}-input`, label: 'Input' },
    { type: 'source', position: Position.Right, id: `${id}-output`, label: 'Output' },
  ];
  return (
    <BaseNode id={id} title={NODE_LABELS.CODE} info={NODE_INFO.CODE} handles={handles} style={{ width: 280 }}>
      <div className="vs-field">
        <label className="vs-label">Language</label>
        <select className="vs-select" value={language} onChange={e => setLanguage(e.target.value)}>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>
      <div className="vs-field">
        <label className="vs-label">Code</label>
        <textarea 
          className="vs-textarea" 
          value={code} 
          onChange={e => setCode(e.target.value)} 
          style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', minHeight: '80px' }}
        />
      </div>
    </BaseNode>
  );
};
