import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const Icon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4o');
  const [temp, setTemp] = useState(data?.temperature ?? 0.7);

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`,  label: 'System prompt', style: { top: '30%' } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`,  label: 'User prompt',   style: { top: '70%' } },
    { type: 'source', position: Position.Right, id: `${id}-response`, label: 'Response' },
  ];

  return (
    <BaseNode id={id} title="LLM" badge="model" icon={<Icon />} accentColor="var(--node-llm)" handles={handles}>
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
