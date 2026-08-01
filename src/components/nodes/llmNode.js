import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NODE_LABELS, NODE_INFO } from '../../config';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4o');
  const [temp, setTemp] = useState(data?.temperature ?? 0.7);

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`,  label: 'System', style: { top: `${100/3}%` } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`,  label: 'Prompt',   style: { top: `${200/3}%` } },
    { type: 'source', position: Position.Right, id: `${id}-response`, label: 'Response' },
  ];

  return (
    <BaseNode id={id} title={NODE_LABELS.LLM} info={NODE_INFO.LLM} handles={handles}>
      <div className="vs-field">
        <label className="vs-label">Model</label>
        <select className="vs-select" value={model} onChange={e => setModel(e.target.value)}>
          <option value="gpt-4o">GPT-4o</option>
          <option value="gpt-4o-mini">GPT-4o mini</option>
          <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
          <option value="claude-3-haiku">Claude 3 Haiku</option>
          <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
        </select>
      </div>
      <div className="vs-field">
        <label className="vs-label">Temperature — {temp}</label>
        <input
          type="range" min="0" max="2" step="0.1"
          value={temp}
          onChange={e => setTemp(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--node-llm)' }}
        />
      </div>
    </BaseNode>
  );
};
