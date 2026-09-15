/**
 * Utility functions for handling prompts and variables
 */

// Regex to match {{variable_name}}
const VARIABLE_REGEX = /\{\{([^}]+)\}\}/g;

/**
 * Extracts unique variable names from a prompt template string
 * @param {string} template - The prompt template text
 * @returns {string[]} Array of unique variable names
 */
export const extractVariables = (template) => {
  if (!template) return [];
  const matches = [...template.matchAll(VARIABLE_REGEX)];
  // Use a Set to ensure uniqueness
  const uniqueVars = new Set(matches.map(match => match[1].trim()));
  return Array.from(uniqueVars);
};

/**
 * Compiles a prompt template with the provided variable values
 * @param {string} template - The prompt template text
 * @param {Object} values - Key-value pairs for variables
 * @returns {string} The compiled prompt text
 */
export const compilePrompt = (template, values = {}) => {
  if (!template) return '';
  return template.replace(VARIABLE_REGEX, (match, varName) => {
    const key = varName.trim();
    return values[key] !== undefined && values[key] !== '' ? values[key] : match;
  });
};
