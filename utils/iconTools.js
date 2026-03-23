/**
 * iconTools.js — Utility helpers for resizing images and generating JSZip archives.
 */
import JSZip from 'jszip';

/**
 * Reads a File into an HTMLImageElement
 * @param {File} file 
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image.'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Resizes an Image to a specific square dimension and returns a Blob
 * @param {HTMLImageElement} img 
 * @param {number} size 
 * @returns {Promise<Blob>}
 */
export function resizeToBlob(img, size) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // We want to fit and center the image if it's not square
    // But typically for icons, we center crop or stretch. 
    // Let's do a center crop to guarantee it fills the square.
    const aspectRatio = img.width / img.height;
    let sWidth = img.width;
    let sHeight = img.height;
    let sx = 0;
    let sy = 0;

    if (aspectRatio > 1) { // Landscape
      sWidth = img.height; // limit width to height
      sx = (img.width - img.height) / 2;
    } else if (aspectRatio < 1) { // Portrait
      sHeight = img.width; // limit height to width
      sy = (img.height - img.width) / 2;
    }

    // Draw the cropped image to fit the square canvas exactly
    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, size, size);

    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Canvas export failed'));
      }
    }, 'image/png');
  });
}

/**
 * Generates an array of generated icons given the requested sizes
 * @param {File} file
 * @param {Array<number>} sizes (e.g. [16, 32, 64])
 * @returns {Promise<Array<{size: number, blob: Blob, url: string, filename: string}>>}
 */
export async function generateIconSizes(file, sizes) {
  const img = await loadImage(file);
  const results = [];

  for (const size of sizes) {
    const blob = await resizeToBlob(img, size);
    results.push({
      size,
      blob,
      url: URL.createObjectURL(blob),
      filename: `icon-${size}x${size}.png`
    });
  }

  return results;
}

/**
 * Bundles the generated blobs into a single ZIP file
 * @param {Array<{size: number, blob: Blob, filename: string}>} filesData 
 * @returns {Promise<Blob>}
 */
export async function createZipArchive(filesData) {
  const zip = new JSZip();
  const folder = zip.folder('generated-icons');

  filesData.forEach((item) => {
    folder.file(item.filename, item.blob);
  });

  return await zip.generateAsync({ type: 'blob' });
}
