// BaseNode.js — Professional redesign

import { Handle } from "reactflow";
import { useStore } from "../../store";
import { X, Info } from 'lucide-react';

export const BaseNode = ({ id, title, children, handles, style, info }) => {
  return (
    <div className="vs-node" style={style}>
      <div className="vs-node-header">
        <span className="vs-node-title">{title}</span>
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
