<template>
  <ToolPageLayout
    title="JPG ke PNG Online Gratis"
    description="Ubah format gambar JPG/JPEG menjadi PNG transparan atau berkualitas tinggi secara instan di browser Anda."
    category-path="/tools/image"
    category-label="Image Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <!-- Upload Zone -->
      <ImageUploadZone
        v-if="state === 'idle'"
        hint="Pilih 1 file JPG/JPEG maksimal 20MB"
        accept="image/jpeg, image/jpg"
        :multiple="false"
        @files-selected="onFileSelected"
      />

      <!-- Image Editor & Results -->
      <div v-if="state !== 'idle'" class="mt-5">
        
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-semibold text-gray-700">Konversi Format</h2>
          <button
            class="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
            @click="reset"
          >
            Ganti Gambar
          </button>
        </div>

        <div class="bg-gray-50 border border-gray-100 rounded-lg p-5 text-center">
          
          <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
            <!-- Original -->
            <div class="w-full sm:w-1/3 flex flex-col items-center">
               <div class="w-24 h-24 bg-white border border-gray-200 rounded flex items-center justify-center overflow-hidden shadow-sm relative mb-3">
                  <img :src="previewSrc" class="max-w-full max-h-full object-contain" />
               </div>
               <span class="bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                 .JPG
               </span>
               <p class="text-xs text-gray-500 mt-2 truncate max-w-full px-2" :title="originalFile.name">{{ originalFile.name }}</p>
               <p class="text-[10px] text-gray-400 font-medium">{{ formatSize(originalFile.size) }}</p>
            </div>

            <div class="text-gray-300 hidden sm:block text-2xl">
               →
            </div>
            <div class="text-gray-300 block sm:hidden text-2xl my-2">
               ↓
            </div>

            <!-- Result -->
            <div class="w-full sm:w-1/3 flex flex-col items-center">
               <div class="w-24 h-24 bg-white border border-gray-200 rounded flex items-center justify-center overflow-hidden shadow-sm relative mb-3"
                    :class="{'opacity-50 grayscale': !convertedBlob}">
                  <img v-if="previewSrc" :src="previewSrc" class="max-w-full max-h-full object-contain" />
                  <div v-if="state === 'converting'" class="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <span class="animate-spin text-xl">⏳</span>
                  </div>
               </div>
               <span class="bg-green-100 border border-green-200 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                 .PNG
               </span>
               <p v-if="convertedBlob" class="text-xs text-gray-500 mt-2 truncate w-full px-2">Hasil Konversi</p>
               <p v-if="convertedBlob" class="text-[10px] text-gray-400 font-medium">{{ formatSize(convertedBlob.size) }}</p>
               <p v-else class="text-[10px] text-gray-400 font-medium mt-2">Menunggu diproses</p>
            </div>
          </div>

        </div>

        <!-- Action button -->
        <div class="mt-6 flex justify-end">
          <button
            v-if="!convertedBlob"
            class="btn-primary flex items-center gap-2 px-8 py-3 w-full sm:w-auto justify-center"
            :disabled="state === 'converting'"
            @click="processConversion"
          >
            <span v-if="state === 'converting'" class="animate-spin inline-block">⏳</span>
            <span>{{ state === 'converting' ? 'Mengonversi...' : 'Mulai Konversi' }}</span>
          </button>

          <button
            v-else
            class="btn-primary flex items-center gap-2 px-8 py-3 w-full sm:w-auto justify-center bg-green-600 hover:bg-green-700"
            @click="downloadImage"
          >
            <span>⬇️ Unduh File PNG</span>
          </button>
        </div>
      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Keuntungan Menggunakan Format PNG</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Berbeda dengan JPG yang kehilangan detail setiap kali disimpan berulang (lossy compression), grafis PNG mempertahankan kualitas aslinya dengan sangat sempurna. Fitur ini dirancang sangat cepat karena tidak mengunggah gambar Anda ke server secara online. Proses terjadi saat itu juga langsung di dalam mesin aplikasi peramban (browser) Anda.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Kerja JPG ke PNG</h2>
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
import { ref } from 'vue';
import { getImageTool, getRelatedImageTools } from '~/data/imageTools.js';

// Metadata
const toolData = getImageTool('jpg-to-png');
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
const state = ref('idle'); // idle | loaded | converting | success
const originalFile = ref(null);
const imageHtmlElement = ref(null);
const previewSrc = ref('');
const convertedBlob = ref(null);

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
  
  if (f.type !== 'image/jpeg' && f.type !== 'image/jpg') {
    alert('Harap masukkan file gambar berformat JPG atau JPEG.');
    return;
  }
  
  originalFile.value = f;
  state.value = 'loaded';
  convertedBlob.value = null;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    previewSrc.value = e.target.result;
    
    const img = new Image();
    img.onload = () => {
      imageHtmlElement.value = img;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(f);
}

function processConversion() {
  if (!imageHtmlElement.value) return;
  state.value = 'converting';

  // Small timeout to allow UI update for "converting..." state
  setTimeout(() => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = imageHtmlElement.value.width;
      canvas.height = imageHtmlElement.value.height;
      
      ctx.drawImage(imageHtmlElement.value, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        convertedBlob.value = blob;
        state.value = 'success';
      }, 'image/png');
    } catch (err) {
      alert('Terjadi kesalahan saat memproses gambar.');
      reset();
    }
  }, 100);
}

function downloadImage() {
  if (!convertedBlob.value) return;
  
  const url = URL.createObjectURL(convertedBlob.value);
  const a = document.createElement('a');
  a.href = url;
  
  const rawName = originalFile.value.name.replace(/\.[^/.]+$/, "");
  a.download = `${rawName}-converted.png`;
  
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function reset() {
  originalFile.value = null;
  imageHtmlElement.value = null;
  previewSrc.value = '';
  convertedBlob.value = null;
  state.value = 'idle';
}
</script>

<style scoped>
.btn-primary {
  @apply bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>
