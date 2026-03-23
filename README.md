# QuickTools Frontend

Built with **Nuxt 3** and **Tailwind CSS**. Designed to be highly modular, SEO-friendly, and blazing fast.

## Setup

```bash
# install dependencies
npm install

# start dev server
npm run dev
```

## Image Tools Module Overview

The Image Tools module (`/pages/tools/image`) provides free online utilities for image manipulation. Uniquely, **this entire module runs strictly in the browser**.

### Implementation Strategy
We avoid sending large user files to the backend. Instead, we use HTML5 Canvas APIs within Vue components:
1. **Compress Image**: Reads `image/jpeg` or `image/webp` into a Canvas and exports a compressed Blob using native `.toBlob('image/jpeg', quality)` methods.
2. **Resize Image**: Calculates precise Aspect Ratios and redraws the image onto an accurately sized Canvas before exporting.
3. **Crop Image**: Utilizes the excellent, lightweight `cropper.js` library to provide a premium interactive UI, finally extracting the cropped Canvas.
4. **Format Converters**: `JPG to PNG` and `PNG to JPG` instantly redraw and export differing MIME types. Transparent PNGs are correctly flattened onto a white `#FFFFFF` background to prevent black artifacts when saving to JPEG.

### Shared Assets
- `ImageUploadZone.vue`: Specialized drag-and-drop component specifically for images.
- `/data/imageTools.js`: Centralized source of truth for SEO titles, descriptions, How-to steps, and FAQ schemas to prevent hardcoded repetition.

*Note: No Python is used anywhere in this module.*

## WhatsApp Tools Module Overview

The WhatsApp Tools module (`/pages/tools/wa`) provides critical communication utilities mostly acting as intelligent shortcuts to `wa.me/` protocol.

### Implementation Strategy
This module is strictly frontend-first.
1. **Phone Normalization Helpers**: Centralized inside `/utils/waTools.js`, the `normalizePhoneNumber` function cleans inputs globally—converting local `08` indonesian codes into international `628` without needing backend middleware.
2. **Link Generaton**: Uses `generateWhatsAppLink` to format multi-line payloads into RFC-compliant deep links.
3. **WA Result Panel Component**: A reusable component (`WhatsAppResultPanel.vue`) is used across the WA Link, Message, and QR generator to surface copy buttons and direct launch links safely without repeating tailwind code.
4. **Offline QR Generate**: `qrious.js` imported securely via CDN allows users to generate WhatsApp barcodes fully locally preventing privacy-logging typically found on general-purpose QR maker websites.
