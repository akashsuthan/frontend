import { useState, useEffect, useRef } from "react";
import { Position, useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "./BaseNode";
import { useStore } from "../../store";
import { NODE_LABELS, NODE_INFO } from "../../config";

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  const handleTextChange = (e) => setCurrText(e.target.value);
  const handleBlur = () => {
    if (data?.text !== currText) updateNodeField(id, "text", currText);
  };

  useEffect(() => {
    if (data?.text !== undefined && data.text !== currText)
      setCurrText(data.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.text]);

  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    let match;
    const found = new Set();
    while ((match = regex.exec(currText)) !== null) found.add(match[1]);
    setVariables(Array.from(found));

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      const newWidth = Math.max(230, Math.min(420, currText.length * 7.5 + 60));
      textareaRef.current.closest(".vs-node").style.minWidth = `${newWidth}px`;
      updateNodeInternals(id);
    }
  }, [currText, id, updateNodeInternals]);

  const varHandles = variables.map((variable, index) => {
    const topPct =
      variables.length === 1 ? 50 : 20 + (60 / (variables.length - 1)) * index;
    return {
      type: "target",
      position: Position.Left,
      id: `${id}-${variable}`,
      label: variable,
      style: { top: `${topPct}%` },
    };
  });

  const handles = [
    ...varHandles,
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
      label: "Output",
    },
  ];

  return (
    <BaseNode
      id={id}
      title={NODE_LABELS.TEXT}
      info={NODE_INFO.TEXT}
      handles={handles}
    >
      <div className="vs-field">
        <label className="vs-label">template</label>
        <textarea
          ref={textareaRef}
          className="vs-textarea nodrag"
          value={currText}
          onChange={handleTextChange}
          onBlur={handleBlur}
          onKeyDown={(e)=>e.stopPropagation()}
          rows={2}
          placeholder="Type text or use {{variable}} syntax…"
        />
      </div>
      {variables.length > 0 && (
        <div className="vs-field">
          <label className="vs-label">Variables detected</label>
          <div className="vs-vars-row">
            {variables.map((v) => (
              <span key={v} className="vs-var-chip">
                {v}
              </span>
            ))}
          </div>
        </div>
      )}
    </BaseNode>
  );
};
