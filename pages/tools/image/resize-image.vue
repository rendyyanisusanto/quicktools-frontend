<template>
  <ToolPageLayout
    title="Resize Image Online Gratis"
    description="Ubah resolusi lebar dan tinggi gambar dengan cepat (dalam satuan Piksel) dengan kualitas tinggi dan gratis."
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
          <h2 class="text-sm font-semibold text-gray-700">Dimensi Gambar</h2>
          <button
            class="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
            @click="reset"
          >
            Ganti Gambar
          </button>
        </div>

        <div class="bg-gray-50 border border-gray-100 rounded-lg p-5">
          
          <div class="flex items-start gap-4 mb-4">
             <!-- Preview visual -->
             <div class="w-24 h-24 bg-white border border-gray-200 rounded flex items-center justify-center overflow-hidden shrink-0 shadow-sm relative">
                <img :src="previewSrc" class="max-w-full max-h-full object-contain" />
             </div>
             <div>
                <p class="text-sm font-semibold text-gray-800 break-all leading-tight mb-2">{{ originalFile.name }}</p>
                <div class="flex gap-4 text-xs text-gray-500">
                  <div class="flex flex-col">
                    <span class="uppercase tracking-wider font-semibold text-[10px] text-gray-400">Ukuran Asli</span>
                    <span>{{ originalDimensions.w }} × {{ originalDimensions.h }} px</span>
                  </div>
                </div>
             </div>
          </div>

          <hr class="border-gray-200 my-5" />

          <!-- Dimension Inputs -->
          <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div class="w-full">
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Lebar (Width)</label>
              <div class="relative">
                <input 
                  type="number" 
                  v-model.number="targetWidth" 
                  class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                  @input="onWidthChange"
                />
                <span class="absolute right-3 top-2 text-gray-400 text-sm">px</span>
              </div>
            </div>

            <div class="text-gray-300">
               <button @click="keepAspectRatio = !keepAspectRatio" class="p-2 hover:bg-gray-200 rounded transition-colors text-lg" title="Toggle Lock Aspect Ratio">
                 {{ keepAspectRatio ? '🔒' : '🔓' }}
               </button>
            </div>

            <div class="w-full">
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tinggi (Height)</label>
              <div class="relative">
                <input 
                  type="number" 
                  v-model.number="targetHeight" 
                  class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                  @input="onHeightChange"
                />
                <span class="absolute right-3 top-2 text-gray-400 text-sm">px</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Action button -->
        <div class="mt-6 flex justify-end">
          <button
            class="btn-primary flex items-center gap-2 px-8 py-3 w-full sm:w-auto justify-center"
            @click="processAndDownload"
          >
            <span>✨ Resize & Unduh</span>
          </button>
        </div>
      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Solusi Ubah Detail Piksel</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Beberapa platform pendaftaran CPNS, Visa, atau pembuatan Passpor online mensyaratkan dimensi pas foto yang sangat spesifik (misalnya tepat 400x600 piksel). Daripada repot membuka software editing foto kelas atas, kami menyediakan tool resize instan di sini.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Langkah Menyesuaikan Ukuran Gambar</h2>
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
const toolData = getImageTool('resize-image');
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
const state = ref('idle');
const originalFile = ref(null);
const imageHtmlElement = ref(null);
const previewSrc = ref('');

const originalDimensions = ref({ w: 0, h: 0 });
const targetWidth = ref(0);
const targetHeight = ref(0);

const keepAspectRatio = ref(true);
let aspectRatio = 1;

// Actions
function onFileSelected(selectedFiles) {
  if (selectedFiles.length === 0) return;
  const f = selectedFiles[0];
  
  if (!f.type.startsWith('image/')) {
    alert('File harus berformat gambar.');
    return;
  }
  
  originalFile.value = f;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    previewSrc.value = e.target.result;
    
    const img = new Image();
    img.onload = () => {
      imageHtmlElement.value = img;
      originalDimensions.value = { w: img.width, h: img.height };
      
      aspectRatio = img.width / img.height;
      targetWidth.value = img.width;
      targetHeight.value = img.height;
      
      state.value = 'loaded';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(f);
}

function onWidthChange() {
  if (keepAspectRatio.value && targetWidth.value > 0) {
    targetHeight.value = Math.round(targetWidth.value / aspectRatio);
  }
}

function onHeightChange() {
  if (keepAspectRatio.value && targetHeight.value > 0) {
    targetWidth.value = Math.round(targetHeight.value * aspectRatio);
  }
}

function processAndDownload() {
  if (!imageHtmlElement.value) return;

  const w = parseInt(targetWidth.value, 10);
  const h = parseInt(targetHeight.value, 10);
  
  if (!w || !h || w <= 0 || h <= 0) {
    alert('Lebar dan tinggi harus lebih besar dari 0.');
    return;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = w;
  canvas.height = h;
  
  // Use good smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(imageHtmlElement.value, 0, 0, w, h);

  const outExt = originalFile.value.type.includes('png') ? '.png' : '.jpg';
  const mime = outExt === '.png' ? 'image/png' : 'image/jpeg';
  const qual = mime === 'image/jpeg' ? 0.95 : undefined;

  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const rawName = originalFile.value.name.replace(/\.[^/.]+$/, "");
    a.download = `${rawName}-resized-${w}x${h}${outExt}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, mime, qual);
}

function reset() {
  originalFile.value = null;
  imageHtmlElement.value = null;
  previewSrc.value = '';
  state.value = 'idle';
}
</script>

<style scoped>
.btn-primary {
  @apply bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>
