// DraggableNode.js — pill with icon + color dot

const NODE_META = {
  customInput: { label: 'Input',       color: '#06b6d4', icon: '⬡' },
  llm:          { label: 'LLM',        color: '#f59e0b', icon: '⬡' },
  customOutput: { label: 'Output',     color: '#10b981', icon: '⬡' },
  text:         { label: 'Text',       color: '#8b5cf6', icon: '⬡' },
  transform:    { label: 'Transform',  color: '#3b82f6', icon: '⬡' },
  filter:       { label: 'Filter',     color: '#ef4444', icon: '⬡' },
  math:         { label: 'Math',       color: '#f97316', icon: '⬡' },
  api:          { label: 'API Request',color: '#06b6d4', icon: '⬡' },
  database:     { label: 'Database',   color: '#6366f1', icon: '⬡' },
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
