<template>
  <ToolPageLayout
    title="Crop Image Online Gratis"
    description="Potong gambar Anda secara presisi untuk menghilangkan area pinggir yang tidak diinginkan, langsung di browser tanpa upload data."
    category-path="/tools/image"
    category-label="Image Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <!-- Upload Zone -->
      <ImageUploadZone
        v-if="state === 'idle'"
        hint="Pilih 1 file gambar maksimal 20MB"
        accept="image/jpeg, image/png, image/webp"
        :multiple="false"
        @files-selected="onFileSelected"
      />

      <!-- Image Editor & Results -->
      <div v-if="state !== 'idle'" class="mt-5">
        
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-semibold text-gray-700">
            {{ state === 'loaded' ? 'Mode Potong (Crop Area)' : 'Hasil Pemotongan' }}
          </h2>
          <button
            class="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
            @click="reset"
          >
            Ganti Gambar
          </button>
        </div>

        <div class="bg-gray-50 border border-gray-100 rounded-lg p-5">
          
          <!-- Cropper Workspace (Visible when loaded) -->
          <div v-show="state === 'loaded'">
             <div class="w-full bg-black/5 rounded overflow-hidden flex items-center justify-center min-h-[300px] max-h-[500px]">
                <img ref="imageElement" :src="previewSrc" class="max-w-full max-h-full" />
             </div>
             
             <!-- Cropper Controls -->
             <div class="flex flex-wrap gap-2 mt-4 justify-center">
                <button type="button" @click="setAspectRatio(1)" class="px-3 py-1.5 bg-white border border-gray-200 text-xs rounded hover:bg-gray-100 font-medium">1:1 (Square)</button>
                <button type="button" @click="setAspectRatio(4/3)" class="px-3 py-1.5 bg-white border border-gray-200 text-xs rounded hover:bg-gray-100 font-medium">4:3</button>
                <button type="button" @click="setAspectRatio(16/9)" class="px-3 py-1.5 bg-white border border-gray-200 text-xs rounded hover:bg-gray-100 font-medium">16:9</button>
                <button type="button" @click="setAspectRatio(NaN)" class="px-3 py-1.5 bg-white border border-gray-200 text-xs rounded hover:bg-gray-100 font-medium tracking-wide">BEBAS</button>
             </div>
          </div>

          <!-- Result Preview (Visible when success) -->
          <div v-if="state === 'success'" class="flex flex-col items-center justify-center">
             <div class="w-full max-w-sm bg-gray-200 border border-gray-300 rounded flex items-center justify-center overflow-hidden shadow-sm relative mb-4 bg-checkbox-pattern">
                <img :src="croppedPreviewSrc" class="max-w-full max-h-full object-contain drop-shadow-md" />
             </div>
             <p class="text-xs text-gray-500 text-center font-medium">Tampilan hasil potong (cropped)</p>
             <p v-if="croppedBlob" class="text-[10px] text-gray-400 mt-1">Ukuran: {{ formatSize(croppedBlob.size) }}</p>
          </div>

        </div>

        <!-- Action button -->
        <div class="mt-6 flex justify-end gap-3">
          <!-- Try Again Button (if success) -->
          <button
            v-if="state === 'success'"
            class="px-6 py-3 w-full sm:w-auto justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
            @click="backToEdit"
          >
            Edit Kembali
          </button>

          <!-- Primary Actions -->
          <button
            v-if="state === 'loaded'"
            class="btn-primary flex items-center gap-2 px-8 py-3 w-full sm:w-auto justify-center"
            @click="cropImage"
          >
            <span>✂️ Potong Sekarang</span>
          </button>

          <button
            v-if="state === 'success'"
            class="btn-primary flex items-center gap-2 px-8 py-3 w-full sm:w-auto justify-center bg-green-600 hover:bg-green-700"
            @click="downloadImage"
          >
            <span>⬇️ Unduh Gambar</span>
          </button>
        </div>
      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Mengapa Memotong Gambar?</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Foto seringkali menangkap area background yang terlalu luas atau bocor. Fitur pangkas (crop) interaktif ini memungkinkan Anda menghapus bagian tepi gambar untuk memfokuskan visual pada subjek utama. Selain itu, ini sangat berguna untuk membuat ukuran avatar kotak (Square 1:1) Instagram/WhatsApp yang sempurna.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Memotong Foto Cepat</h2>
      <ol class="space-y-3">
        <li
          v-for="(step, i) in toolData.howToSteps"
          :key="i"
          class="flex items-start gap-3"
        >
          <span class="shrink-0 w-7 h-7 rounded-full bg-primary-100 text-primary-600 text-sm font-bold flex items-center justify-center">
            {{ i + 1 }}
          </span>
          <span class="text-gray-600 text-sm pt-1">{{ step }}</span>
        </li>
      </ol>
    </section>

    <!-- FAQ -->
    <FAQSection :items="toolData.faq" />

    <!-- RELATED TOOLS -->
    <RelatedToolsSection :tools="relatedTools" />

    <!-- BACK -->
    <div class="mt-10">
      <NuxtLink to="/tools/image" class="text-sm text-primary-600 hover:underline">
        ← Lihat semua Image Tools
      </NuxtLink>
    </div>
  </ToolPageLayout>
</template>

<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue';
import { getImageTool, getRelatedImageTools } from '~/data/imageTools.js';

// Metadata
const toolData = getImageTool('crop-image');
const relatedTools = getRelatedImageTools(toolData.relatedTools);

// SEO & CDN Integrations
useSeoMeta({
  title: toolData.seoTitle,
  description: toolData.seoDescription,
  ogTitle: toolData.seoTitle,
  ogDescription: toolData.seoDescription,
});

useHead({
  script: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js', defer: true },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: toolData.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }),
    },
  ],
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css' }
  ]
});

// State
const state = ref('idle'); // idle | loaded | success
const originalFile = ref(null);
const previewSrc = ref('');

const croppedBlob = ref(null);
const croppedPreviewSrc = ref('');

// Cropper instance
const imageElement = ref(null);
let cropper = null;

// Helpers
function formatSize(bytes) {
  if (!bytes) return '0 B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Actions
function onFileSelected(selectedFiles) {
  if (selectedFiles.length === 0) return;
  const f = selectedFiles[0];
  
  if (!f.type.startsWith('image/')) {
    alert('Harap masukkan file gambar.');
    return;
  }
  
  originalFile.value = f;
  state.value = 'loaded';
  
  const reader = new FileReader();
  reader.onload = (e) => {
    previewSrc.value = e.target.result;
    initCropper();
  };
  reader.readAsDataURL(f);
}

function initCropper() {
  destroyCropper();
  nextTick(() => {
    if (imageElement.value && window.Cropper) {
      cropper = new window.Cropper(imageElement.value, {
        viewMode: 1,
        dragMode: 'crop',
        responsive: true,
        restore: false,
        zoomable: false,
      });
    } else if (!window.Cropper) {
      // Cropper hasn't loaded yet from CDN, retry shortly
      setTimeout(initCropper, 300);
    }
  });
}

function destroyCropper() {
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
}

function setAspectRatio(ratio) {
  if (cropper) {
    cropper.setAspectRatio(ratio);
  }
}

function cropImage() {
  if (!cropper) return;
  
  // Get canvas
  const canvas = cropper.getCroppedCanvas({
    imageSmoothingEnabled: true,
    imageSmoothingQuality: 'high',
  });
  
  if (!canvas) {
    alert('Gagal memotong gambar.');
    return;
  }

  const outExt = originalFile.value.type.includes('png') ? '.png' : '.jpg';
  const mime = outExt === '.png' ? 'image/png' : 'image/jpeg';
  const qual = mime === 'image/jpeg' ? 0.95 : undefined;

  canvas.toBlob((blob) => {
    croppedBlob.value = blob;
    croppedPreviewSrc.value = URL.createObjectURL(blob);
    state.value = 'success';
  }, mime, qual);
}

function backToEdit() {
  if (croppedPreviewSrc.value) {
    URL.revokeObjectURL(croppedPreviewSrc.value);
    croppedPreviewSrc.value = '';
  }
  croppedBlob.value = null;
  state.value = 'loaded';
}

function downloadImage() {
  if (!croppedBlob.value) return;
  
  const url = URL.createObjectURL(croppedBlob.value);
  const a = document.createElement('a');
  a.href = url;
  
  const rawName = originalFile.value.name.replace(/\.[^/.]+$/, "");
  const outExt = originalFile.value.type.includes('png') ? '.png' : '.jpg';
  a.download = `${rawName}-cropped${outExt}`;
  
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function reset() {
  destroyCropper();
  originalFile.value = null;
  previewSrc.value = '';
  if (croppedPreviewSrc.value) {
    URL.revokeObjectURL(croppedPreviewSrc.value);
    croppedPreviewSrc.value = '';
  }
  croppedBlob.value = null;
  state.value = 'idle';
}

onBeforeUnmount(() => {
  destroyCropper();
  if (croppedPreviewSrc.value) URL.revokeObjectURL(croppedPreviewSrc.value);
});
</script>

<style scoped>
.bg-checkbox-pattern {
  background-image: linear-gradient(45deg, #e5e7eb 25%, transparent 25%, transparent 75%, #e5e7eb 75%, #e5e7eb), 
                    linear-gradient(45deg, #e5e7eb 25%, transparent 25%, transparent 75%, #e5e7eb 75%, #e5e7eb);
  background-size: 16px 16px;
  background-position: 0 0, 8px 8px;
}
.btn-primary {
  @apply bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>
