// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  useEffect(() => {
    // Extract variables using regex {{ variable }}
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    let match;
    const foundVariables = new Set();
    while ((match = regex.exec(currText)) !== null) {
      foundVariables.add(match[1]);
    }
    setVariables(Array.from(foundVariables));

    // Dynamic resize of textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      
      // Let's also grow width slightly if it's very long, but limit it
      const newWidth = Math.max(200, Math.min(400, currText.length * 8));
      textareaRef.current.style.width = `${newWidth}px`;
    }
  }, [currText]);

  // Calculate dynamic positions for variable handles
  const handles = variables.map((variable, index) => {
    // Distribute handles evenly along the left edge
    const topPosition = variables.length === 1 ? 50 : 20 + (60 / (variables.length - 1)) * index;
    return {
      type: 'target',
      position: Position.Left,
      id: `${id}-${variable}`,
      style: { top: `${topPosition}%` }
    };
  });

  // Always add the default source handle on the right
  handles.push({
    type: 'source',
    position: Position.Right,
    id: `${id}-output`
  });

  return (
    <BaseNode id={id} title="Text" handles={handles}>
      <label className="node-label">
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          className="node-textarea"
          rows={1}
        />
      </label>
    </BaseNode>
  );
}
