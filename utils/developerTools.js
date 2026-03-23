/**
 * Utility functions for pure developer manipulation in the browser.
 */

// JSON FORMATTER HELPERS
export function formatJson(jsonString, indent = 2) {
  if (!jsonString || String(jsonString).trim() === '') {
     return { success: false, error: 'Input JSON kosong.', result: '' };
  }
  
  try {
     const parsed = JSON.parse(jsonString);
     return {
        success: true,
        result: JSON.stringify(parsed, null, indent),
        error: null
     };
  } catch (err) {
     return {
        success: false,
        result: '',
        error: `Error Syntax: ${err.message}`
     };
  }
}

export function minifyJson(jsonString) {
  return formatJson(jsonString, 0); // Indent 0 means inline/minified stringify
}


// BASE64 ENCODER HELPERS
export function encodeBase64(text) {
   if (!text) return { success: true, result: '' };
   try {
      // Handle unicode utf-8 encoding safely instead of throwing DOMException 
      const utf8Encoded = encodeURIComponent(text).replace(/%([0-9A-F]{2})/g,
         function toSolidBytes(match, p1) {
             return String.fromCharCode('0x' + p1);
     });
      return { success: true, result: btoa(utf8Encoded) };
   } catch(e) {
      return { success: false, result: '', error: 'Gagal melakukan Encodng data kompleks tersebut.' };
   }
}

export function decodeBase64(encodedString) {
   if (!encodedString || encodedString.trim() === '') return { success: true, result: '' };
   try {
      const decodedData = atob(encodedString);
      // Try resolving UTF-8 bytes to actual strings securely
      const utf8Decoded = decodeURIComponent(decodedData.split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return { success: true, result: utf8Decoded };
   } catch (err) {
      return { success: false, result: '', error: 'String ini sepertinya bukan format Base64 yang valid.' };
   }
}


// UUID GENERATOR HELPERS
export function generateUuidV4() {
   // Use the most modern API, fallback occasionally
   if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
       return window.crypto.randomUUID();
   }
   
   // Fallback v4 math approach for older browsers (unlikely but safe)
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
   });
}

export function generateMultipleUuids(count = 1) {
   const output = [];
   for (let i = 0; i < count; i++) {
       output.push(generateUuidV4());
   }
   return output;
}
