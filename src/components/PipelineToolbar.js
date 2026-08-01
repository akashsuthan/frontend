import { useState, useEffect } from "react";
import { DraggableNode } from "./DraggableNode";
import { SubmitButton } from "./SubmitButton";
import { Sun, Moon } from "lucide-react";
import { NODE_TYPES, NODE_LABELS } from "../config";

export const PipelineToolbar = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className="toolbar" style={{ justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="toolbar-logo">
          <img
            src="/vs-logo.svg"
            alt="VectorShift Logo"
            style={{ width: 32, height: 32, borderRadius: 8 }}
          />
          <span className="toolbar-logo-text">VectorShift</span>
        </div>
        <div className="toolbar-nodes">
          <DraggableNode type={NODE_TYPES.INPUT} label={NODE_LABELS.INPUT} />
          <DraggableNode type={NODE_TYPES.LLM} label={NODE_LABELS.LLM} />
          <DraggableNode type={NODE_TYPES.TEXT} label={NODE_LABELS.TEXT} />
          <DraggableNode type={NODE_TYPES.OUTPUT} label={NODE_LABELS.OUTPUT} />
          <DraggableNode
            type={NODE_TYPES.TRANSFORM}
            label={NODE_LABELS.TRANSFORM}
          />

          <DraggableNode type={NODE_TYPES.API} label={NODE_LABELS.API} />
          <DraggableNode
            type={NODE_TYPES.DATABASE}
            label={NODE_LABELS.DATABASE}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          paddingRight: "8px",
        }}
      >
        <button
          onClick={toggleTheme}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-hi)",
            cursor: "pointer",
            display: "flex",
            padding: "6px",
          }}
          title="Toggle Theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <SubmitButton />
      </div>
    </div>
  );
};
