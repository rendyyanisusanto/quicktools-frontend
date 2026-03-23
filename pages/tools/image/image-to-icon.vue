<template>
  <ToolPageLayout
    title="Image to Icon / Favicon Generator Gratis"
    description="Ubah gambar logo menjadi kumpulan favicon berbagai resolusi untuk website dan aplikasi secara instan dan aman di browser."
    category-path="/tools/image"
    category-label="Image Tools"
  >
    <ToolActionCard>
      
      <!-- STEP 1: UPLOAD AREA -->
      <div v-if="!originalImageUrl" class="flex flex-col items-center">
         <div 
            @dragover.prevent="isDragging = true" 
            @dragleave.prevent="isDragging = false" 
            @drop.prevent="handleDrop"
            :class="[
               'w-full max-w-xl p-10 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-colors',
               isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
            ]"
         >
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
               <span class="text-3xl">🖼️</span>
            </div>
            
            <p class="text-sm font-bold text-gray-700 mb-1 text-center">Tarik File Gambar & Lepaskan Di Sini</p>
            <p class="text-xs text-gray-500 mb-6 text-center">Atau unggah langsung dari Perangkat File Explorer Anda</p>
            
            <input 
               type="file" 
               ref="fileInput" 
               @change="handleFileSelect" 
               accept="image/png, image/jpeg" 
               class="hidden" 
            />
            
            <button 
               @click="$refs.fileInput.click()" 
               class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
               Pilih Gambar
            </button>
            
            <p class="text-[10px] text-gray-400 mt-4 text-center mx-auto max-w-sm">Maksimal resolusi warna didapat dari Format PNG transparan (Rekomendasi). Maksimal ukuran file 5 MB.</p>
         </div>
      </div>

      <!-- STEP 2: PREVIEW & GENERATE -->
      <div v-if="originalImageUrl && !generatedIcons.length && !isGenerating" class="flex flex-col items-center animate-fade-in">
         <div class="relative w-48 h-48 rounded-xl border border-gray-200 bg-gray-50 p-2 mb-6 flex items-center justify-center shadow-inner overflow-hidden">
            <img :src="originalImageUrl" class="max-w-full max-h-full object-contain" alt="Original Image Preview" />
            <button @click="resetAll" class="absolute top-2 right-2 bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-200 transition-colors" title="Ganti Gambar">
               ✕
            </button>
         </div>
         
         <div class="text-center w-full max-w-md">
            <h3 class="text-lg font-bold text-gray-800 mb-2 truncate">{{ originalFile?.name }}</h3>
            <p class="text-xs text-gray-500 mb-6" v-if="originalFile">
               {{ (originalFile.size / 1024 / 1024).toFixed(2) }} MB • Siap diproses
            </p>
            
            <button 
               @click="startGeneration" 
               class="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-bold transition-colors shadow flex items-center justify-center gap-2"
            >
               ✨ Generate Semua Ukuran Icon
            </button>
         </div>
      </div>

      <!-- STEP 3: LOADING -->
      <div v-if="isGenerating" class="flex flex-col items-center justify-center py-10">
         <div class="inline-flex items-center gap-2 bg-primary-50 px-6 py-3 border border-primary-100 rounded-full text-primary-700 font-bold mb-4">
            <span class="animate-spin text-xl">⏳</span> Sedang Memproses...
         </div>
         <p class="text-xs text-gray-500 max-w-sm text-center">Men-generate 7 resolusi standar favicon di dalam memori browser Anda...</p>
      </div>

      <!-- STEP 4: RESULTS GRID -->
      <div v-if="generatedIcons.length > 0" class="animate-fade-in">
         
         <!-- Header / Reset / Download All -->
         <div class="flex flex-col sm:flex-row justify-between items-start md:items-center bg-green-50 px-5 py-4 border border-green-100 rounded-xl mb-8">
            <div class="mb-4 sm:mb-0">
               <h3 class="text-sm font-bold text-green-800">Selesai! Berhasil membuat {{ generatedIcons.length }} Ukuran Favicon.</h3>
               <p class="text-xs text-green-600 mt-1">Gunakan salah satu atau unduh semua ikon sekaligus dalam bentuk paket ZIP.</p>
            </div>
            
            <div class="flex items-center gap-3 w-full sm:w-auto">
               <button @click="resetAll" class="text-xs px-3 py-2 text-gray-500 hover:text-gray-700 font-medium whitespace-nowrap hidden md:block">
                  Mulai Baru
               </button>
               <button 
                  @click="downloadZip" 
                  :disabled="isZipping"
                  class="flex-1 sm:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold transition-colors shadow flex items-center justify-center gap-2 min-w-[150px]"
               >
                  <span v-if="isZipping">Tunggu...</span>
                  <span v-else>Download ZIP</span>
               </button>
            </div>
         </div>
         
         <!-- Icons Grid -->
         <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div 
               v-for="icon in generatedIcons" 
               :key="icon.size"
               class="border border-gray-100 bg-white hover:border-gray-300 rounded-xl p-4 flex flex-col items-center transition-all group shadow-sm hover:shadow"
            >
               <!-- Canvas/Image Box (Checkered pattern for transparency) -->
               <div 
                  class="w-full aspect-square mb-3 rounded border border-gray-50 flex items-center justify-center relative overflow-hidden bg-white"
                  style="background-image: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%); background-size: 10px 10px; background-position: 0 0, 0 5px, 5px -5px, -5px 0px;"
               >
                  <!-- The generated image -->
                  <img :src="icon.url" class="absolute object-contain" :width="icon.size" :height="icon.size" :style="`max-width: 100%; max-height: 100%; width: ${Math.min(icon.size, 100)}px; height: ${Math.min(icon.size, 100)}px`" alt="Icon preview" />
               </div>
               
               <span class="text-xs font-bold text-gray-800 mb-3">{{ icon.size }} x {{ icon.size }}</span>
               
               <!-- Download Individual -->
               <a 
                  :href="icon.url" 
                  :download="icon.filename"
                  class="w-full text-center py-1.5 px-3 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded text-xs font-semibold transition-colors"
               >
                  Unduh Png
               </a>
            </div>
         </div>
         
         <div class="mt-6 md:hidden">
            <button @click="resetAll" class="w-full text-sm py-2 px-4 shadow border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium">Buat Project Baru</button>
         </div>
         
      </div>
      
      <!-- Error Toaster -->
      <div v-if="errorMsg" class="mt-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded text-sm text-center mx-auto max-w-sm animate-shake">
         {{ errorMsg }}
      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Apa Itu Favicon dan Mengapa Anda Membutuhkannya?</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Favicon (kependekan dari Favorite Icon) adalah logo gambar berukuran kecil yang muncul pada struktur antar-muka browser seperti tab tab web, bookmark list, bilah URL, serta ikon tombol pintasan beranda ponsel. Generator konverter Icon multi-size kami hadir untuk mencukupi spesifikasi PWA modern Android dan Apple yang mewajibkan resolusi minimal hingga 192px secara presisi, semua dilakukan secara otomatis dan bersih menggunakan file upload tunggal milik Anda.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Mengkonversi Gambar Menjadi Icon</h2>
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
import { generateIconSizes, createZipArchive } from '~/utils/iconTools.js';

// SEO & Metadata
const toolData = getImageTool('image-to-icon');
const relatedTools = getRelatedImageTools(toolData.relatedTools);

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

// App State
const fileInput = ref(null);
const isDragging = ref(false);
const originalFile = ref(null);
const originalImageUrl = ref(null);
const generatedIcons = ref([]);
const isGenerating = ref(false);
const isZipping = ref(false);
const errorMsg = ref('');

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const TARGET_SIZES = [16, 32, 48, 64, 128, 192, 256];

/** Utility to clean up previous DOM blob URLs to free memory */
function cleanupUrls() {
   if (originalImageUrl.value) URL.revokeObjectURL(originalImageUrl.value);
   generatedIcons.value.forEach(icon => URL.revokeObjectURL(icon.url));
}

// Handlers
function handleDrop(e) {
  isDragging.value = false;
  const file = e.dataTransfer.files[0];
  processFile(file);
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  processFile(file);
}

function processFile(file) {
  errorMsg.value = '';
  
  if (!file) return;

  // Validate type
  if (!file.type.match(/image\/(jpeg|png)/)) {
    errorMsg.value = 'Hanya format JPG dan PNG yang didukung.';
    return;
  }
  
  // Validate size
  if (file.size > MAX_FILE_SIZE) {
    errorMsg.value = 'Ukuran file terlalu besar. Maksimal 5MB.';
    return;
  }

  // Set file and preview
  cleanupUrls();
  originalFile.value = file;
  originalImageUrl.value = URL.createObjectURL(file);
  generatedIcons.value = [];
}

async function startGeneration() {
   if (!originalFile.value) return;
   
   isGenerating.value = true;
   errorMsg.value = '';
   
   try {
      // Create sizes array
      const icons = await generateIconSizes(originalFile.value, TARGET_SIZES);
      generatedIcons.value = icons;
   } catch (error) {
      console.error(error);
      errorMsg.value = 'Gagal memproses gambar. Pastikan gambar tidak rusak atau cacat.';
   } finally {
      isGenerating.value = false;
   }
}

async function downloadZip() {
   if (!generatedIcons.value.length) return;
   
   isZipping.value = true;
   try {
      const zipBlob = await createZipArchive(generatedIcons.value);
      
      // Setup download trigger
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = `favicon-bundle-${new Date().getTime()}.zip`;
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Note: We don't revoke the zip blob immediately because click might be async
      setTimeout(() => URL.revokeObjectURL(link.href), 10000);
   } catch (error) {
      console.error(error);
      errorMsg.value = 'Gagal membungkus ZIP file.';
   } finally {
      isZipping.value = false;
   }
}

function resetAll() {
  cleanupUrls();
  if (fileInput.value) fileInput.value.value = '';
  originalFile.value = null;
  originalImageUrl.value = null;
  generatedIcons.value = [];
  errorMsg.value = '';
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.4s ease-out forwards;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
.animate-shake {
  animation: shake 0.3s ease-in-out;
}
</style>
