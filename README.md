# VectorShift Pipeline Builder

This project is a visual drag-and-drop pipeline builder built with React and `reactflow`. It allows users to construct Directed Acyclic Graphs (DAGs) representing complex workflows.

## Features Added

*   **Dynamic Node Architecture:** 9 distinct, highly functional node types (Input, LLM, Output, Text, Transform, API Request, Database, Condition, Code) powered by a single scalable `BaseNode` component.
*   **Centralized Configuration:** Node labels, types, and tooltips are managed centrally in `src/config.js` for maintainability.
*   **Sleek UI/UX:** 
    *   Professional, modern design using custom CSS modules (no Tailwind necessary!).
    *   Fully functional Dark Mode / Light Mode toggle.
    *   `lucide-react` enterprise SVG icons for a crisp, cohesive look.
    *   Custom CSS hover tooltips built directly into the node headers to provide usage instructions.
    *   Toast notification system for user feedback.
*   **VS Code Engine Integration:** The `Code` node integrates the `@monaco-editor/react` package, providing a full in-browser VS Code experience complete with JavaScript syntax checking (red error squiggles), auto-indentation, bracket matching, and a beautiful dark theme.
*   **Quality of Life:**
    *   **Double-Click to Rename:** Double click any node's title to type a custom name, instantly saved to the node's internal state.
    *   **Dynamic Resizing:** The Text node automatically expands its width/height as you type.
    *   **Variable Spawning:** Typing `{{ variable }}` in the Text node instantly spawns a matching connection handle.
*   **Advanced DAG Validation & Cycle Detection:** Pipeline submission is gated by backend validation to ensure the graph forms a valid Directed Acyclic Graph (DAG) using the `/pipelines/parse` endpoint. If an infinite loop (cycle) is detected, the backend traces the exact path and the frontend displays the precise node loop in red text within the error toast!

## Project Structure

*   `src/components/nodes/`: Contains the specific node definitions (e.g., `inputNode.js`, `llmNode.js`, `apiNode.js`, etc.) and the `BaseNode.js` wrapper.
*   `src/components/`: Contains the `PipelineUI`, `PipelineToolbar`, `SubmitButton`, and `DraggableNode` components.
*   `src/services/api.js`: Centralized fetch logic using dynamic endpoints.
*   `src/store/index.js`: Global state management powered by `zustand`.
*   `src/styles/`: Modularized CSS architecture (`variables.css`, `canvas.css`, `nodes.css`, `toolbar.css`, `toast.css`) imported via `index.css`.
*   `src/config.js`: Central configuration for constants (Types, Labels, Info text).

## Getting Started

1.  Create a `.env` file based on `.env.example` in the `frontend` directory.
2.  Run `npm install` to install dependencies.
3.  Run `npm start` to start the frontend application on `http://localhost:3000`.
4.  Ensure the FastAPI backend is running simultaneously (via `uvicorn main:app --reload`) to handle parsing requests.
