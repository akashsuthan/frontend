# VectorShift Pipeline Builder

This project is a visual drag-and-drop pipeline builder built with React and `reactflow`. It allows users to construct Directed Acyclic Graphs (DAGs) representing complex workflows.

## Features Added

*   **Dynamic Node Architecture:** 7 distinct node types (Input, LLM, Output, Text, Transform, API Request, Database) powered by a single scalable `BaseNode` component.
*   **Centralized Configuration:** Node labels, types, and tooltips are managed centrally in `src/config.js` for maintainability.
*   **Sleek UI/UX:** 
    *   Professional, modern design using custom CSS variables (no Tailwind necessary!).
    *   Light & Dark mode themes.
    *   `lucide-react` icons for a clean, cohesive look.
    *   Custom CSS hover tooltips built directly into the node headers to provide usage instructions.
    *   Toast notification system for user feedback.
*   **DAG Validation:** Pipeline submission is gated by backend validation to ensure the graph forms a valid Directed Acyclic Graph (DAG) using the `/pipelines/parse` endpoint. The submit button remains disabled until a successful validation response is received.

## Project Structure

*   `src/components/nodes/`: Contains the specific node definitions (e.g., `inputNode.js`, `llmNode.js`, etc.) and the `BaseNode.js` wrapper.
*   `src/components/`: Contains the `PipelineUI`, `PipelineToolbar`, `SubmitButton`, and `DraggableNode` components.
*   `src/services/api.js`: Centralized fetch logic using dynamic endpoints.
*   `src/store.js`: Global state management powered by `zustand`.
*   `src/styles/index.css`: All application styles and theme variables.
*   `src/config.js`: Central configuration for constants (Types, Labels, Info text).

## Getting Started

1.  Create a `.env` file based on `.env.example` in the `frontend` directory.
2.  Run `npm install` to install dependencies.
3.  Run `npm start` to start the frontend application on `http://localhost:3000`.
4.  Ensure the FastAPI backend is running simultaneously to handle parsing requests.
