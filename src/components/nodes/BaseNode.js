import { useState } from "react";
import { Handle } from "reactflow";
import { useStore } from "../../store";
import { X, Info } from 'lucide-react';

export const BaseNode = ({ id, title, children, handles, style, info }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const customName = useStore((state) => state.nodes.find((n) => n.id === id)?.data?.customName);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const displayTitle = customName || title;

  const handleDoubleClick = () => {
    setEditValue(displayTitle);
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateNodeField(id, "customName", editValue.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleBlur();
  };

  return (
    <div className="vs-node" style={style}>
      <div className="vs-node-header">
        {isEditing ? (
          <input 
            autoFocus
            className="vs-node-title-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span 
            className="vs-node-title" 
            onDoubleClick={handleDoubleClick}
            title="Double click to rename"
            style={{ cursor: 'text' }}
          >
            {displayTitle}
          </span>
        )}
        <div style={{ display: 'flex', gap: '4px' }}>
          {info && (
            <div className="vs-node-info" data-tooltip={info}>
              <Info size={15} />
            </div>
          )}
          <button 
            className="vs-node-close" 
            onClick={() => useStore.getState().removeNode(id)}
          ><X size={16} /></button>
        </div>
      </div>
      <div className="vs-node-body">
        {children}
      </div>

      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
          title={handle.label}
        />
      ))}
    </div>
  );
};
