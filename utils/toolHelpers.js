/**
 * toolHelpers.js — Utility functions for working with tools data.
 *
 * Import these helpers wherever you need to query or filter tools.
 */
import { TOOLS, CATEGORIES } from '~/data/tools.js';

/**
 * Returns all popular tools.
 * @returns {Array}
 */
export function getPopularTools() {
  return TOOLS.filter((tool) => tool.isPopular);
}

/**
 * Returns tools grouped by category.
 * Each entry is { category: CategoryMeta, tools: Tool[] }
 * @returns {Array}
 */
export function getToolsByCategory() {
  return Object.values(CATEGORIES).map((category) => ({
    category,
    tools: TOOLS.filter((tool) => tool.category === category.key),
  }));
}

/**
 * Searches tools by query string (matches title or description).
 * Case-insensitive.
 * @param {string} query
 * @returns {Array}
 */
export function searchTools(query) {
  if (!query || !query.trim()) return TOOLS;
  const lower = query.toLowerCase();
  return TOOLS.filter(
    (tool) =>
      tool.title.toLowerCase().includes(lower) ||
      tool.description.toLowerCase().includes(lower)
  );
}

/**
 * Returns grouped tools filtered by a search query.
 * Empty categories are excluded from the result.
 * @param {string} query
 * @returns {Array}
 */
export function getFilteredToolsByCategory(query) {
  const filtered = searchTools(query);
  return Object.values(CATEGORIES)
    .map((category) => ({
      category,
      tools: filtered.filter((tool) => tool.category === category.key),
    }))
    .filter((group) => group.tools.length > 0);
}
