/**
 * Utility functions for pure text manipulation in the browser.
 */

// WORD COUNTER HELPERS
export function countWords(text) {
  if (!text || text.trim() === '') return 0;
  // Match any continuous non-whitespace characters
  const words = text.trim().match(/\S+/g);
  return words ? words.length : 0;
}

export function countCharacters(text, excludeSpaces = false) {
  if (!text) return 0;
  if (excludeSpaces) {
    return text.replace(/\s/g, '').length;
  }
  return text.length;
}

export function countSentences(text) {
  if (!text || text.trim() === '') return 0;
  // A sentence usually ends with . ? or ! followed by space or end of string
  const sentences = text.split(/[.?!]+[\s$]/).filter(s => s.trim().length > 0);
  return sentences.length;
}

export function countParagraphs(text) {
  if (!text || text.trim() === '') return 0;
  // Paragraphs are separated by one or more newlines
  const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
  return paragraphs.length;
}

// CASE CONVERSION HELPERS
export function convertToUpperCase(text) {
  if (!text) return '';
  return text.toUpperCase();
}

export function convertToLowerCase(text) {
  if (!text) return '';
  return text.toLowerCase();
}

export function convertToTitleCase(text) {
  if (!text) return '';
  return text.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export function convertToSentenceCase(text) {
  if (!text) return '';
  // Force everything to lowercase first
  const lower = text.toLowerCase();
  
  // Replace the first character of each sentence
  return lower.replace(/(^\s*\w|[.?!]\s*\w)/g, function(c) {
    return c.toUpperCase();
  });
}

// DUPLICATE TEXT HELPERS
export function removeDuplicateLines(text) {
  if (!text) return { result: '', originalLines: 0, finalLines: 0 };
  
  const lines = text.split('\n');
  const originalCount = lines.length;
  
  // Use Set to automatically remove identical strings
  const uniqueLines = [...new Set(lines)];
  const finalCount = uniqueLines.length;
  
  return {
    result: uniqueLines.join('\n'),
    originalLines: originalCount,
    finalLines: finalCount,
    removedLines: originalCount - finalCount
  };
}
