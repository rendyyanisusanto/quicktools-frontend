<script setup>
import { ref, reactive, computed, onMounted, nextTick, shallowRef } from 'vue';
import { useSeoMeta, useRuntimeConfig } from '#imports';
import { getPdfTool } from '~/data/pdfTools.js';

// Setup basic meta info
const toolData = getPdfTool('sign-pdf');
useSeoMeta({
  title: toolData?.seoTitle || 'Sign PDF (Drag & Drop) | QuickTools',
  description: toolData?.seoDescription,
});

// PDF processing dependencies
let pdfjsLib;

// State
const step = ref(1); // 1: Upload PDF, 2: Upload Signature, 3: Sign/Drag, 4: Done
const pdfFile = ref(null);
const signatureFile = ref(null);
const signatureImgSrc = ref('');
const sigOriginalRatio = ref(1);

const isProcessing = ref(false);
const errorMessage = ref('');
const resultUrl = ref('');

// PDF Viewer State
let pdfDocumentObj = null;
const totalPages = ref(1);
const currentPage = ref(1);
const pdfCanvas = ref(null);
const pdfContainer = ref(null);

const previewWidth = ref(0);
const previewHeight = ref(0);

// Signature Drag & Drop State
const sigPos = reactive({ x: 50, y: 50 });
const sigWidth = ref(150); // initial width in px
const sigHeight = computed(() => sigWidth.value * sigOriginalRatio.value);

const isDragging = ref(false);
const dragStart = reactive({ offsetX: 0, offsetY: 0 });

// Handle File Input
const handlePdfUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (file.type !== 'application/pdf') {
    errorMessage.value = 'Harap unggah file PDF yang valid.';
    return;
  }
  if (file.size > 20 * 1024 * 1024) {
    errorMessage.value = 'Ukuran file PDF maksimal 20MB.';
    return;
  }
  
  pdfFile.value = file;
  errorMessage.value = '';
  step.value = 2; // Move to Signature Upload
};

const handleSignatureUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    errorMessage.value = 'Format gambar tidak didukung. Gunakan PNG (disarankan transparan), JPG, atau WebP.';
    return;
  }
  
  signatureFile.value = file;
  
  // Load to get object URL and ratio
  const reader = new FileReader();
  reader.onload = (event) => {
    signatureImgSrc.value = event.target.result;
    
    // Calculate aspect ratio
    const img = new Image();
    img.onload = () => {
      sigOriginalRatio.value = img.height / img.width;
      step.value = 3; // Move to PDF Drag & Drop Mode
      initPdfRenderer();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
};

// Initialize PDF.js
const initPdfRenderer = async () => {
  if (import.meta.client) {
    try {
      pdfjsLib = await import('pdfjs-dist');
      
      // Use stable CDN worker matching the downgraded 3.11.174 version to avoid Nuxt Vite bundling complexity
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

      const arrayBuffer = await pdfFile.value.arrayBuffer();
      pdfDocumentObj = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      totalPages.value = pdfDocumentObj.numPages;
      
      renderPage(currentPage.value);
    } catch (err) {
      console.error('Error loading PDF:', err);
      errorMessage.value = 'Gagal membaca file PDF.';
    }
  }
};

// Render specific page
const renderPage = async (pageNumber) => {
  if (!pdfDocumentObj || !pdfCanvas.value || !pdfContainer.value) return;
  
  try {
    const page = await pdfDocumentObj.getPage(pageNumber);
    
    // Calculate scale to fit container width. The max container width is roughly device width or max 800px.
    const containerClientWidth = pdfContainer.value.clientWidth;
    
    // Original viewport at scale 1
    let viewport = page.getViewport({ scale: 1 });
    
    // Scale viewport to fit container
    const scale = containerClientWidth / viewport.width;
    viewport = page.getViewport({ scale });
    
    const canvas = pdfCanvas.value;
    const context = canvas.getContext('2d');
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    // Store rendered dimensions for dragging boundaries and backend metadata
    previewWidth.value = canvas.width;
    previewHeight.value = canvas.height;
    
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    
    await page.render(renderContext).promise;
    
    // Reset signature position when page changes, putting it in the center roughly
    sigPos.x = (previewWidth.value - sigWidth.value) / 2;
    sigPos.y = (previewHeight.value - sigHeight.value) / 2;
    
  } catch (err) {
    console.error('Error rendering page:', err);
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    renderPage(currentPage.value);
  }
};

const goToPrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    renderPage(currentPage.value);
  }
};

// Drag Logic (Mouse & Touch)
const onDragStart = (e) => {
  if (!signatureImgSrc.value) return;
  isDragging.value = true;
  
  // Support both mouse and touch events
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  
  // Calculate offset of the click down event relative to the Signature Image bounding box
  const targetRect = e.target.getBoundingClientRect();
  dragStart.offsetX = clientX - targetRect.left;
  dragStart.offsetY = clientY - targetRect.top;
};

const onDragMove = (e) => {
  if (!isDragging.value || !pdfContainer.value) return;
  e.preventDefault(); // Prevent page scrolling during drag on mobile
  
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  
  const containerRect = pdfContainer.value.getBoundingClientRect();
  
  // Calculate new position
  let newX = clientX - containerRect.left - dragStart.offsetX;
  let newY = clientY - containerRect.top - dragStart.offsetY;
  
  // Boundary constraints
  if (newX < 0) newX = 0;
  if (newY < 0) newY = 0;
  if (newX + sigWidth.value > previewWidth.value) newX = previewWidth.value - sigWidth.value;
  if (newY + sigHeight.value > previewHeight.value) newY = previewHeight.value - sigHeight.value;
  
  sigPos.x = newX;
  sigPos.y = newY;
};

const onDragEnd = () => {
  isDragging.value = false;
};

// Submit to Backend
const applySignature = async () => {
  if (!pdfFile.value || !signatureFile.value) {
    errorMessage.value = 'PDF atau Tanda Tangan belum lengkap.';
    return;
  }
  
  isProcessing.value = true;
  errorMessage.value = '';
  
  const formData = new FormData();
  formData.append('files', pdfFile.value);
  formData.append('files', signatureFile.value);
  formData.append('page', currentPage.value);
  
  // Passing exact coordinate mapping info
  formData.append('x', sigPos.x);
  formData.append('y', sigPos.y);
  formData.append('width', sigWidth.value);
  formData.append('height', sigHeight.value);
  formData.append('previewWidth', previewWidth.value);
  formData.append('previewHeight', previewHeight.value);

  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  try {
    const res = await $fetch(`${apiBase}/pdf/apply-signature`, {
      method: 'POST',
      body: formData,
    });

    if (res.success && res.data.downloadUrl) {
      resultUrl.value = res.data.downloadUrl;
      step.value = 4; // Finished state
    } else {
      throw new Error(res.message || 'Gagal memproses file');
    }
  } catch (err) {
    console.error('Apply Signature Error:', err);
    errorMessage.value = err.data?.message || err.message || 'Terjadi kesalahan sistem.';
  } finally {
    isProcessing.value = false;
  }
};

const resetTool = () => {
  step.value = 1;
  pdfFile.value = null;
  signatureFile.value = null;
  signatureImgSrc.value = '';
  resultUrl.value = '';
  errorMessage.value = '';
  pdfDocumentObj = null;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <div class="max-w-4xl mx-auto px-4 py-8">
      
      <div v-if="toolData" class="mb-10 text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">{{ toolData.title }}</h1>
        <p class="text-lg text-gray-600">{{ toolData.shortDescription }}</p>
      </div>

      <!-- Error Alert -->
      <div v-if="errorMessage" class="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center shadow-sm">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- MAIN CONTAINER -->
      <div class="bg-white rounded-xl shadow-md p-6 sm:p-8">
        
        <!-- STEP 1: UPLOAD PDF -->
        <div v-if="step === 1" class="text-center">
          <label class="block cursor-pointer flex flex-col items-center justify-center p-12 border-2 border-dashed border-primary/50 text-gray-600 rounded-xl bg-gray-50 hover:bg-primary/5 hover:border-primary transition duration-300">
            <svg class="w-16 h-16 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span class="text-xl font-semibold mb-2">Pilih File PDF Anda</span>
            <span class="text-sm opacity-75">Klik atau seret file PDF ke sini (Maks 20MB)</span>
            <input type="file" accept="application/pdf" class="hidden" @change="handlePdfUpload" />
          </label>
        </div>

        <!-- STEP 2: UPLOAD SIGNATURE -->
        <div v-if="step === 2" class="text-center">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-700">Langkah 2: Unggah Tanda Tangan</h3>
            <button @click="step = 1" class="text-sm text-primary hover:underline">Ganti PDF</button>
          </div>
          
          <label class="block cursor-pointer flex flex-col items-center justify-center p-10 border-2 border-dashed border-secondary/50 text-gray-600 rounded-xl bg-gray-50 hover:bg-secondary/5 hover:border-secondary transition duration-300">
            <svg class="w-16 h-16 text-secondary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
            <span class="text-xl font-semibold mb-2">Pilih Gambar Tanda Tangan</span>
            <span class="text-sm opacity-75">Gunakan format PNG Transparan, JPG, atau WebP</span>
            <input type="file" accept="image/png, image/jpeg, image/webp" class="hidden" @change="handleSignatureUpload" />
          </label>
          <p class="mt-4 text-sm text-gray-500">
            Belum punya PNG Tanda Tangan? Gunakan tool <NuxtLink to="/tools/pdf/e-signature-maker" target="_blank" class="text-primary hover:underline font-medium">E-Signature Maker</NuxtLink> kami.
          </p>
        </div>

        <!-- STEP 3: DRAG AND DROP EDITOR -->
        <div v-if="step === 3">
          
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h3 class="text-lg font-semibold text-gray-800">Geser TTD ke Posisi yang Pas</h3>
            
            <div class="flex items-center space-x-2 bg-gray-100 p-1.5 rounded-lg">
              <button @click="goToPrevPage" :disabled="currentPage <= 1" class="p-2 rounded text-gray-600 hover:bg-gray-200 disabled:opacity-50">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <span class="text-sm min-w-[80px] text-center font-medium">Hal {{ currentPage }} / {{ totalPages }}</span>
              <button @click="goToNextPage" :disabled="currentPage >= totalPages" class="p-2 rounded text-gray-600 hover:bg-gray-200 disabled:opacity-50">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>

          <!-- Interactive Workspace -->
          <div class="w-full bg-gray-200 rounded-lg overflow-hidden flex justify-center mb-6 relative">
            
            <!-- We attach touch and mouse drag-movement to window scale / overall document to avoid losing tracking if cursor leaves container -->
            <!-- Wait, to keep it simple, attach move handlers to the container itself -->
            
            <div 
              ref="pdfContainer" 
              class="relative select-none touch-none shadow-sm"
              @mousemove="onDragMove"
              @touchmove="onDragMove"
              @mouseup="onDragEnd"
              @touchend="onDragEnd"
              @mouseleave="onDragEnd"
            >
              <!-- PDF Render Canvas -->
              <canvas ref="pdfCanvas" class="block"></canvas>
              
              <!-- Draggable Signature Overlay -->
              <img 
                v-if="signatureImgSrc && previewWidth"
                :src="signatureImgSrc" 
                class="absolute z-10 cursor-move border border-dashed border-blue-500 bg-blue-500/10 hover:bg-blue-500/20"
                :style="{
                  left: sigPos.x + 'px',
                  top: sigPos.y + 'px',
                  width: sigWidth + 'px',
                  height: sigHeight + 'px'
                }"
                draggable="false"
                @mousedown="onDragStart"
                @touchstart="onDragStart"
              />
            </div>
            
          </div>

          <!-- Controls under editor -->
          <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
            <div class="flex items-center gap-4">
              <label class="whitespace-nowrap font-medium text-sm text-gray-700">Ukuran Tanda Tangan:</label>
              <input 
                type="range" 
                min="50" 
                max="400" 
                v-model.number="sigWidth" 
                class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              >
            </div>
            <p class="text-xs text-gray-500 mt-2">Geser slider di atas untuk merubah rasio besarnya stempel tanda tangan, lalu klik & geser gambar tanda tangan di preview ke atas tulisan/tempat yang Anda mau.</p>
          </div>

          <div class="flex flex-col-reverse sm:flex-row gap-4">
            <button @click="resetTool" class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition w-full sm:w-auto">
              Batal
            </button>
            <button @click="applySignature" :disabled="isProcessing" class="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition w-full sm:flex-1 flex justify-center items-center">
              <svg v-if="isProcessing" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isProcessing ? 'Memproses...' : 'Selesai & Terapkan Tanda Tangan' }}
            </button>
          </div>
          
        </div>

        <!-- STEP 4: RESULT -->
        <div v-if="step === 4" class="text-center py-8">
          <div class="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Sukses Diproses!</h2>
          <p class="text-gray-600 mb-8">Tanda tangan Anda berhasil ditempelkan dengan akurat.</p>
          
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a :href="resultUrl" download class="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/30 flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Download PDF Final
            </a>
            <button @click="resetTool" class="px-8 py-3 text-primary border border-primary/30 font-medium rounded-lg hover:bg-primary/5 transition flex items-center justify-center">
              Tandatangani Dokumen Lain
            </button>
          </div>
        </div>

      </div>

      <!-- FAQ Section -->
      <div v-if="toolData && toolData.faq" class="mt-16 max-w-3xl mx-auto">
        <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          FAQ
        </h3>
        <div class="space-y-4">
          <div v-for="(item, idx) in toolData.faq" :key="idx" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 class="font-semibold text-gray-800 mb-2">{{ item.question }}</h4>
            <p class="text-gray-600">{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
