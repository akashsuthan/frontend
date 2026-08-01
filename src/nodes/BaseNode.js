// BaseNode.js

import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, title, children, handles, style }) => {
  return (
    <div className="custom-node" style={style}>
      <div className="node-header">
        <span>{title}</span>
      </div>
      <div className="node-content">
        {children}
      </div>
      
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{ ...handle.style }}
        />
      ))}
    </div>
  );
};
