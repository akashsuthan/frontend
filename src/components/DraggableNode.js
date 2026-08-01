// DraggableNode.js — pill with icon + color dot

import { NODE_TYPES, NODE_LABELS } from '../config';

const NODE_META = {
  [NODE_TYPES.INPUT]:     { label: NODE_LABELS.INPUT,       color: '#06b6d4', icon: '⬡' },
  [NODE_TYPES.LLM]:       { label: NODE_LABELS.LLM,         color: '#f59e0b', icon: '⬡' },
  [NODE_TYPES.OUTPUT]:    { label: NODE_LABELS.OUTPUT,      color: '#10b981', icon: '⬡' },
  [NODE_TYPES.TEXT]:      { label: NODE_LABELS.TEXT,        color: '#8b5cf6', icon: '⬡' },
  [NODE_TYPES.TRANSFORM]: { label: NODE_LABELS.TRANSFORM,   color: '#3b82f6', icon: '⬡' },
  [NODE_TYPES.FILTER]:    { label: NODE_LABELS.FILTER,      color: '#ef4444', icon: '⬡' },
  [NODE_TYPES.MATH]:      { label: NODE_LABELS.MATH,        color: '#f97316', icon: '⬡' },
  [NODE_TYPES.API]:       { label: NODE_LABELS.API,         color: '#06b6d4', icon: '⬡' },
  [NODE_TYPES.DATABASE]:  { label: NODE_LABELS.DATABASE,    color: '#6366f1', icon: '⬡' },
};

// Icons removed in favor of simple pill design

export const DraggableNode = ({ type, label }) => {
  const meta = NODE_META[type] || { label, color: '#7c3aed' };

  const onDragStart = (event) => {
    event.target.style.opacity = '0.7';
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType: type }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="node-pill"
      draggable
      onDragStart={onDragStart}
      onDragEnd={e => (e.target.style.opacity = '1')}
      title={`Drag to add ${meta.label} node`}
    >
      {meta.label}
    </div>
  );
};
