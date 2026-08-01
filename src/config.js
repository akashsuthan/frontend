// Global Configuration Constants

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  PARSE_PIPELINE: `${API_BASE_URL}/pipelines/parse`,
};

export const NODE_TYPES = {
  INPUT: 'customInput',
  LLM: 'llm',
  OUTPUT: 'customOutput',
  TEXT: 'text',
  TRANSFORM: 'transform',
  API: 'api',
  DATABASE: 'database',
};

export const NODE_LABELS = {
  INPUT: 'Input',
  LLM: 'LLM',
  OUTPUT: 'Output',
  TEXT: 'Text',
  TRANSFORM: 'Transform',
  API: 'API Request',
  DATABASE: 'Database',
};

export const NODE_INFO = {
  INPUT: 'Defines an input variable for your pipeline. Use this to pass data into the graph at runtime.',
  LLM: 'Calls an LLM. Contains 2 inputs: System (for defining the AI persona/rules) and Prompt (for the actual user query).',
  OUTPUT: 'Defines a final output of your pipeline. The result of the connected node will be returned.',
  TEXT: 'A text template that can embed variables using {{variableName}} syntax.',
  TRANSFORM: 'Applies a string manipulation function (like Uppercase or Slugify) to the input data.',
  API: 'Makes an HTTP request to an external API endpoint.',
  DATABASE: 'Executes a query against a connected database collection.',
};
