<template>
  <ToolPageLayout
    title="Compress Image Online Gratis"
    description="Kecilkan ukuran gambar secara online dan instan langsung di browser Anda. Kualitas tetap terjaga tanpa batas unggahan harian."
    category-path="/tools/image"
    category-label="Image Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <!-- Upload Zone -->
      <ImageUploadZone
        v-if="state === 'idle'"
        hint="Pilih 1 file JPG/PNG maksimal 20MB"
        accept="image/jpeg, image/png, image/webp"
        :multiple="false"
        @files-selected="onFileSelected"
      />

      <!-- Image Editor & Results -->
      <div v-if="state !== 'idle'" class="mt-5">
        
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-semibold text-gray-700">Pengaturan Kompresi</h2>
          <button
            class="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
            @click="reset"
          >
            Ganti Gambar
          </button>
        </div>

        <div class="bg-gray-50 border border-gray-100 rounded-lg p-5">
          <!-- Preview Original Image Name -->
          <div class="flex items-center gap-3 mb-5 pb-5 border-b border-gray-200">
            <span class="text-2xl">🖼️</span>
            <div class="min-w-0">
              <p class="text-sm font-semibold text-gray-800 truncate">{{ originalFile.name }}</p>
              <p class="text-xs text-gray-500">Ukuran Asli: {{ formatSize(originalFile.size) }}</p>
            </div>
          </div>

          <!-- Quality Slider (Only for JPEG/WEBP outputs) -->
          <div class="mb-5">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Kualitas Gambar: <span class="text-primary-600 font-bold">{{ qualityPercentage }}%</span>
            </label>
            <input 
              type="range" 
              min="10" 
              max="100" 
              step="5" 
              v-model="qualityPercentage" 
              class="w-full accent-primary-600 cursor-pointer"
              @input="processImage"
            />
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>Lebih Kecil</span>
              <span>Kualitas Tinggi</span>
            </div>
          </div>

          <!-- Live Output Stats -->
          <div v-if="compressedBlob" class="bg-white border hover:border-green-300 transition-colors border-gray-200 rounded-lg p-4 text-center mt-2 flex justify-between items-center sm:hidden">
            <div>
              <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Ukuran Baru</p>
              <p class="text-lg font-bold text-green-600 leading-none">{{ formatSize(compressedBlob.size) }}</p>
            </div>
            <div class="text-right">
              <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Penghematan</p>
              <p class="text-sm font-bold text-gray-800 leading-none shadow-sm bg-gray-100 px-2 py-1 rounded">
                -{{ calculateSavings }}%
              </p>
            </div>
          </div>

          <!-- Desktop Side-by-side -->
          <div v-if="compressedBlob" class="hidden sm:flex justify-center items-center gap-6 mt-6 pt-4 border-t border-gray-200">
            <div class="text-center">
              <p class="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Awal</p>
              <p class="text-xl font-bold text-gray-800">{{ formatSize(originalFile.size) }}</p>
            </div>
            
            <div class="flex flex-col items-center">
              <span class="bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full mb-1">
                Hemat {{ calculateSavings }}%
              </span>
              <span class="text-gray-300">→</span>
            </div>

            <div class="text-center">
              <p class="text-xs text-green-500 font-bold uppercase tracking-wider mb-1">Hasil</p>
              <p class="text-xl font-bold text-green-600">{{ formatSize(compressedBlob.size) }}</p>
            </div>
          </div>

        </div>

        <!-- Action button -->
        <div class="mt-6 flex justify-end">
          <button
            class="btn-primary flex items-center gap-2 px-8 py-3 w-full sm:w-auto justify-center"
            :disabled="!compressedBlob"
            @click="downloadImage"
          >
            <span>⬇️ Unduh Gambar</span>
          </button>
        </div>
      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Mengecilkan Ukuran Foto Tanpa Blur</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Sering kesulitan upload pas foto pendaftaran CPNS, lamaran kerja, atau dokumen administratif karena sistem menolak "File terlalu besar"? Gunakan alat kompresi foto cerdas ini yang bekerja langsung di HP/Laptop Anda secara instan.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Memperkecil Ukuran Gambar</h2>
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
import { ref, computed } from 'vue';
import { getImageTool, getRelatedImageTools } from '~/data/imageTools.js';

// Metadata
const toolData = getImageTool('compress-image');
const relatedTools = getRelatedImageTools(toolData.relatedTools);

// SEO
useSeoMeta({
  title: toolData.seoTitle,
  description: toolData.seoDescription,
  ogTitle: toolData.seoTitle,
  ogDescription: toolData.seoDescription,
});

useHead({
  script: [
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
});

// State
const state = ref('idle'); // idle | loaded
const originalFile = ref(null);
const imageHtmlElement = ref(null);
const compressedBlob = ref(null);

// Settings
const qualityPercentage = ref(80);

// Helpers
function formatSize(bytes) {
  if (!bytes) return '0 B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

const calculateSavings = computed(() => {
  if (!originalFile.value || !compressedBlob.value) return 0;
  const saved = originalFile.value.size - compressedBlob.value.size;
  if (saved <= 0) return 0;
  return Math.round((saved / originalFile.value.size) * 100);
});

// Actions
function onFileSelected(selectedFiles) {
  if (selectedFiles.length === 0) return;
  const f = selectedFiles[0];
  
  // Basic validation
  if (!f.type.startsWith('image/')) {
    alert('File harus berformat gambar.');
    return;
  }
  
  originalFile.value = f;
  state.value = 'loaded';
  qualityPercentage.value = 80;

  // Load image into memory to construct a canvas
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      imageHtmlElement.value = img;
      processImage();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(f);
}

function processImage() {
  if (!imageHtmlElement.value) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = imageHtmlElement.value.width;
  canvas.height = imageHtmlElement.value.height;
  
  ctx.drawImage(imageHtmlElement.value, 0, 0, canvas.width, canvas.height);

  let outFormat = 'image/jpeg';
  // we force PNGs to JPEG for compression since canvas toBlob PNG ignores quality params
  if (originalFile.value.type === 'image/webp') outFormat = 'image/webp';

  const decimalQuality = qualityPercentage.value / 100;

  canvas.toBlob((blob) => {
    compressedBlob.value = blob;
  }, outFormat, decimalQuality);
}

function downloadImage() {
  if (!compressedBlob.value) return;
  
  const url = URL.createObjectURL(compressedBlob.value);
  const a = document.createElement('a');
  a.href = url;
  
  // Generate safe filename
  const rawName = originalFile.value.name.replace(/\.[^/.]+$/, "");
  const outExt = originalFile.value.type === 'image/webp' ? '.webp' : '.jpg';
  
  a.download = `${rawName}-compressed${outExt}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function reset() {
  originalFile.value = null;
  imageHtmlElement.value = null;
  compressedBlob.value = null;
  state.value = 'idle';
}
</script>

<style scoped>
.btn-primary {
  @apply bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>
