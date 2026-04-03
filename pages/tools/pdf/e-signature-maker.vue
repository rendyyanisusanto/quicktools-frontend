<template>
  <ToolPageLayout
    title="E-Signature Maker"
    description="Buat tanda tangan digital online dengan mudah. Unduh transparan, atau tempelkan langsung ke dokumen PDF."
    category-path="/tools/pdf"
    category-label="PDF Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <!-- TABS -->
      <div class="flex border-b border-gray-200 mb-6">
        <button
          class="flex-1 py-3 text-sm font-semibold text-center transition-colors border-b-2"
          :class="activeTab === 'create' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
          @click="activeTab = 'create'"
        >
          ✍️ Create Signature
        </button>
        <button
          class="flex-1 py-3 text-sm font-semibold text-center transition-colors border-b-2"
          :class="activeTab === 'sign' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
          @click="activeTab = 'sign'"
        >
          📄 Sign PDF
        </button>
      </div>

      <!-- ==================== CREATE SIGNATURE TAB ==================== -->
      <div v-show="activeTab === 'create'">
        <!-- Sub-tabs for Create modes -->
        <div class="flex gap-4 mb-4 justify-center">
          <label class="flex items-center gap-2 cursor-pointer text-sm">
            <input type="radio" value="draw" v-model="createMode" class="accent-primary-600" /> Draw
          </label>
          <label class="flex items-center gap-2 cursor-pointer text-sm">
            <input type="radio" value="type" v-model="createMode" class="accent-primary-600" /> Type
          </label>
        </div>

        <div class="bg-gray-50 border border-gray-200 rounded-lg p-5 flex flex-col items-center">
          
          <!-- Draw Mode -->
          <div v-show="createMode === 'draw'" class="w-full">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs text-gray-500 font-medium">Gambar tanda tangan Anda di kotak ini:</span>
              <button @click="clearCanvas" class="text-xs text-red-500 hover:underline">Clear</button>
            </div>
            <div class="bg-white border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex justify-center w-full shadow-inner relative">
              <canvas
                ref="canvasRef"
                width="600"
                height="300"
                class="touch-none bg-transparent cursor-crosshair w-full object-contain max-w-[600px] aspect-[2/1]"
                @mousedown="startDrawing"
                @mousemove="draw"
                @mouseup="stopDrawing"
                @mouseleave="stopDrawing"
                @touchstart.prevent="startDrawing"
                @touchmove.prevent="draw"
                @touchend.prevent="stopDrawing"
              ></canvas>
              <!-- Info overlay if empty and not interacted -->
              <div v-if="!hasDrawn && createMode === 'draw'" class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                <span class="text-4xl text-gray-300">✍️</span>
              </div>
            </div>
            <div class="flex gap-4 mt-3 justify-center">
              <label class="text-xs flex items-center gap-2">
                Color:
                <input type="color" v-model="strokeColor" class="w-6 h-6 border-none p-0 cursor-pointer" />
              </label>
              <label class="text-xs flex items-center gap-2">
                Size:
                <input type="range" v-model="strokeWidth" min="1" max="10" class="w-24 accent-primary-600" />
              </label>
            </div>
          </div>

          <!-- Type Mode -->
          <div v-show="createMode === 'type'" class="w-full">
            <div class="mb-4 text-center">
              <input
                v-model="typedText"
                type="text"
                placeholder="Ketik Nama Anda..."
                class="w-full sm:w-2/3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 text-center text-lg"
                @input="renderTypedCanvas"
              />
            </div>
            <div class="flex gap-4 justify-center mb-4">
              <label class="text-xs flex items-center gap-2">
                Font:
                <select v-model="selectedFont" @change="renderTypedCanvas" class="border border-gray-300 p-1 rounded">
                  <option value="Brush Script MT, cursive">Brush Script</option>
                  <option value="Caveat, cursive">Caveat</option>
                  <option value="Dancing Script, cursive">Dancing Script</option>
                  <option value="Georgia, serif">Serif Elegant</option>
                </select>
              </label>
              <label class="text-xs flex items-center gap-2">
                Color:
                <input type="color" v-model="strokeColor" @input="renderTypedCanvas" class="w-6 h-6 border-none p-0 cursor-pointer" />
              </label>
            </div>
            <div class="bg-white border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex justify-center w-full shadow-inner relative" style="height: 300px;">
              <canvas
                ref="typeCanvasRef"
                width="600"
                height="300"
                class="hidden"
              ></canvas>
              <!-- Display real generated preview from canvas data -->
              <img :src="finalImageSrc" v-if="finalImageSrc" class="max-w-full max-h-full object-contain drop-shadow" />
              <div v-else class="flex h-full items-center justify-center text-gray-300 italic">Ketik untuk melihat hasil</div>
            </div>
          </div>

        </div>

        <!-- Download Actions -->
        <div class="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white hover:bg-gray-700 rounded-lg text-sm font-semibold disabled:opacity-50 transition-colors"
            :disabled="!hasSignature"
            @click="downloadSignature(false)"
          >
            ⬇️ Download PNG (Transparent)
          </button>
          <button
            class="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-semibold disabled:opacity-50 transition-colors"
            :disabled="!hasSignature"
            @click="downloadSignature(true)"
          >
            ⬇️ Download PNG (White BG)
          </button>
        </div>
      </div>

      <!-- ==================== SIGN PDF TAB ==================== -->
      <div v-show="activeTab === 'sign'">
        <div v-if="state === 'idle'">
          <FileUploadZone
            hint="Pilih 1 file PDF maksimal 20MB"
            accept="application/pdf"
            :multiple="false"
            @files-selected="onPdfSelected"
          />
        </div>

        <div v-if="state !== 'idle'" class="mt-5">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-sm font-semibold text-gray-700">Pengaturan Tanda Tangan PDF</h2>
            <button class="text-xs text-red-500 hover:text-red-700 font-medium transition-colors" @click="resetPdf">
              Ganti PDF
            </button>
          </div>

          <div v-if="state === 'loaded'" class="bg-gray-50 border border-gray-100 rounded-lg p-5">
            <div class="bg-white border rounded-lg p-4 mb-5 text-center text-gray-600 text-sm">
              <span class="font-semibold text-gray-800">📄 {{ originalPdfFile?.name }}</span>
            </div>

            <!-- Signature Display / Selector -->
            <div class="mb-5 border-b pb-5">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Tanda Tangan yang Digunakan</label>
              <div v-if="finalImageSrc" class="flex flex-col items-center">
                <div class="bg-white border border-gray-300 rounded overflow-hidden p-2 flex justify-center mb-3 max-w-[200px]" style="background-image: radial-gradient(#ddd 1px, transparent 1px); background-size: 10px 10px;">
                  <img :src="finalImageSrc" class="object-contain max-w-full max-h-[80px]" />
                </div>
                <button @click="activeTab = 'create'" class="text-xs text-primary-600 underline">Ganti Tanda Tangan</button>
              </div>
              <div v-else class="text-center bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg text-sm">
                Anda belum membuat tanda tangan! <br/><button @click="activeTab = 'create'" class="font-bold underline mt-2">Buat Sekarang di Tab Create</button>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <!-- Position X -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Posisi Horizontal</label>
                <div class="flex flex-col gap-2">
                  <label v-for="h in alignHOptions" :key="h.value" class="flex items-center gap-3 p-3 rounded-lg border cursor-pointer" :class="selectedAlignH === h.value ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-white hover:border-gray-300'">
                    <input type="radio" :value="h.value" v-model="selectedAlignH" class="accent-primary-600"/>
                    <span class="text-sm font-medium">{{ h.label }}</span>
                  </label>
                </div>
              </div>

              <!-- Position Y -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Posisi Vertikal</label>
                <div class="flex flex-col gap-2">
                  <label v-for="v in alignVOptions" :key="v.value" class="flex items-center gap-3 p-3 rounded-lg border cursor-pointer" :class="selectedAlignV === v.value ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-white hover:border-gray-300'">
                    <input type="radio" :value="v.value" v-model="selectedAlignV" class="accent-primary-600"/>
                    <span class="text-sm font-medium">{{ v.label }}</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Halaman Ke-</label>
                <input type="number" v-model.number="selectedPage" min="1" class="w-full px-3 py-2 border rounded-lg focus:border-primary-500 focus:outline-none" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Ukuran Tanda Tangan</label>
                <select v-model="selectedSize" class="w-full px-3 py-2 border rounded-lg focus:border-primary-500 focus:outline-none bg-white">
                  <option value="small">Kecil</option>
                  <option value="medium">Sedang</option>
                  <option value="large">Besar</option>
                </select>
              </div>
            </div>

            <button
              class="btn-primary w-full py-3 flex items-center justify-center gap-2"
              @click="signPdf"
              :disabled="!finalImageSrc"
            >
              <span>📄 Terapkan Tanda Tangan</span>
            </button>
          </div>

          <!-- States -->
          <div v-if="state === 'loading'" class="bg-gray-50 border border-gray-100 rounded-lg p-10 flex flex-col items-center gap-4">
            <div class="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            <p class="text-sm text-gray-500 font-medium">Sedang menempelkan tanda tangan...</p>
          </div>

          <div v-if="state === 'error'" class="bg-red-50 border border-red-100 rounded-lg p-6 text-center">
            <p class="text-sm font-semibold text-red-700 mb-1">Terjadi kesalahan</p>
            <p class="text-xs text-red-500 mb-4">{{ errorMessage }}</p>
            <button class="text-xs text-primary-600 hover:underline" @click="state = 'loaded'">Coba lagi</button>
          </div>

          <div v-if="state === 'success'" class="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center flex flex-col items-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mb-4">✅</div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">Sukses!</h3>
            <p class="text-sm text-gray-500 mb-6">Tanda tangan telah berhasil ditempelkan di halaman {{ selectedPage }}.</p>
            <a :href="resultDownloadUrl" :download="resultFileName" class="btn-primary px-8 py-3 mb-4 inline-flex items-center gap-2">
              ⬇️ Unduh PDF Hasil
            </a>
            <button class="text-sm text-gray-500 hover:underline" @click="resetPdf">Sign Dokumen Lain</button>
          </div>
        </div>
      </div>
    </ToolActionCard>

    <!-- INTRO -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Solusi E-Signature Gratis</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Butuh bubuhkan tanda tangan ke dokumen dengan cepat? Tool E-Signature Maker memungkinkan Anda menggambar tanda tangan di layar secara mulus, atau mengetik nama Anda dengan font estetis. Kemudian Anda bisa langsung mengunggah dokumen PDF, lalu sistem akan secara otomatis menempelkan tanda tangan tsb secara akurat pada dokumen Anda.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Menggunakan</h2>
      <ol class="space-y-3">
        <li v-for="(step, i) in toolData.howToSteps" :key="i" class="flex items-start gap-3">
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
      <NuxtLink to="/tools/pdf" class="text-sm text-primary-600 hover:underline">
        ← Lihat semua PDF Tools
      </NuxtLink>
    </div>
  </ToolPageLayout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { getPdfTool, getRelatedPdfTools } from '~/data/pdfTools.js';

// SEO & Metadata
const toolData = getPdfTool('e-signature-maker');
const relatedTools = getRelatedPdfTools(toolData.relatedTools);

useSeoMeta({
  title: toolData.seoTitle,
  description: toolData.seoDescription,
});

useHead({
  // Adding Google Fonts for Type Signature
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Dancing+Script:wght@600&display=swap' }
  ]
});

// Navigation state
const activeTab = ref('create'); // 'create' | 'sign'

// --- Canvas (Create Signature) Logic ---
const createMode = ref('draw'); // 'draw' | 'type'
const canvasRef = ref(null);
const typeCanvasRef = ref(null);
const strokeColor = ref('#000000');
const strokeWidth = ref(4);

// DRAW STATE
const isDrawing = ref(false);
let ctx = null;
let lastX = 0;
let lastY = 0;
const hasDrawn = ref(false);

// TYPE STATE
const typedText = ref('');
const selectedFont = ref('Caveat, cursive');

// OUTPUT
const finalImageDataResult = ref('');

// Syncing final Image based on mode
const finalImageSrc = computed(() => {
  return finalImageDataResult.value;
});

const hasSignature = computed(() => !!finalImageSrc.value);

onMounted(() => {
  initCanvas();
  // Set slight delay for fonts to load
  setTimeout(() => renderTypedCanvas(), 500);
});

// Setup drawing context
function initCanvas() {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d');
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
  }
}

// Watch modes to capture the correct canvas
watch([createMode, hasDrawn, typedText, selectedFont, strokeColor], () => {
  updateFinalImage();
}, { deep: true });

function updateFinalImage() {
  if (createMode.value === 'draw' && hasDrawn.value) {
    finalImageDataResult.value = canvasRef.value.toDataURL('image/png');
  } else if (createMode.value === 'type' && typedText.value.trim() !== '') {
    renderTypedCanvas();
    finalImageDataResult.value = typeCanvasRef.value.toDataURL('image/png');
  } else {
    finalImageDataResult.value = '';
  }
}

// Coordinate extraction supporting mouse & touch
function getCoordinates(e) {
  const rect = canvasRef.value.getBoundingClientRect();
  // Adjust for canvas stretching
  const scaleX = canvasRef.value.width / rect.width;
  const scaleY = canvasRef.value.height / rect.height;

  let clientX = e.clientX;
  let clientY = e.clientY;
  
  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  }

  return [
    (clientX - rect.left) * scaleX,
    (clientY - rect.top) * scaleY
  ];
}

function startDrawing(e) {
  isDrawing.value = true;
  hasDrawn.value = true;
  const [x, y] = getCoordinates(e);
  lastX = x;
  lastY = y;
}

function draw(e) {
  if (!isDrawing.value) return;
  const [x, y] = getCoordinates(e);
  
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.strokeStyle = strokeColor.value;
  ctx.lineWidth = strokeWidth.value;
  ctx.stroke();
  
  lastX = x;
  lastY = y;
  
  // Triggers final image update
  if (!updateRequested) {
      updateRequested = true;
      requestAnimationFrame(() => {
          updateFinalImage();
          updateRequested = false;
      });
  }
}
let updateRequested = false;

function stopDrawing() {
  isDrawing.value = false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  hasDrawn.value = false;
  updateFinalImage();
}

function renderTypedCanvas() {
  if (!typeCanvasRef.value) return;
  const tCtx = typeCanvasRef.value.getContext('2d');
  tCtx.clearRect(0, 0, typeCanvasRef.value.width, typeCanvasRef.value.height);
  
  if (!typedText.value) return;
  
  tCtx.font = `60px ${selectedFont.value}`;
  tCtx.fillStyle = strokeColor.value;
  tCtx.textAlign = 'center';
  tCtx.textBaseline = 'middle';
  tCtx.fillText(typedText.value, typeCanvasRef.value.width / 2, typeCanvasRef.value.height / 2);
}

async function downloadSignature(whiteBg = false) {
  if (!hasSignature.value) return;
  
  let downloadUrl = finalImageSrc.value;
  
  if (whiteBg) {
    // Merge transparent generated PNG onto white canvas
    const mergingCanvas = document.createElement('canvas');
    mergingCanvas.width = 600;
    mergingCanvas.height = 300;
    const mCtx = mergingCanvas.getContext('2d');
    
    // Fill white
    mCtx.fillStyle = '#FFFFFF';
    mCtx.fillRect(0, 0, mergingCanvas.width, mergingCanvas.height);
    
    // Draw image
    const img = new Image();
    img.src = finalImageSrc.value;
    await new Promise(resolve => img.onload = resolve);
    
    mCtx.drawImage(img, 0, 0);
    downloadUrl = mergingCanvas.toDataURL('image/jpeg');
  }

  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `signature-${new Date().getTime()}.${whiteBg ? 'jpg' : 'png'}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


// --- PDF Sign Logic ---
const state = ref('idle');
const originalPdfFile = ref(null);
const selectedPage = ref(1);
const selectedAlignH = ref('right');
const selectedAlignV = ref('bottom');
const selectedSize = ref('medium');
const resultDownloadUrl = ref('');
const resultFileName = ref('');
const errorMessage = ref('');

const alignHOptions = [
  { value: 'left', label: 'Kiri' },
  { value: 'center', label: 'Tengah' },
  { value: 'right', label: 'Kanan' },
];

const alignVOptions = [
  { value: 'top', label: 'Atas' },
  { value: 'center', label: 'Tengah' },
  { value: 'bottom', label: 'Bawah' },
];

function onPdfSelected(files) {
  if (!files.length) return;
  const f = files[0];

  if (f.type !== 'application/pdf') {
    alert('Format file harus PDF.');
    return;
  }
  
  if (f.size > 20 * 1024 * 1024) {
    alert('File tidak boleh lebih dari 20MB.');
    return;
  }

  originalPdfFile.value = f;
  state.value = 'loaded';
}

function resetPdf() {
  originalPdfFile.value = null;
  resultDownloadUrl.value = '';
  resultFileName.value = '';
  errorMessage.value = '';
  state.value = 'idle';
}

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

async function signPdf() {
  if (!originalPdfFile.value || !finalImageSrc.value) return;

  state.value = 'loading';
  errorMessage.value = '';

  try {
    const formData = new FormData();
    const sigBlob = dataURLtoBlob(finalImageSrc.value);
    
    // We must send both with key 'files' to match upload.middleware.js
    formData.append('files', originalPdfFile.value);
    formData.append('files', sigBlob, 'signature.png');
    
    formData.append('page', selectedPage.value);
    formData.append('alignH', selectedAlignH.value);
    formData.append('alignV', selectedAlignV.value);
    formData.append('size', selectedSize.value);

    const apiBase = useRuntimeConfig().public.apiBase;
    const response = await fetch(`${apiBase}/pdf/apply-signature`, {
      method: 'POST',
      body: formData,
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.message || 'Gagal menandatangani dokumen.');
    }

    resultDownloadUrl.value = json.data.downloadUrl;
    resultFileName.value = json.data.fileName;
    state.value = 'success';
  } catch (err) {
    errorMessage.value = err.message || 'Terjadi kesalahan sistem.';
    state.value = 'error';
  }
}
</script>

<style scoped>
.btn-primary {
  @apply bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>
