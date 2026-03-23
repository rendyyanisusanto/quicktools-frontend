/**
 * Utility functions for frontend WhatsApp parsing and validation.
 */

/**
 * Normalizes an Indonesian or international phone number
 * to a clean WhatsApp-ready format (e.g. 62812...)
 * 
 * Rules:
 * - Remove all non-digit characters except leading `+`
 * - Replace `08...` with `628...` (Indonesian default)
 * - Replace `+62` with `62`
 * - Returns the cleaned string or empty string if totally invalid
 */
export function normalizePhoneNumber(phone) {
  if (!phone) return '';
  
  // Clean all spacing, dashes, parentheses
  let cleaned = phone.toString().replace(/[\s\-\(\)]/g, '');
  
  // If user entered +62..., just slice off the +
  if (cleaned.startsWith('+62')) {
    cleaned = cleaned.substring(1);
  } else if (cleaned.startsWith('08')) {
    // If user entered local indonesian 08... replace with 628...
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('+')) {
    // Catch other country codes
    cleaned = cleaned.substring(1);
  }
  
  // Strip any remaining alpha chars
  cleaned = cleaned.replace(/\D/g, '');
  
  return cleaned;
}

/**
 * Validates if the phone number seems reasonably formatted for WhatsApp
 */
export function validatePhoneNumber(phone) {
  const norm = normalizePhoneNumber(phone);
  // A valid WhatsApp number generally has at least 8 digits and max 15 digits
  return norm.length >= 8 && norm.length <= 15;
}

/**
 * Generates the full `wa.me/` hyperlink.
 */
export function generateWhatsAppLink(phone, message = '') {
  const norm = normalizePhoneNumber(phone);
  if (!norm) return '';

  let baseUrl = `https://wa.me/${norm}`;
  
  if (message && message.trim().length > 0) {
    const encodedMsg = encodeURIComponent(message.trim());
    baseUrl += `?text=${encodedMsg}`;
  }
  
  return baseUrl;
}

/**
 * Formats multi-line text cleanly (no extra logic needed beyond standard JS `.trim()` 
 * but exposed here for architecture consistency)
 */
export function formatWhatsAppMessage(message) {
  if (!message) return '';
  return message.trim();
}
