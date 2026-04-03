/**
 * tools.js — Single source of truth for all QuickTools data.
 *
 * Each tool has:
 *  - slug: URL segment (matches file-based route)
 *  - title: Human-readable tool name
 *  - description: Short description shown on cards
 *  - category: Category slug (must match a key in CATEGORIES)
 *  - path: Full page route
 *  - isPopular: Whether to show in Popular Tools section
 */

/** Category metadata — single source of truth */
export const CATEGORIES = {
  pdf: {
    key: 'pdf',
    label: 'PDF Tools',
    description: 'Merge, split, compress, and convert PDF files with ease.',
    icon: '📄',
  },
  image: {
    key: 'image',
    label: 'Image Tools',
    description: 'Compress, resize, crop, and convert images online for free.',
    icon: '🖼️',
  },
  wa: {
    key: 'wa',
    label: 'WhatsApp Tools',
    description: 'Generate WA links, messages, and QR codes in seconds.',
    icon: '💬',
  },
  text: {
    key: 'text',
    label: 'Text Tools',
    description: 'Count words, convert case, and clean up text instantly.',
    icon: '✏️',
  },
  developer: {
    key: 'developer',
    label: 'Developer Tools',
    description: 'Format JSON, encode Base64, and generate UUIDs quickly.',
    icon: '💻',
  },
  edu: {
    key: 'edu',
    label: 'Education Tools',
    description: 'Calculate grades, rankings, and generate permission letters.',
    icon: '🎓',
  },
  calculator: {
    key: 'calculator',
    label: 'Calculator Tools',
    description: 'Quickly calculate discounts, percentages, and ages.',
    icon: '🧮',
  },
};

/** All tools in a flat array */
export const TOOLS = [
  // PDF Tools
  {
    slug: 'merge-pdf',
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one document quickly and for free.',
    category: 'pdf',
    path: '/tools/pdf/merge-pdf',
    isPopular: true,
  },
  {
    slug: 'split-pdf',
    title: 'Split PDF',
    description: 'Split a PDF into separate pages or custom page ranges.',
    category: 'pdf',
    path: '/tools/pdf/split-pdf',
    isPopular: false,
  },
  {
    slug: 'pdf-to-word',
    title: 'PDF ke Word',
    description: 'Ubah file PDF menjadi dokumen Word (DOCX) yang bisa diedit langsung.',
    category: 'pdf',
    path: '/tools/pdf/pdf-to-word',
    isPopular: true,
  },
  {
    slug: 'word-to-pdf',
    title: 'Word ke PDF',
    description: 'Ubah file Word (DOCX/DOC) menjadi PDF yang rapi dan siap dibagikan.',
    category: 'pdf',
    path: '/tools/pdf/word-to-pdf',
    isPopular: true,
  },
  {
    slug: 'compress-pdf',
    title: 'Compress PDF',
    description: 'Reduce PDF file size without losing quality.',
    category: 'pdf',
    path: '/tools/pdf/compress-pdf',
    isPopular: false,
  },
  {
    slug: 'jpg-to-pdf',
    title: 'JPG to PDF',
    description: 'Convert JPG images to PDF format instantly.',
    category: 'pdf',
    path: '/tools/pdf/jpg-to-pdf',
    isPopular: false,
  },
  {
    slug: 'pdf-to-jpg',
    title: 'PDF to JPG',
    description: 'Convert PDF pages to JPG image files easily.',
    category: 'pdf',
    path: '/tools/pdf/pdf-to-jpg',
    isPopular: false,
  },
  {
    slug: 'add-pdf-watermark',
    title: 'Add PDF Watermark',
    description: 'Tambahkan watermark teks ke halaman PDF secara mudah dan cepat.',
    category: 'pdf',
    path: '/tools/pdf/add-pdf-watermark',
    isPopular: true,
  },

  // Image Tools
/*
  {
    slug: 'remove-background',
    title: 'Remove Background',
    description: 'Hapus background foto secara otomatis and unduh hasilnya dalam format PNG transparan.',
    category: 'image',
    path: '/tools/image/remove-background',
    isPopular: true,
  },
*/
  {
    slug: 'pas-foto-generator',
    title: 'Pas Foto Generator',
    description: 'Buat pas foto ukuran 2x3, 3x4, 4x6 dengan background merah atau biru. Siap cetak!',
    category: 'image',
    path: '/tools/image/pas-foto-generator',
    isPopular: true,
  },
  {
    slug: 'compress-image',
    title: 'Compress Image',
    description: 'Reduce image file size while keeping it visually sharp.',
    category: 'image',
    path: '/tools/image/compress-image',
    isPopular: true,
  },
  {
    slug: 'resize-image',
    title: 'Resize Image',
    description: 'Resize images to any width and height you need.',
    category: 'image',
    path: '/tools/image/resize-image',
    isPopular: false,
  },
  {
    slug: 'crop-image',
    title: 'Crop Image',
    description: 'Crop images to a specific area or aspect ratio.',
    category: 'image',
    path: '/tools/image/crop-image',
    isPopular: false,
  },
  {
    slug: 'jpg-to-png',
    title: 'JPG to PNG',
    description: 'Convert JPG images to PNG format with transparency support.',
    category: 'image',
    path: '/tools/image/jpg-to-png',
    isPopular: false,
  },
  {
    slug: 'png-to-jpg',
    title: 'PNG to JPG',
    description: 'Convert PNG images to JPG for smaller file sizes.',
    category: 'image',
    path: '/tools/image/png-to-jpg',
    isPopular: false,
  },
  {
    slug: 'image-to-icon',
    title: 'Image to Icon',
    description: 'Convert images into multi-sized icons and favicons instantly.',
    category: 'image',
    path: '/tools/image/image-to-icon',
    isPopular: false,
  },

  // WhatsApp Tools
  {
    slug: 'wa-link-generator',
    title: 'WA Link Generator',
    description: 'Generate a WhatsApp chat link with a custom phone number.',
    category: 'wa',
    path: '/tools/wa/wa-link-generator',
    isPopular: true,
  },
  {
    slug: 'wa-without-save-number',
    title: 'WA Without Save Number',
    description: 'Open a WhatsApp chat without saving the number to contacts.',
    category: 'wa',
    path: '/tools/wa/wa-without-save-number',
    isPopular: false,
  },
  {
    slug: 'wa-message-generator',
    title: 'WA Message Generator',
    description: 'Generate pre-filled WhatsApp messages for quick sending.',
    category: 'wa',
    path: '/tools/wa/wa-message-generator',
    isPopular: false,
  },
  {
    slug: 'wa-qr-code',
    title: 'WA QR Code',
    description: 'Create a WhatsApp QR code for your phone number.',
    category: 'wa',
    path: '/tools/wa/wa-qr-code',
    isPopular: false,
  },

  // Text Tools
  {
    slug: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, and sentences in any text.',
    category: 'text',
    path: '/tools/text/word-counter',
    isPopular: true,
  },
  {
    slug: 'case-converter',
    title: 'Case Converter',
    description: 'Convert text to uppercase, lowercase, title case, and more.',
    category: 'text',
    path: '/tools/text/case-converter',
    isPopular: false,
  },
  {
    slug: 'remove-duplicate-text',
    title: 'Remove Duplicate Text',
    description: 'Remove duplicate lines or words from any text block.',
    category: 'text',
    path: '/tools/text/remove-duplicate-text',
    isPopular: false,
  },

  // Developer Tools
  {
    slug: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data instantly.',
    category: 'developer',
    path: '/tools/developer/json-formatter',
    isPopular: true,
  },
  {
    slug: 'base64-encoder',
    title: 'Base64 Encoder / Decoder',
    description: 'Encode or decode Base64 strings online for free.',
    category: 'developer',
    path: '/tools/developer/base64-encoder',
    isPopular: false,
  },
  {
    slug: 'uuid-generator',
    title: 'UUID Generator',
    description: 'Generate random UUIDs (v4) instantly for your projects.',
    category: 'developer',
    path: '/tools/developer/uuid-generator',
    isPopular: false,
  },

  // Education Tools
  {
    slug: 'average-score-calculator',
    title: 'Average Score Calculator',
    description: 'Calculate the average score for student grades quickly.',
    category: 'edu',
    path: '/tools/edu/average-score-calculator',
    isPopular: false,
  },
  {
    slug: 'ranking-calculator',
    title: 'Ranking Calculator',
    description: 'Rank students by their scores automatically.',
    category: 'edu',
    path: '/tools/edu/ranking-calculator',
    isPopular: false,
  },
  {
    slug: 'permission-letter-generator',
    title: 'Permission Letter Generator',
    description: 'Quickly generate student permission letters for school.',
    category: 'edu',
    path: '/tools/edu/permission-letter-generator',
    isPopular: false,
  },

  // Calculator Tools
  {
    slug: 'discount-calculator',
    title: 'Discount Calculator',
    description: 'Calculate the final price after a discount percentage.',
    category: 'calculator',
    path: '/tools/calculator/discount-calculator',
    isPopular: true,
  },
  {
    slug: 'percentage-calculator',
    title: 'Percentage Calculator',
    description: 'Calculate percentages for any value instantly.',
    category: 'calculator',
    path: '/tools/calculator/percentage-calculator',
    isPopular: false,
  },
  {
    slug: 'age-calculator',
    title: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days.',
    category: 'calculator',
    path: '/tools/calculator/age-calculator',
    isPopular: false,
  },
];
