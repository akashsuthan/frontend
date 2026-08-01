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
  FILTER: 'filter',
  MATH: 'math',
  API: 'api',
  DATABASE: 'database',
};

export const NODE_LABELS = {
  INPUT: 'Input',
  LLM: 'LLM',
  OUTPUT: 'Output',
  TEXT: 'Text',
  TRANSFORM: 'Transform',
  FILTER: 'Filter',
  MATH: 'Math',
  API: 'API Request',
  DATABASE: 'Database',
};

