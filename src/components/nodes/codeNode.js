import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NODE_LABELS, NODE_INFO } from '../../config';
import Editor from '@monaco-editor/react';

export const CodeNode = ({ id, data }) => {
  const [language, setLanguage] = useState(data?.language || 'javascript');
  const [code, setCode] = useState(data?.code || "console.log(input);");
  const handles = [
    { type: 'target', position: Position.Left,  id: `${id}-input`, label: 'Input' },
    { type: 'source', position: Position.Right, id: `${id}-output`, label: 'Output' },
  ];
  return (
    <BaseNode id={id} title={NODE_LABELS.CODE} info={NODE_INFO.CODE} handles={handles} style={{ width: 320 }}>
      <div className="vs-field">
        <label className="vs-label">Language</label>
        <select className="vs-select" value={language} onChange={e => setLanguage(e.target.value)}>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>
      <div className="vs-field">
        <label className="vs-label">Code</label>
        <div 
          className="nodrag"
          onKeyDown={(e) => e.stopPropagation()}
          style={{ height: '140px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-focus)' }}
        >
          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 11,
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              lineNumbers: 'on',
              padding: { top: 8 },
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              scrollbar: { vertical: 'hidden' }
            }}
          />
        </div>
      </div>
    </BaseNode>
  );
};
