import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { NODE_LABELS, NODE_INFO } from '../../config';

/* ── 1. Transform ── */
export const TransformNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'Uppercase');
  const handles = [
    { type: 'target', position: Position.Left,  id: `${id}-input`,  label: 'Input' },
    { type: 'source', position: Position.Right, id: `${id}-output`, label: 'Output' },
  ];
  return (
    <BaseNode id={id} title={NODE_LABELS.TRANSFORM} info={NODE_INFO.TRANSFORM} handles={handles}>
      <div className="vs-field">
        <label className="vs-label">Method</label>
        <select className="vs-select" value={method} onChange={e => setMethod(e.target.value)}>
          <option value="Uppercase">Uppercase</option>
          <option value="Lowercase">Lowercase</option>
          <option value="Trim">Trim whitespace</option>
          <option value="Reverse">Reverse</option>
          <option value="Slugify">Slugify</option>
        </select>
      </div>
    </BaseNode>
  );
};

/* ── 2. Filter ── */
export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'length > 5');
  const handles = [
    { type: 'target', position: Position.Left,  id: `${id}-input`,  label: 'Input' },
    { type: 'source', position: Position.Right, id: `${id}-pass`,   label: 'Pass',  style: { top: '35%' } },
    { type: 'source', position: Position.Right, id: `${id}-fail`,   label: 'Fail',  style: { top: '65%' } },
  ];
  return (
    <BaseNode id={id} title={NODE_LABELS.FILTER} info={NODE_INFO.FILTER} handles={handles}>
      <div className="vs-field">
        <label className="vs-label">Condition</label>
        <input className="vs-input" type="text" value={condition} onChange={e => setCondition(e.target.value)} placeholder="e.g. length > 5" />
      </div>
    </BaseNode>
  );
};

/* ── 3. Math ── */
export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'Add');
  const handles = [
    { type: 'target', position: Position.Left,  id: `${id}-a`,      label: 'A',      style: { top: '30%' } },
    { type: 'target', position: Position.Left,  id: `${id}-b`,      label: 'B',      style: { top: '70%' } },
    { type: 'source', position: Position.Right, id: `${id}-output`, label: 'Result' },
  ];
  return (
    <BaseNode id={id} title={NODE_LABELS.MATH} info={NODE_INFO.MATH} handles={handles}>
      <div className="vs-field">
        <label className="vs-label">Operation</label>
        <select className="vs-select" value={operation} onChange={e => setOperation(e.target.value)}>
          <option value="Add">Add  (A + B)</option>
          <option value="Subtract">Subtract  (A − B)</option>
          <option value="Multiply">Multiply  (A × B)</option>
          <option value="Divide">Divide  (A ÷ B)</option>
          <option value="Modulo">Modulo  (A % B)</option>
        </select>
      </div>
    </BaseNode>
  );
};

/* ── 4. API Request ── */
export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/v1');
  const [method, setMethod] = useState(data?.method || 'GET');
  const handles = [
    { type: 'target', position: Position.Left,  id: `${id}-trigger`, label: 'Trigger' },
    { type: 'target', position: Position.Left,  id: `${id}-body`,    label: 'Body',    style: { top: '70%' } },
    { type: 'source', position: Position.Right, id: `${id}-data`,    label: 'Response' },
  ];
  return (
    <BaseNode id={id} title={NODE_LABELS.API} info={NODE_INFO.API} handles={handles}>
      <div className="vs-field" style={{ flexDirection: 'row', gap: '8px', alignItems: 'flex-end' }}>
        <div style={{ flex: '0 0 72px' }}>
          <label className="vs-label">Method</label>
          <select className="vs-select" value={method} onChange={e => setMethod(e.target.value)}>
            <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option><option>PATCH</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label className="vs-label">URL</label>
          <input className="vs-input" type="text" value={url} onChange={e => setUrl(e.target.value)} />
        </div>
      </div>
    </BaseNode>
  );
};

/* ── 5. Database ── */
export const DatabaseNode = ({ id, data }) => {
  const [collection, setCollection] = useState(data?.collection || 'users');
  const [operation, setOperation] = useState(data?.operation || 'find');
  const handles = [
    { type: 'target', position: Position.Left,  id: `${id}-query`,   label: 'Query' },
    { type: 'source', position: Position.Right, id: `${id}-results`, label: 'Results' },
  ];
  return (
    <BaseNode id={id} title={NODE_LABELS.DATABASE} info={NODE_INFO.DATABASE} handles={handles}>
      <div className="vs-field">
        <label className="vs-label">Collection</label>
        <input className="vs-input" type="text" value={collection} onChange={e => setCollection(e.target.value)} />
      </div>
      <div className="vs-field">
        <label className="vs-label">Operation</label>
        <select className="vs-select" value={operation} onChange={e => setOperation(e.target.value)}>
          <option value="find">find</option>
          <option value="findOne">findOne</option>
          <option value="insertOne">insertOne</option>
          <option value="updateOne">updateOne</option>
          <option value="deleteOne">deleteOne</option>
          <option value="aggregate">aggregate</option>
        </select>
      </div>
    </BaseNode>
  );
};
